const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.(css)$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?mimetype=image/svg+xml' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader" },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=image/png" },
      { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=image/jpeg" },
      { test: /\.gltf(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=model/gltf+binary" },
      { test: /\.glb(\?v=\d+\.\d+\.\d+)?$/, use: "file-loader?mimetype=model/gltf+binary" },
    ]
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      node_modules: path.resolve('./node_modules'),
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      modules: path.resolve('./src/modules')
    }
  },
  devServer: {
    static: './dist'
  }
};