This is a simple React app skeleton made from scratch in an effort to understand Webpack and Babel a bit better. It's made via instructions in the tutorial found here: https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel

Babel:
- .browserlistrc tells the preset @babel/preset-env which browsers to target, so the transpiler knows which features to keep and which to convert (ie, don't use template literals or arrow functions, etc)
- if you run babel using `./node_modules/.bin/babel src --out-dir dist --presets=@babel/preset-env` (no ticks) it will spit out your compiled code into /dist using the browserlist settings
- that'll get unwieldy quick, so we can specify our options in a configuration file instead of on the command line; once you create babel.config.js you can just run ./node_modules/.bin/babel src --out-dir dist
- That works for modern language features that have older equivalents, but for many others we need polyfills so we can use new features in browsers that don't support them. If we install core-js, it's a standard library for JS that includes polyfills for up to ES2019 (at this time); then we just import it at the top of our index.js.
- But! That includes all available polyfills, even if they're not needed. We also update babel.config.js to add `useBuiltIns: 'usage'` to the preset config object; that will add only the polyfills we need for the code we use (this flag also accepts 'entry', which includes all polyfills needed by the browsers specified in browserlistrc, but that includes them whether we're using those features or not)

Webpack:
- See notes in webpack.config.js
- Webpack makes a graph of every module our app uses (JS files, images, React components, CSS files, etc) and generates one or more bundles
- We add webpack as a dependency via npm, and create/customize our config file noted above. Then we add a scripts section to package.json and add a script called dev to call Webpack specifying the config file which has our desired options: `"dev": "webpack --config webpack.config.js"`
- Now we can run `npm run dev` and Webpack will create our bundle! But we need to tell it to use Babel so we get all the polyfills we need.

Loaders:
- That means we use a Loader. Loaders are transformations that get applied to files as we import them. For instance, we can use a loader to tell Webpack to run all .scss files through a Sass pre-processor before bundling them.
- So we use a Babel loader to tell Webpack to run Babel on our .js files and output our polyfills to the bundle. So we npm-install a dependency called babel-loader.
- And add a new section called `modules` in webpack.config.js that says how to use loaders 
- The options object in modules replaces what we do in babel.config.js, so the latter isn't really needed anymore 

Dev vs Production:
- That's p good, but if our Webpack config exports a function instead of an object, then we can pass that function an environment object as an argument, and then get different bundles for development or production, which is nice. So webpack.config.js gets updated to export a function and we make two different npm scripts, one for each environment, that each pass the webpack cli a different --env option.

- OK, now we need to get Webpack to create an index.html file that lives in ./dist and imports our bundle. We can install html-webpack-plugin, create an index template that lives in ./src, import the plugin in webpack.config, and add it to the plugins array, telling it where the template is.

- Nice. The ./dist directory gets full of old builds quick, though. We can install clean-webpack-plugin and import it to webpack.config as well, adding it to the plugins array; this cleans out the ./dist directory before every build.

- Lastly we can install webpack devserver; running it creates a development bundle in dist, stores it in memory, and serves it via localhost. It will also recompile and live-reload when the code changes. We do this by npm-installing it, adding a devServer object to webpack.config, and adding a script for it to package.json.

React:
- We need to npm install react and react-dom, plus a Babel preset called @babel/preset-react, which includes plugins that will transform JSX into React.createElement() calls that vanilla JS can understand - we'll add that to the babel-loader presets array in webpack.config.

Linting:
- save ESLint as a dev dependency with npm i. Run the config command with `./node_modules/eslint/bin/eslint.js --init` and answer the questions; say yes when it asks to install dependencies. Now you've got a config file at .eslintrc.js! You can use it to keep your code consistent and can add overrides to the style guide in the rules object inside eslintrc.