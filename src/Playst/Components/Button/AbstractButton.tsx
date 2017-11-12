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

import { Component, Props } from "@playst/common";
// import React from "react";
// import { autobind } from "../Utilities";
import { Button } from "./Button";

export enum ButtonType {
  Default = 0,
  Primary = 1,
}

export interface IButton {
  focus: () => void;
}

export interface IButtonProps extends Props.IComponentProps<IButton, HTMLAnchorElement | HTMLButtonElement | AbstractButton | Button> {
  buttonType?: ButtonType;
  // onClick?: (event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;
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

  // // #region Events
  // @autobind
  // private _onClick(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  //   const { onClick } = this.props;

  //   onClick && onClick(event, this);

  //   !event.defaultPrevented && this._onToggle();

  //   event.preventDefault();
  //   event.stopPropagation();
  // }

  // @autobind
  // private _onToggle(): void {
  //   const { menuProps } = this.props;
  //   let currentMenuProps = this.state.menuProps;
  //   this.setState({ menuProps: currentMenuProps ? null : menuProps });
  // }
  // // #endregion
}
