const { transformFileSync } = require('@babel/core')
const autoI18nPlugin = require('./plugin/auto_i18n_plugin')
const path = require('path')

const { code } = transformFileSync(path.join(__dirname, './sourceCode.js'), {
  plugins: [
    [autoI18nPlugin, { outputDir: path.resolve(__dirname, './output') }]
  ],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx']
  }
})

console.log(code)