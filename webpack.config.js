const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../static/force-defaults.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  entry: './assets/scss/force-defaults.scss',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}
