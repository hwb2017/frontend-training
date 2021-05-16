const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                'src': path.resolve(__dirname, './src'),
                'assets': path.resolve(__dirname, './src/assets'),
                'api': path.resolve(__dirname, './src/api'),
                'components': path.resolve(__dirname, './src/components')
            }
        }
    } 
}