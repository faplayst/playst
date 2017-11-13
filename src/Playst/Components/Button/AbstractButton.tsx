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

import { Component, IBindFunction, IComponentProps  } from "@playst/common";
import * as React from "react";
// import { autobind } from "../Utilities";
import Button from "./Button";

export enum ButtonType {
  Default = 0,
  Primary = 1,
  Flex = 2,
}

export enum ElementType {
  Button = 0,
  Anchor = 1,
}

export interface IButton {
  focus: () => void;
}

export interface IButtonProps extends IComponentProps<IButton,
  HTMLAnchorElement | HTMLButtonElement | AbstractButton | Button> {
  buttonType?: ButtonType;
  elementType?: ElementType;
  href?: string;
  onBindChildElement?: IBindFunction<IButtonProps>;
  onBindTextElement?: IBindFunction<IButtonProps>;
  text?: string;
}

export interface IButtonState {
  isActive?: boolean;
}

export abstract class AbstractButton extends Component<IButtonProps, IButtonState> implements IButton {
  private _element: HTMLElement;

  constructor(props: IButtonProps) {
    super(props);
  }

  public abstract render(): JSX.Element;

  public focus(): void {
    this._element.focus();
  }

  protected isAnchor(): boolean {
    return typeof (this.props.href) !== "undefined";
  }

  protected elementType(): ElementType {
    return this.isAnchor() ? ElementType.Anchor : ElementType.Button;
  }

  protected node(): string {
    switch (this.elementType()) {
      case ElementType.Anchor: return "a";
      case ElementType.Button:
      default: return "button";
    }
  }

  protected element(buttonProps: IButtonProps): JSX.Element {
    // const props = this.props;
    // const {
    //   onBindChildElement = this._onBindChildElement,
    // } = props;

    return React.createElement(
      this.node(),
      buttonProps,
      // onBindChildElement(),
    );
  }

  // @autobind
  // private _onBindChildElement(): JSX.Element {
  //   const props = this.props;
  //   const {
  //     onBindTextElement = this._onBindTextElement,
  //   } = props;

  //   return React.createElement(
  //     "div" as any,
  //     { className: "same" },
  //     onBindTextElement(),
  //   );
  // }

  // @autobind
  // private _onBindTextElement(): JSX.Element | null {
  //   const props = this.props;

  //   const { children } = props;
  //   let { text } = props;

  //   if (text === undefined && typeof (children) === "string") {
  //     text = children;
  //   }

  //   if (typeof(text) !== "undefined") {
  //     return (
  //       <div>
  //         {text}
  //       </div>
  //     );
  //   }

  //   return null;
  // }
}
