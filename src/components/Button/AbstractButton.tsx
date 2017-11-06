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

import { HTMLProps } from "react";
import * as Playst from "../../Playst";

export enum ButtonType {
  Default = 0,
  Primary = 1,
}

export interface IButton {
  focus: () => void;
}

export interface IButtonProps extends Playst.IActionProps {
  name: string;
  type?: ButtonType;
}

export abstract class AbstractButton<T> extends Playst.Component<HTMLProps<T> & IButtonProps, {}> implements IButton {
  private _element: HTMLElement;

  constructor(props: HTMLProps<T> & IButtonProps) {
    super(props);
  }

  public abstract render(): JSX.Element;

  public focus(): void {
    this._element.focus();
  }
}
