const path = require('path');

// We'll refer to our source and dist paths frequently, so let's store them here
const PATH_SOURCE = path.join(__dirname, './src');
const PATH_DIST = path.join(__dirname, './dist');

// Export a configuration object
module.exports = {
  // Tell Webpack to do some optimizations for our environment (ie, development or production). Webpack will enable certain plugins and set `process.env.NODE_ENV` according to the environment we specify. See https://webpack.js.org/configuration/mode
  mode: 'development',

  // The point or points to enter the application. this is where Webpack will start. We generally have one entry point per HTML page. For single-page applications, this means one entry point. For traditional multi-page apps, we may have multiple entry points. See https://webpack.js.org/concepts#entry
  entry: [
    path.join(PATH_SOURCE, './index.js'),
  ],

  // Tell Webpack where to spit out the bundles it creates and how to name them. See https://webpack.js.org/concepts#output and https://webpack.js.org/configuration/output#outputFilename
  // ./src/index.js is the entry point, and the compiled bundle gets emitted to ./dist where `name` is the entry name, defaults to 'main' and `hash` is a unique hash, good for cache-busting
  output: {
    path: PATH_DIST,
    filename: 'js/[name].[hash].js',
  },

  // Determine how the different types of modules will be treated. See https://webpack.js.org/configuration/module and https://webpack.js.org/concepts#loaders
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to files ending in .js
        exclude: /node_modules/, // Don't apply to files that live in the node_modules folder
        use: { // Use the following loader and options
          loader: 'babel-loader',
          // We can pass options to both babel-loader and Babel. This option object will replace babel-config.js
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true, // Output the targets/plugins used when babel runs
                useBuiltIns: 'usage', // Configure how @babel/preset-env handles polyfills from core-js
                corejs: 3, // Specify the core-js version. Must match the version in package.json

                // Specify which environments we support/target. We're specifying them in .browserlistrc so it's not needed here
                // targets: "",
              }],
            ],
          },
        }
      }
    ],
  },
};