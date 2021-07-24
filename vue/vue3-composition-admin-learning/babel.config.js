module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      plugins: [
        'dynamic-import-node',
        [
          'component',
          {
            libraryName: 'element-plus',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    }
  }
}
