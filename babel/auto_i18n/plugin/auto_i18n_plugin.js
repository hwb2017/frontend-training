const { declare } = require('@babel/helper-plugin-utils')
const generate = require('@babel/generator').default
const fse = require('fs-extra')
const path = require('path')

let intlIndex = 0
const nextIntlKey = () => {
  ++intlIndex
  return `intl${intlIndex}`
}

const save = (file, key, value) => {
  const allText = file.get('allText')
  allText.push({
    key, value
  })
  file.set('allText', allText)
}

const autoI18nPlugin = declare((api, options, dirname) => {
  api.assertVersion(7)

  if (!options.outputDir) {
    throw new Error('outputDir is empty')
  }

  const getReplaceExpression = (path, value, intlUid) => {
    const expressionParams = path.isTemplateLiteral() ? path.node.expressions.map(item => generate(item).code) : null
    let replaceExpression = api.template.ast(`${intlUid}.t('${value}'${expressionParams ? ',' + expressionParams.join(',') : ''})`).expression
    if (path.findParent(p => p.isJSXAttribute()) && !path.findParent(p => p.isJSXExpressionContainer())) {
      replaceExpression = api.types.JSXExpressionContainer(replaceExpression)
    }
    return replaceExpression
  }

  return {
    pre(file) {
      file.set('allText', [])
    },
    visitor: {
      Program: {
        enter(path, state) {
          let imported
          path.traverse({
            ImportDeclaration(p) {
              const source = p.node.source.value
              if (source === 'intl') {
                imported = true
              }
            }
          })
          if (!imported) {
            const uid = path.scope.generateUid('intl')
            const importAst = api.template.ast(`import ${uid} from 'intl'`)
            path.node.body.unshift(importAst)
            state.intlUid = uid
          }
          // 首次遍历时设置 skioTranform 的标记，后续遍历时直接transform即可
          path.traverse({
            'StringLiteral|TemplateLiteral'(path) {
              if(path.node.leadingComments) {
                // 从行首注释中移除i18n相关的注释
                path.node.leadingComments = path.node.leadingComments.filter((comment, index) => {
                  if(comment.value.includes('i18n-disable')) {
                    // 在node上增加标记位，而不是在全局的state上
                    path.node.skipTransform = true
                    return false
                  }
                  return true
                })
              }
              // 对于导入语句中的模块名称或者变量名字符串，也不进行转换
              if(path.findParent(p => p.isImportDeclaration())) {
                path.node.skipTransform = true
              }
            }
          })
        }
      },
      StringLiteral(path, state) {
        if (path.node.skipTransform) {
          return
        }
        let key = nextIntlKey()
        save(state.file, key, path.node.value)
        const replaceExpression = getReplaceExpression(path, key, state.intlUid)
        path.replaceWith(replaceExpression)
        path.skip()
      },
      TemplateLiteral(path, state) {
        if (path.node.skipTransform) {
          return
        }
        const value = path.get('quasis').map(item => item.node.value.raw).join('{placeholder}')
        if (value) {
          let key = nextIntlKey()
          save(state.file, key, value)
          const replaceExpression = getReplaceExpression(path, key, state.intlUid)
          path.replaceWith(replaceExpression)
          path.skip()
        }
      }
    },
    post(file) {
      const allText = file.get('allText')
      const intlData = allText.reduce((obj, item) => {
        obj[item.key] = item.value
        return obj
      }, {})
      const content = `const resource = ${JSON.stringify(intlData, null, 4)};\nexport default resource`
      fse.ensureDirSync(options.outputDir)
      fse.writeFileSync(path.join(options.outputDir, 'zh_CN.js'), content)
      fse.writeFileSync(path.join(options.outputDir, 'en_US.js'), content)
    }
  }
})

module.exports = autoI18nPlugin