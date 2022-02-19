const fs = require('fs')
const path = require('path')

const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

// 默认的id顺序从0开始自增，参照webpack按照深度优先遍历依赖图的顺序来给moduleId编号
let moduleId = 0

// 根据入口文件构建依赖关系图
function buildDependencyGraph(filename) {
  // 如果入口位置为相对路径，则根据此时的 __dirname 生成绝对文件路径
  filename = path.resolve(__dirname, filename)

  // 同步读取文件，并使用 utf8 作为字符串编码规则
  const code = fs.readFileSync(filename, 'utf8')

  // 使用 babel 解析源码为 AST, 源文件类型被视为使用 CommonJS 或者 ESM 语法的模块
  const ast = parse(code, {
    sourceType: 'module'
  })

  const deps = []
  const currentModuleId = moduleId

  traverse(ast, {
    enter({ node }) {
      // 根据 AST 定位到所有的 require 函数，寻找所有的依赖
      if (node.type === 'CallExpression' && node.callee.name === 'require') {
        const argument = node.arguments[0]
        if (argument.type === 'StringLiteral') {
          moduleId++
          // 这里只考虑了基于相对路径寻址的用户编写的模块，没有考虑node_modules中的第三方库
          // 要想完整实现可以参考node解析依赖的逻辑
          const nextFilename = path.join(path.dirname(filename), argument.value)
          deps.push(buildDependencyGraph(nextFilename))
        }
      }
    }
  })
  return {
    filename,
    deps,
    code: generate(ast).code,
    id: currentModuleId
  }
}

// 把依赖关系图拍平成数组，方便更快的索引
function dependencyGraphToArray(dependencyGraph) {
  const { deps, ...module } = dependencyGraph
  const moduleArray = deps.reduce((acc, m) => {
    return acc.concat(dependencyGraphToArray(m))
  }, [module])
  return moduleArray
}

// 构建一个浏览器端中虚假的 Commonjs Wrapper
// 注入 exports、require、module 等全局变量，注意这里的顺序与 CommonJS 保持一致，但与 webpack 不一致，但影响不大
// 在 webpack 中，这里的 code 需要使用 webpack loader 进行处理
function createModuleWrapper(code) {
  return `
  (function(exports, require, module) {
    ${code}
  })`
}

// 根据入口文件进行打包，也是 mini-webpack 的入口函数
function createBundleTemplate(entry) {
  // 如同 webpack 中的 __webpack_modules__，以数组的形式存储项目所有依赖的模块
  const dependencyGraph = buildDependencyGraph(entry)
  const modules = dependencyGraphToArray(dependencyGraph)

  // 生成打包的模板，也是打包的真正过程
  return `
  // 统一扔到块级作用域中，避免污染全局变量
  // 为了方便，这里使用 {}，而不用 IIFE
  //
  // 以下代码为打包的三个重要步骤：
  // 1. 构建 modules
  // 2. 构建 webpackRequire，加载模块，模拟 CommonJS 中的 require
  // 3. 运行入口函数
  {
    // 1. 构建 modules
    const modules = [
      ${modules.map(m => createModuleWrapper(m.code))}
    ]

    // 模块缓存，所有模块都仅仅会加载并执行一次
    const cacheModules = {}

    // 2. 加载模块，模拟代码中的 require 函数
    // 打包后，实际上根据模块的 id 进行加载，并对 module.exports 进行缓存
    function webpackRequire(moduleId) {
      const cacheModule = cacheModules[moduleId]
      if (cacheModule) {
        return cacheModule.exports
      }
      // targetModule 用于存放模块执行的结果
      const targetModule = { exports: {} }
      // 执行模块代码，传入wrapper函数需要的参数
      modules[moduleId](targetModule.exports, webpackRequire, targetModule)
      cacheModules[moduleId] = targetModule
      return targetModule.exports
    }

    // 3. 运行入口函数
    webpackRequire(0)
  }
  `
}

console.log(createBundleTemplate('../example/index.js'))