var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'public/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: 'babel-loader',
        options: { presets: ['env']}
      },
      /* Used to bundle css files, requires to install style-loader and css-loader */
      /*{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }*/
    ]
  },
  /* Extension that webpack will resolve. Allows to import modules without needing to add their extensions */
  resolve: { extensions: ['*', '.js', '.jsx']},
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.IgnorePlugin(/vertx/),
    /* Automatic load of changes in the browser */
    /* new webpack.HotModuleReplacementPlugin() */
  ],
  optimization: {
    minimize: true,
    /*runtimeChunk: true
    splitChunks: {
      chunks: "async",
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }*/
  }
}
