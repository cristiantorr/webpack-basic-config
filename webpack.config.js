const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false
          }
        }
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      fallback: 'style-loader',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader', options: {url: false, sourceMap: true}}, 
        {loader: 'postcss-loader'}, 
        {loader: 'sass-loader', options: { sourceMap: true }}
        ],
      }
    ]
  },
};