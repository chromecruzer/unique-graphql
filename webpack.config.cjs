const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { dependencies, devDependencies, peerDependencies } = require('./package.json');

// Combine all dependencies into a single object
const allDependencies = {
  ...dependencies,
  ...devDependencies,
  ...peerDependencies,
};

// Create an array of externals based on the package names
const externals = Object.keys(allDependencies);

module.exports = {
  mode: 'production',
  entry: './app.js', // Adjust the path if app.js is in a different directory
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'PRODUCTION'),
  },
  target: 'node', // Since this is for a server application
  devtool: 'source-map',
  externals: externals.reduce((acc, mod) => {
    acc[mod] = `commonjs ${mod}`;
    return acc;
  }, {}),
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        mangle: true, // Note `mangle.properties` is `false` by default.
      },
      extractComments: false, // Disable extracting comments into separate files
    })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile modern JavaScript to a compatible version
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
