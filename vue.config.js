const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')
console.log(path.join(__dirname, '/static/'), '324')
module.exports = {
  assetsDir: 'src/static',
  publicPath: '/',
  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    cssName: "'default",
    // 配置全局less变量
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 存放less变量文件的路径
        // path.resolve(__dirname, "./src/assets/less/parameter.less")
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': 'rgb(71,186,33)'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    // plugins: [
    //   new CopyPlugin([{
    //     from: path.join(__dirname, '/static/code-creator.png'),
    //     to: path.join(__dirname, '/dist_electron/static/')
    //   }], ),
    // ],
  }
}