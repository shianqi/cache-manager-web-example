import { resolve } from 'path'

export default {
  context: resolve(__dirname, 'src'),
  entry: [
    resolve(__dirname, 'webpack.config.polyfills.js'),
    resolve(__dirname, './src/index.js')
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: [
          resolve(__dirname, './node_modules/')
        ]
      }
    ]
  }
}
