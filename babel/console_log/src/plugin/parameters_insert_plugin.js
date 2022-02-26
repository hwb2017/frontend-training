const targetCalleeNames = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

module.exports = function({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        // 如果节点上有新节点的标记，则跳过当前函数调用表达式节点的遍历
        if (path.node.isNew) {
          return
        }
        const calleeName = path.get('callee').toString()
        if (targetCalleeNames.includes(calleeName)) {
          const { line, column } = path.node.loc.start
          const newNode = template.expression(`console.log("${state.filename || 'unknown filename'}: (${line}, ${column})")`)()
          newNode.isNew = true

          if (path.findParent(path => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]))
            // 跳过对子节点的遍历
            path.skip()
          } else {
            path.insertBefore(newNode)
          }
        }
      }
    }
  }
}