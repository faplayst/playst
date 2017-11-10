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
  existsSync,
} from 'fs';
import {
  execSync,
} from '../sync';
import {
  compact,
  concat,
  join,
  pull,
  trimEnd,
} from 'lodash';

module.exports = (options = {}) => {
  const mstslint = require.resolve('tslint-microsoft-contrib');
  const cli = path.resolve(__dirname, '../../node_modules/tslint/lib/tslint-cli');
  const command = `node ${cli}`;

  let rules = path.dirname(mstslint);

  if (options.rulesDir) {
    rules = options.rulesDir;
  }

  const run = function run(workspace = '', cwd = process.cwd()) {
    const project = path.resolve(cwd, `${workspace}/tsconfig.json`);
    const config = path.resolve(cwd, `${workspace}/tslint.json`);
    const source = path.resolve(cwd, `${workspace}/**/*.ts*`);

    let args = compact(['-t', 'stylish', `'${source}'`]);

    if (existsSync(project)) {
      args = pull(args, `'${source}'`);
      args = concat(args, '--project', `${project}`);
    }

    args = concat(args, '-r', `${rules}`);

    if (existsSync(config)) {
      args = pull(args, '-r', `${rules}`);
      args = concat(args, '-c', `${config}`);
    }

    execSync(`${command} ${join(args, ' ')}`);
  };

  let workspaces = [];
  let promise = Promise.resolve();

  const {
    workspaces: pkgWorkspaces,
  } = options;

  workspaces = pkgWorkspaces;

  workspaces.forEach((workspace) => {
    promise = promise.then(() => run(trimEnd(workspace, '/*')));
  });

  return undefined;
};
