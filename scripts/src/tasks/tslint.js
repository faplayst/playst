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

"use strict";

import path from 'path';
import { execSync } from '../sync';

module.exports = (options) => {
  const mstslint = require.resolve('tslint-microsoft-contrib');
  // console.log(mstslint);
  // const mstslint = path.resolve(__dirname, '../node_modules/@microsoft/lib/tslint-microsoft-contrib');
  // console.log(mstslint);
  const rules = path.dirname(mstslint);

  // console.log(rules);

  const project = path.resolve(process.cwd(), 'tsconfig.json');
  const source = path.resolve(process.cwd(), 'src/**/*.ts*');
  const tslintCLI = path.resolve(__dirname, '../node_modules/tslint/lib/tslint-cli');
  const command = `node ${tslintCLI}`;

  execSync(`${command} -c ${source} --project ${project} -t stylish -r ${rules}`);
}

