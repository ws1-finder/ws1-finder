const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const modifyManifest = (manifest) => {
  var versionPieces = require('./package.json').version.split('-');
  var newManifest = JSON.parse(manifest);

  newManifest.version = versionPieces[0]; 

  if(versionPieces.length > 1) {
    newManifest.version_name = `${versionPieces[0]} ${versionPieces[1]}`;
  }

  return JSON.stringify(newManifest);
};

var config = {
  entry: {
    popup: path.resolve(__dirname, './src/popup/popup.js'),
    background: path.resolve(__dirname, './src/background/background.js'),
    options: path.resolve(__dirname, './src/options/options.js'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ]
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "assets",
          globOptions: {
            ignore: ["assets/manifest.json"],
          },
        },
        {
          from: "assets/manifest.json",
          transform(content, absoluteFrom) {
            return modifyManifest(content);
          },
        }
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};