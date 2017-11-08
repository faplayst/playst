const modifyBabelPreset = require('modify-babel-preset');

module.exports = function playst(context, opts = {}) {
  const modules = opts.modules !== undefined ? opts.modules : true;

  return {
    presets: [
      modifyBabelPreset('es2015', {
        'transform-es2015-classes': {
          loose: true
        },
        'transform-es2015-modules-commonjs': modules,
      }),
      'react',
      'stage-0'
    ],
    plugins: [
      'transform-runtime',
      'transform-class-properties'
    ],
  };
};
