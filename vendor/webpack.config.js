var path = require('path');
var fs = require('fs');

var webpack = require('webpack');

var context = path.join(__dirname, '../');

var vendor = [
  '@angular/common',
  '@angular/core',
  '@angular/platform-browser',
  '@angular/forms',
  'reflect-metadata',
  'rxjs/Observable',
  'tslib',
  'zone.js/dist/zone',
  'zone.js/dist/long-stack-trace-zone'
];

module.exports = {
  cache: true,
  context: context,
  devtool: 'sourcemap',
  entry: {
    vendor: vendor
  },
  performance: {
    hints: false
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
    library: '__[name]',
    sourceMapFilename: '[name].map'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '__[name]',
      context: context
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(context, 'node_modules')]
  },
  stats: false
};
