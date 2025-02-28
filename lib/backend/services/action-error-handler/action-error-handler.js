"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));
var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @private
 * @classdesc
 * Function which catches all the errors thrown by the action hooks or handler
 */
const actionErrorHandler = (error, context) => {
  if (error instanceof _validationError.default) {
    var _error$baseError;
    const {
      resource
    } = context;
    const {
      record,
      currentAdmin
    } = context;
    const baseMessage = ((_error$baseError = error.baseError) === null || _error$baseError === void 0 ? void 0 : _error$baseError.message) || context.translateMessage('thereWereValidationErrors', resource.id());
    return {
      record: _objectSpread(_objectSpread({}, record === null || record === void 0 ? void 0 : record.toJSON(currentAdmin)), {}, {
        params: {},
        populated: {},
        errors: error.propertyErrors
      }),
      notice: {
        message: baseMessage,
        type: 'error'
      }
    };
  }
  if (error instanceof _forbiddenError.default) {
    const {
      resource
    } = context;
    const baseMessage = error.baseMessage || context.translateMessage('anyForbiddenError', resource.id());
    return {
      notice: {
        message: baseMessage,
        type: 'error'
      }
    };
  }
  throw error;
};
var _default = exports.default = actionErrorHandler;