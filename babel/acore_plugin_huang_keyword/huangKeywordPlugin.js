const acorn = require('acorn')

const Parser = acorn.Parser
const TokenType = acorn.TokenType

// 定义新语法的匹配规则
Parser.acorn.keywordTypes["huang"] = new TokenType("huang", {keyword: "huang"})

function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$")
}

const huangKeyword = function(Parser) {
  return class extends Parser {
    parse(program) {
      let newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super"
      newKeywords += " huang"
      // 将新语法引入的新Token加入Parser的关键字列表中
      this.keywords = wordsRegexp(newKeywords)
      return (super.parse(program))
    }
    parseStatement(context, topLevel, exports) {
      const startType = this.type
      // 对于新语法单独处理，加入AST
      if (startType == Parser.acorn.keywordTypes["huang"]) {
        const node = this.startNode()
        return this.parseHuangStatement(node)
      } else {
        return (super.parseStatement(context, topLevel, exports))
      }
    }
    parseHuangStatement(node) {
      this.next()
      return this.finishNode({value: 'huang'}, 'HuangStatement')
    }
  }
}

const newParser = Parser.extend(huangKeyword)

const program = 
`
  huang
  const a = 1
`

const ast = newParser.parse(program)
console.log(JSON.stringify(ast, null, 2))