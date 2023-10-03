"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestParser = exports.default = void 0;
var _paramsToFormData = require("../../../frontend/hooks/use-record/params-to-form-data");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types. It
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
const requestParser = (originalRequest, resource) => {
  const {
    payload: originalPayload
  } = originalRequest;
  const payload = Object.entries(originalPayload || {}).reduce((memo, [path, formValue]) => {
    var _resource$_decorated;
    const property = (_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.getPropertyByKey(path);
    let value = formValue;
    if (formValue === _paramsToFormData.FORM_VALUE_NULL) {
      value = null;
    }
    if (formValue === _paramsToFormData.FORM_VALUE_EMPTY_OBJECT) {
      value = {};
    }
    if (formValue === _paramsToFormData.FORM_VALUE_EMPTY_ARRAY) {
      value = [];
    }
    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') {
          memo[path] = true;
          return memo;
        }
        if (value === 'false') {
          memo[path] = false;
          return memo;
        }
        if (value === '') {
          memo[path] = false;
          return memo;
        }
      }
      if (['date', 'datetime'].includes(property.type())) {
        if (value === '' || value === null) {
          memo[path] = null;
          return memo;
        }
      }
      if (property.type() === 'string') {
        const availableValues = property.availableValues();
        if (availableValues && !availableValues.includes(value) && value === '') {
          memo[path] = null;
          return memo;
        }
      }
    }
    memo[path] = value;
    return memo;
  }, {});
  return _objectSpread(_objectSpread({}, originalRequest), {}, {
    payload
  });
};
exports.requestParser = requestParser;
var _default = exports.default = requestParser;