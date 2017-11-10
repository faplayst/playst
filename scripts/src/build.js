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

import {
  Logger,
  isProduction,
  packaged,
} from './utils';

export default function build(additionalTasks = []) {
  const pkg = packaged();

  if (!pkg) {
    return;
  }

  const buildStartTime = new Date().getTime();

  let workspaces = [];
  let isFail = false;
  let promise = Promise.resolve();

  let tasks = [
    'tslint',
    'tscompile',
  ];

  tasks = tasks.concat(additionalTasks);

  if (pkg.disabledTasks) {
    tasks = tasks.filter(task => pkg.disabledTasks.indexOf(task) < 0);
  }

  if (process.argv.length >= 4 && process.argv[3].indexOf('--') === -1) {
    tasks = [process.argv[3]];
  }

  const {
    workspaces: pkgWorkspaces,
  } = pkg;

  workspaces = typeof (pkgWorkspaces) !== 'undefined' ? pkgWorkspaces : ['.'];

  const run = function run(task) {
    const startTime = new Date().getTime();

    return Promise.resolve()
      .then(() => !isFail && Promise.resolve()
        .then(() => Logger.startTask(pkg.name, task))
        .then(() => require(`./tasks/${task}`)({
          isProduction,
          workspaces,
          argv: process.argv,
        }))
        .then(() => Logger.endTask(pkg.name, task, startTime))
        .catch((e) => {
          isFail = true;
          Logger.endTask(pkg.name, task, startTime, e);
        }));
  };

  tasks.forEach((task) => {
    promise = promise.then(() => run(task));
  });

  promise.then(() => {
    if (isFail) {
      process.exitCode = 1;
    }
    Logger.endBuild(pkg.name, !isFail, buildStartTime);
  });
}
