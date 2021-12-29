const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/popup.js'),
  output: {
    path: path.resolve(__dirname, './web-extension'),
    filename: 'popup.js',
  }
};