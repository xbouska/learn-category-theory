const path = require('path');


module.exports = {
  // context slouží pro definici root adresaře se zdrojáky
  context: path.join(__dirname, 'src'),
  entry: {
    chapter1: './example/chapter1.js',
    '__tests__/chapter1': './example/chapter1.spec.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        include: /src/
      }
    ]
  }
};
