const path = require('path');
const webpack = require('webpack');
const typescript = require('typescript');
const aot = require('@ultimate/aot-loader');

module.exports = {
  cache: true,
  context: __dirname,
  devServer: {
    contentBase: __dirname,
    stats: {
      chunks: true,
      chunkModules: true,
      chunkOrigins: true,
      errors: true,
      errorDetails: true,
      hash: true,
      timings: true,
      modules: true,
      warnings: true
    },
    setup: function (app) {
      app.get('/build/vendor.js', function (req, res) {
        res.sendFile(path.join(__dirname, '/build/vendor.js'));
      });
    },
    publicPath: '/build/',
    port: 3000
  },
  devtool: 'sourcemap',
  entry: {
    app: ['zone.js/dist/zone', './app/main.ts']
  },
  output: {
    filename: '[name].js',
    publicPath: '/build/',
    path: path.resolve(__dirname, 'build')
  },
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: false,
    setImmediate: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        loaders: ['@ultimate/aot-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new aot.AotPlugin({
      tsConfig: './tsconfig.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({
      context: './',
      manifest: require(path.resolve(__dirname, 'vendor/vendor-manifest.json'))
    })
  ]
};
