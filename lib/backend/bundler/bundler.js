"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const rollup = require('rollup');
const ora = require('ora');
const util = require('util');
const {
  external,
  globals,
  plugins
} = require('./config');
async function build({
  name,
  input,
  babelConfig = {},
  commonJSConfig = {},
  file,
  watch = false,
  minify
}) {
  const inputOptions = {
    input,
    plugins: plugins({
      babelConfig,
      minify,
      commonJSConfig
    }),
    external
  };
  const outputOptions = {
    format: 'iife',
    name,
    globals
  };
  if (file) {
    outputOptions.file = file;
  }
  if (!minify) {
    outputOptions.sourcemap = 'inline';
  }
  if (watch) {
    const bundle = await rollup.rollup(inputOptions);
    if (process.env.DEBUG_BUNDLER) {
      // eslint-disable-next-line no-console
      console.log(util.inspect(bundle.watchFiles, {
        maxArrayLength: null
      }));
    }
    const spinner = ora('Bundling files');
    const watcher = rollup.watch(_objectSpread(_objectSpread({}, inputOptions), {}, {
      output: outputOptions
    }));
    watcher.on('event', event => {
      if (event.code === 'START') {
        spinner.start('Bundling files...');
      }
      if (event.code === 'ERROR' || event.code === 'FATAL') {
        spinner.fail('Bundle fail:');
        // eslint-disable-next-line no-console
        console.log(event);
      }
      if (event.code === 'END') {
        spinner.succeed(`Finish bundling: ${bundle.watchFiles.length} files`);
      }
    });
    return watcher;
  }
  const bundle = await rollup.rollup(inputOptions);
  if (file) {
    return bundle.write(outputOptions);
  }
  const bundled = await bundle.generate(outputOptions);
  return bundled.output[0];
}
module.exports = build;