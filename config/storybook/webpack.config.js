// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    include: path.resolve(__dirname, '../../src'),
    loader: require.resolve('awesome-typescript-loader'),
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
