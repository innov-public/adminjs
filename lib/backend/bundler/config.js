"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const {
  babel
} = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const {
  nodeResolve: resolve
} = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const {
  terser
} = require('rollup-plugin-terser');
const external = ['lodash', 'react', 'react-dom', 'redux', 'react-redux', 'flat', 'react-router', 'react-router-dom', 'react-datepicker', 'styled-components', 'prop-types', 'adminjs', '@adminjs/design-system', 'adminjs/property-types', 'adminjs/types', 'adminjs/style', 'axios', 'recharts', '@carbon/icons-react', 'react-select', 'react-select/async', 'react-select/creatable', 'i18next', 'react-i18next'];
const globals = {
  lodash: 'Lodash',
  react: 'React',
  redux: 'Redux',
  axios: 'axios',
  flat: 'flat',
  recharts: 'Recharts',
  'react-select': 'ReactSelect',
  'react-select/async': 'ReactSelectAsync',
  'react-select/creatable': 'ReactSelectCreatable',
  '@carbon/icons-react': 'CarbonIcons',
  'react-datepicker': 'ReactDatepicker',
  'styled-components': 'styled',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-redux': 'ReactRedux',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  adminjs: 'AdminJS',
  '@adminjs/design-system': 'AdminJSDesignSystem',
  'adminjs/property-types': 'AdminJS.PropertyTypes',
  'adminjs/types': 'AdminJS.types',
  'adminjs/style': 'AdminJS.style',
  i18next: 'i18n',
  'react-i18next': 'ReactI18Next',
  Quill: 'Quill'
};
const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'];
const plugins = ({
  babelConfig = {},
  commonJSConfig = {},
  minify = false
} = {}) => {
  const pluginStack = [resolve({
    extensions,
    mainFields: ['main', 'module', 'jsnext:main']
  }), json(),
  // typescript(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.IS_BROWSER': 'true',
    'process.env.': 'AdminJS.env.'
  }), commonjs(_objectSpread({}, commonJSConfig)), babel(_objectSpread({
    extensions,
    babelrc: false,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**/*.js',
    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')]
  }, babelConfig))];
  if (minify) {
    pluginStack.push(terser());
  }
  return pluginStack;
};
module.exports = {
  external,
  globals,
  plugins
};