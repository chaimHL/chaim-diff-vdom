const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/virtual/', // 虚拟打包路径，不会真实打包出文件，而是在 8080 端口虚拟生成
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    contentBase: './dist' // 静态资源目录
  }
}