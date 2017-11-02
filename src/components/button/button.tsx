/**
 * @license
 * Copyright (c) 2017, Sopar Sihotang. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from "react";

export interface IButtonProps {
  name: string;
}

export class Button extends React.Component<IButtonProps, {}> {
  constructor(props: IButtonProps) {
    super(props);
  }

  public render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
