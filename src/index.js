// import 'core-js/stable';
// Loads all language features
// Because we've specified `useBuiltIns: 'usage'` in babel.config,
// we don't have to manually import it here.
// Babel will handle importing only the polyfills we need from core-js

// import sum from './sum';

// const greet = name => console.log(`Hello, ${name}`);
// greet('Jon Snow');

// console.log(sum(2, 4)); // Output: 6

// That was the initial test stuff. Now let's render a React component.

import React from 'react';
import ReactDOM from 'react-dom';

function Root() {
  return <h1>Hello, world</h1>;
}

// Render the Root element into the DOM, inside the supplied container
// (in this instance, an HTML element with an ID of 'root', which is in our HTML template)
ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
