"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectParams = void 0;
var _propertyKeyRegex = require("./property-key-regex");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @load ./select-params.doc.md
 * @memberof module:flat
 * @param {FlattenParams} params
 * @param {string | Array<string>} properties
 * @param {GetOptions} [options]
 * @returns {FlattenParams}
 */
const selectParams = (params, properties, options) => {
  const propertyArray = Array.isArray(properties) ? properties : [properties];
  const selected = propertyArray.filter(propertyPath => !!propertyPath).reduce((globalMemo, propertyPath) => {
    const regex = (0, _propertyKeyRegex.propertyKeyRegex)(propertyPath, options);
    const filtered = Object.keys(params)
    // filter all keys which starts with property path
    .filter(key => key.match(regex)).reduce((memo, key) => {
      memo[key] = params[key];
      return memo;
    }, {});
    return _objectSpread(_objectSpread({}, globalMemo), filtered);
  }, {});
  return selected;
};
exports.selectParams = selectParams;