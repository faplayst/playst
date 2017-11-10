import { configure } from '@storybook/react';

const context = require.context('../../../src', true, /.*__stories__\/.*\.story\.js$/);

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);
