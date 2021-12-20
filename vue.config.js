module.exports = {
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
  }
}