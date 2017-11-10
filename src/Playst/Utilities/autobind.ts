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

/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 */
// tslint:disable-next-line:no-any
export function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
  configurable: boolean;
  get(): T;
  // tslint:disable-next-line:no-any
  set(newValue: any): void;
} | void {
  let fn = descriptor.value;

  let defining = false;

  return {
    configurable: true,

    get(): T {
      if (defining || (fn && this === fn.prototype) || this.hasOwnProperty(key)) {
        return fn as T;
      }

      // Bind method only once, and update the property to return the bound value from now on
      let fnBound = fn && fn.bind(this);

      defining = true;
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: fnBound
      });
      defining = false;

      return fnBound;
    },

    // tslint:disable-next-line:no-any
    set(newValue: any): void {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue
      });
    }
  };
}
