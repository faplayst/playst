/**
 * @license
 * Copyright (c) 2017, Sopar Sihotang. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IS_DEV } from "./environment";

export class Playst {
  constructor(private greeting: string) { }
  public greet() {
    return `Hello, ${this.greeting}!`;
  }

  public greetMe() {
    if (IS_DEV) {
      console.warn("this method is deprecated, use #greet instead");
    }

    return this.greet();
  }
}
