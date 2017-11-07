import {
  configure
} from '@storybook/react';

// const context = require.context('../../src/Playst', true, /stories\/.*\.story\.js$/);
const context = require.context('../../src/Playst', true, /\.story\.js$/);

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);
