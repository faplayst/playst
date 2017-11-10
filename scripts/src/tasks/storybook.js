/**
 * @license
 * Copyright (c) 2017, Sopar Sihotang.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import path from 'path';
import {
  execSync,
} from '../sync';
import _ from 'lodash/array';

module.exports = (options = {}) => {
  const config = path.resolve(process.cwd(), 'common/config/storybook');

  let args = _.compact(['-c', `${config}`]);

  const run = function run() {
    // const cli = path.resolve(__dirname, '../../node_modules/@storybook/react/bin/index');
    // const command = `node ${cli}`;
    const port = '9009';

    args = _.concat(args, '-p', `${port}`);

    return execSync(`start-storybook ${_.join(args, ' ')}`);
    // return execSync(`${command} ${_.join(args, ' ')}`);
  };

  const build = function build() {
    // const cli = path.resolve(__dirname, '../../node_modules/@storybook/react/bin/build');
    // const command = `node ${cli}`;

    // return execSync(`${command} ${_.join(args, ' ')}`);
    return execSync(`build-storybook ${_.join(args, ' ')}`);
  };

  const {
    action: optAction,
  } = options;

  const action = optAction;
  const promise = Promise.resolve();

  switch (action) {
    case 'BUILD':
      return promise.then(() => build());
    case 'START':
    default:
      return promise.then(() => run());
  }
};
