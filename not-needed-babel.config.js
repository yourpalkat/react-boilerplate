const presets = [
  ["@babel/preset-env", { // Pass a config object to the preset
    debug: true, // Output the targets/plugins used when compiling

    // Configure how @babel/preset-env handles polyfills from core-js
    useBuiltIns: 'usage',

    // Specify the core-js version. This must match the version in package.json
    corejs: 3,

    // Specify which environments we support/target
    // targets: "",
    // We're doing this in .browserlistrc, so we don't have to do it here
  }],
];

const plugins = [];

// Export a config object
module.exports = { presets, plugins };