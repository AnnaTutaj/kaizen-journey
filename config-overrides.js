/* eslint-disable react-hooks/rules-of-hooks */

const path = require('path');
const { addWebpackAlias, useBabelRc, override, addLessLoader } = require('customize-cra');
const theme = require('./theme');

const supportMjs = () => (webpackConfig) => {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
  });
  return webpackConfig;
};

module.exports = override(
  useBabelRc(),
  supportMjs(),
  addWebpackAlias({
    ['@common']: path.resolve(__dirname, 'src', 'common'),
    ['@modules']: path.resolve(__dirname, 'src', 'modules'),
    ['@assets']: path.resolve(__dirname, 'src', 'assets')
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  })
);
