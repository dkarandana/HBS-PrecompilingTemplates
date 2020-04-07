var path = require('path');

const webpack = require('webpack');
const OUT_DIR_ABS = path.resolve('./dist');
const IS_PROD = (process.env.NODE_ENV === 'prod') ? true : false;

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  name: 'js-files',
  watch: !IS_PROD,
  mode: 'development',
  entry: './src/index.js',
  //context: path.resolve(__dirname, 'src'),
  output: {
    path: OUT_DIR_ABS,
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.tpl$/,
      include: [
        path.resolve(__dirname, 'src/views'),
      ],
      use: {
        loader: 'handlebars-loader',
        options: {
          minimize: true,
          assumeObjects: true,
          knownHelpers: ['formatNumber'],
          knownHelpersOnly: false,
          helperDirs: [
            path.resolve(__dirname, 'src/js/handlebar-helpers'),
          ],
          partialDirs: [
            path.resolve(__dirname, 'src/views/partials')
          ],
          extensions: [
            ".tpl"
          ],
          handlebarsLoader: {}
        }
      }
    }]
  },
  resolve: {
    alias: {
      'handlebars.runtime': 'handlebars/dist/handlebars.runtime.min'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Handlebars: 'handlebars.runtime'
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { 
        baseDir: ['public'] 
      },
      serveStatic: [{
        route: '/dist',
        dir: 'dist'
      }]
    })
  ]
};