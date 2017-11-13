import { configure } from '@storybook/react';

const context = require.context('../../../src', true, /.*__stories__\/.*\.story\.tsx$/);

function loadStories() {
  context.keys().forEach(context);
}

configure(loadStories, module);
