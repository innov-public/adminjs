"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateActions = decorateActions;
var _merge = _interopRequireDefault(require("lodash/merge"));
var _actions = require("../../../actions");
var _action = require("../../action");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Used to create an {@link ActionDecorator} based on both
 * {@link AdminJS.ACTIONS default actions} and actions specified by the user
 * via {@link AdminJSOptions}
 *
 * @returns {Record<string, ActionDecorator>}
 * @private
 */
function decorateActions(resource, admin, decorator) {
  const {
    options
  } = decorator;
  // in the end we merge actions defined by the user with the default actions.
  // since _.merge is a deep merge it also overrides defaults with the parameters
  // specified by the user.
  const actions = (0, _merge.default)({}, _actions.ACTIONS, options.actions || {});
  const returnActions = {};
  // setting default values for actions
  Object.keys(actions).forEach(key => {
    const action = _objectSpread({
      name: actions[key].name || key,
      label: actions[key].label || key,
      actionType: actions[key].actionType || ['resource']
    }, actions[key]);
    returnActions[key] = new _action.ActionDecorator({
      action,
      admin,
      resource
    });
  });
  return returnActions;
}