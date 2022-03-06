const { transformFileSync } = require('@babel/core')
const autoTrackPlugin = require('./plugin/auto_track_plugin')
const path = require('path')

const { code } = transformFileSync(path.join(__dirname, './sourceCode.js'), {
  plugins: [[autoTrackPlugin, {
    trackerPath: 'tracker'
  }]],
  parserOpts: {
    sourceType: 'unambiguous'
  }
})

console.log(code)