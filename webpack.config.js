var webpack = require('webpack');

module.exports = {
  entry: {
    index: './components/index',
    Toggle: ['./components/Toggle'],
    Group: ['./components/Group'],
    Slider: ['./components/Slider'],
    AutoComplete: ['./components/AutoComplete'],
    Count: ['./components/Count'],
    InputRange: ['./components/InputRange']
  },
  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  externals: {
    react: 'React',
    classnames: 'classNames',
    'react-dom': 'ReactDOM',
    'fuse.js': 'Fuse',
    'deep-copy': 'deepCopy'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};
