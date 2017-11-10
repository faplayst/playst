# Playst's babel-preset

> A Playst's babel preset for transforming JavaScript.

## Install

```sh
$ npm install --save-dev babel-preset-airbnb
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "presets": ["@playst/babel-preset"]
}
```

### Via CLI

```sh
$ babel script.js --presets @playst/babel-preset
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["@playst/babel-preset"]
});
```