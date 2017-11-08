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

import chalk from 'chalk';
import {
  isProduction,
  isVerbose,
} from './environment';
import Timer from './Timer';

class Logger {
  static stats(args) {
    if (isProduction || isVerbose) {
      console.log(chalk.gray(args));
    }
  }

  static startTask(name, task) {
    console.log(`${Timer.prefixTime(name)} Starting: ${chalk.cyan(task)}`);
  }

  static endTask(name, task, startTime, errorMessage) {
    console.log(`${Timer.prefixTime(name)}\
    ${Timer.passFail(errorMessage === undefined)}: ${chalk.cyan(task)} (${Timer.duration(startTime)}) ${errorMessage ? (chalk.white(':') + chalk.red(errorMessage)) : ''}`);
  }

  static endBuild(name, passed, startTime) {
    console.log();
    console.log(`${
      chalk.grey('============') + chalk.white('[ ') + chalk.cyan(name) + chalk.white(' ]') +
      chalk.grey('=') + chalk.white('[ ') + Timer.passFail(passed) + chalk.white(' ]') +
      chalk.grey('=') + chalk.white('[ ') + Timer.duration(startTime) + chalk.white(' ]') +
      chalk.grey('============')
    }`);
  }
}

export default Logger;
