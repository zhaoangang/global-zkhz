const pub = require('./config.pub')

module.exports = {
  publicPath: "/global-ui/", // 基本路径
  assetsDir: "static",
  outputDir: "global-ui",
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '公司全局UI库',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  configureWebpack: {
    resolve: pub.resolve
  },
  devServer: {
    open: false,
    hot: true,
    host: "0.0.0.0", // 允许外部ip访问
    port: 8888, // 端口
    https: false, // 启用https
    overlay: {
      warnings: false,
      errors: false
    },
    historyApiFallback: {
      index: '/global-ui/index.html'
    },
    // 代理转发配置，用于调试环境
    proxy: {
      [process.env.VUE_APP_SERVER_CODE]: {
        target: process.env.VUE_APP_SERVER_HOST,
        changeOrigin: true,
      }
    }
  },
}