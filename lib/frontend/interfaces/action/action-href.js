"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionHref = void 0;
var _viewHelpers = require("../../../backend/utils/view-helpers");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const h = new _viewHelpers.ViewHelpers();
const actionHref = (action, params) => {
  const actionName = action.name;
  if (!action.component && !action.hasHandler) {
    return null;
  }
  const hrefMap = {
    record: () => h.recordActionUrl(_objectSpread(_objectSpread({}, params), {}, {
      actionName
    })),
    resource: () => h.resourceActionUrl({
      resourceId: params.resourceId,
      actionName
    }),
    bulk: () => h.bulkActionUrl(_objectSpread(_objectSpread({}, params), {}, {
      actionName
    }))
  };
  if (hrefMap[action.actionType]) {
    return hrefMap[action.actionType]();
  }
  throw new Error('"actionType" should be either record, resource or bulk');
};
exports.actionHref = actionHref;