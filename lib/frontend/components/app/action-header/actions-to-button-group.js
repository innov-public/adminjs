"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionsToButtonGroup = void 0;
var _interfaces = require("../../../interfaces");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const actionsToButtonGroup = options => {
  const {
    actions,
    params,
    handleClick
  } = options;
  const buttons = actions.map(action => {
    const href = (0, _interfaces.actionHref)(action, params);
    return {
      icon: action.icon,
      label: action.label,
      variant: action.variant,
      source: action,
      href: href || undefined,
      // when href is not defined - handle click should also be not defined
      // This prevents from "cursor: pointer;"
      onClick: href ? handleClick : undefined,
      'data-testid': (0, _interfaces.buildActionTestId)(action),
      buttons: []
    };
  });

  // nesting buttons
  const buttonsMap = buttons.reduce((memo, button) => {
    const action = button.source;
    if (action.parent) {
      const parent = memo[action.parent] || buttons.find(btn => btn.source.name === action.parent) || {
        label: action.parent
      };
      parent.buttons = parent.buttons || [];
      parent.buttons.push(button);
      return _objectSpread(_objectSpread({}, memo), {}, {
        [action.parent]: parent
      });
    }
    return _objectSpread(_objectSpread({}, memo), {}, {
      [button.source.name]: button
    });
  }, {});
  return Object.values(buttonsMap);
};
exports.actionsToButtonGroup = actionsToButtonGroup;