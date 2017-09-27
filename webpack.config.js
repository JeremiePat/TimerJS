const path = require('path');

module.exports = {
  entry: './timer.es6.js',
  output: {
    filename: 'timer.umd.js',
    path: path.resolve(__dirname, '.'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
              targets: {
                browsers: ['ie >= 10']
              }
            }]]
          }
        }
      }
    ]
  }
};
