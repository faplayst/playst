'use strict';

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

var targets = require('./target');
var modules = require('./modules');

module.exports = function presetPlayst(context, options) {
  var transpileTargets = (options && options.targets) || targets(options || {});

  var debug = (options && typeof options.debug === 'boolean') ? !!options.debug : false;

  return {
    presets: [
      require('babel-preset-env').default(null, {
        debug: debug,
        exclude: [
          'transform-async-to-generator',
          'transform-es2015-template-literals',
          'transform-regenerator'
        ],
        modules: false,
        targets: transpileTargets
      }),
      require('babel-preset-react')
    ],
    plugins: [
      options && options.modules === false ? null : modules({}), [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true
      }],
      require('babel-plugin-transform-es5-property-mutators'),
      require('babel-plugin-transform-es3-member-expression-literals'),
      require('babel-plugin-transform-es3-property-literals'),
      require('babel-plugin-transform-jscript'), [require('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true
      }]
    ].filter(Boolean)
  };
};
