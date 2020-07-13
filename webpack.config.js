/*
 */
// 使用node的path模块解析dist目录为绝对路径
const path = require('path')
// __dirname为当前配置文件所在的绝对路径
const distPath = path.resolve(__dirname, 'dist')
console.log('distPath:', distPath)
// js压缩
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
// 每次构建时清除dist目录中所有文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// html生成简化
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 把依赖的所有css文件提取到一个单独的css文件，webpack 3.x版本使用；webpack 4.x版本使用则mini-css-extract-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = {
  //入口文件的配置项
  entry: {
    entry: './src/entry.js', // key为chunk名，保证唯一(这里entry为chunk名)
    // entry_2: './src/entry_2.js' // 多入口文件的配置
  },
  //出口文件的配置项
  output: {
    //输出的路径，用了Node语法
    path: distPath, // path的值为项目的根目录绝对路径，这里为C:\MyDev\WebProjects\WebpackLearning\dist
    //输出的文件名称
    filename: '[name].js', // 根据entry的js文件名生成对应的js，只支持hash（[name].[chunkhash:6].js），不支持contenthash
    // publicPath: 'https://www.cdn.com/', // 资源引用路径
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: './build/loader/custom-loader',
      // },
      // {
      //   test: /\.css$/,
      //   use: ['./build/loader/custom-loader', 'style-loader', 'css-loader'],
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader'],
      // },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: [
          {
            loader: 'url-loader', // url-loader内部引用了file-loader
            options: {
              limit: 1 * 1024, // 单位为b，图片大小小于limit时，则会把图片转成DataURL（Base64格式），减少http请求；否则执行file-loader的图片复制到dist目录的操作
              // publicPath: './file-path/',
              name: '[name].[contenthash:6].[ext]', // 不设置name时，打包后的文件名默认为[hash].[ext]
            },
          },
        ],
      },
    ],
  },
  //插件，用于生产模版和各项功能
  plugins: [
    new CleanWebpackPlugin(),
    // new UglifyJSWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeAttributeQuotes: false,
      },
      hash: false, // 在html引用的资源名后面加hash，避免缓存（bundle.fbfc70.css?123safa3），一般在输出文件名加[contenthash:6]就可以了
    }),
    new ExtractTextPlugin('[name].css'), // ExtractTextPlugin()构造函数传入输出的css文件名，[name]代表chunk名，达到动态输出不同文件
  ],
  //配置webpack开发服务功能，是在构建结果放在内存中，由node本地服务器返回
  devServer: {
    //设置基本目录结构，用于找到程序打包地址
    contentBase: distPath,
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //服务端压缩是否开启
    compress: false,
    //配置服务端口号
    port: 8080,
  },
}
module.exports = config
