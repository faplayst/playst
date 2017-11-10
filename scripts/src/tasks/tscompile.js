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

module.exports = (options = {}) => {
  const cli = path.resolve(__dirname, '../../node_modules/typescript/lib/tsc');
  const command = `node ${cli} --pretty`;
  const libPath = path.resolve(process.cwd(), 'lib');
  const srcPath = path.resolve(process.cwd(), 'src');

  let args = options.isProduction ? ` --inlineSources --sourceRoot ${path.relative(libPath, srcPath)}` : '';

  const run = function run(workspace = '', cwd = process.cwd()) {
    let project = path.resolve(cwd, 'tsconfig.json');
    if (workspace && workspace !== '') {
      project = path.resolve(cwd, `${workspace}/tsconfig.json`);
    }

    args = existsSync(project) ? `${args} -p ${path.dirname(project)}` : args;

    execSync(`${command} -outDir lib -t es5 -m commonjs ${args}`);

    if (options.isProduction) {
      execSync(`${command} -outDir lib-amd -t es5 -m amd ${args}`);
      execSync(`${command} -outDir lib-es2015 -t es5 -m es2015 ${args}`);
    }
  };

  let workspaces = [];
  let promise = Promise.resolve();

  const {
    workspaces: pkgWorkspaces,
  } = options;

  workspaces = pkgWorkspaces;

  workspaces.forEach((workspace) => {
    promise = promise.then(() => run(workspace));
  });

  return undefined;
};
