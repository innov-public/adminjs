"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BasePropertyComponent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));
var ArrayType = _interopRequireWildcard(require("./array"));
var MixedType = _interopRequireWildcard(require("./mixed"));
var defaultType = _interopRequireWildcard(require("./default-type"));
var boolean = _interopRequireWildcard(require("./boolean"));
var datetime = _interopRequireWildcard(require("./datetime"));
var richtext = _interopRequireWildcard(require("./richtext"));
var reference = _interopRequireWildcard(require("./reference"));
var textarea = _interopRequireWildcard(require("./textarea"));
var password = _interopRequireWildcard(require("./password"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let globalAny = {};
try {
  globalAny = window;
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error;
  }
}
const types = {
  textarea,
  boolean,
  datetime,
  reference,
  password,
  date: datetime,
  richtext,
  string: defaultType,
  number: defaultType,
  float: defaultType,
  mixed: null
};

/**
 * @load ./base-property-component.doc.md
 * @component
 * @name BasePropertyComponent
 * @subcategory Application
 * @class
 * @hideconstructor
 */
const BasePropertyComponent = props => {
  const {
    property: baseProperty,
    resource,
    record,
    filter,
    where,
    onChange
  } = props;
  const property = (0, _react.useMemo)(() => _objectSpread(_objectSpread({}, baseProperty), {}, {
    // we fill the path if it is not there. That is why all the actual Component Renderers are
    // called with the path set to this root path. Next mixed and array components adds to this
    // path either index (for array) or subProperty name.
    path: baseProperty.path || baseProperty.propertyPath
  }), [baseProperty]);
  const testId = `property-${where}-${property.path}`;
  let Component = types[property.type] && types[property.type][where] || defaultType[where];
  if (property.components && property.components[where]) {
    const component = property.components[where];
    if (!component) {
      throw new Error(`there is no "${property.path}.components.${where}"`);
    }
    Component = globalAny.AdminJS.UserComponents[component];
    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
      "data-testid": testId
    }, /*#__PURE__*/_react.default.createElement(Component, {
      property: property,
      resource: resource,
      record: record,
      filter: filter,
      onChange: onChange,
      where: where
    })));
  }
  const Array = ArrayType[where];
  const Mixed = MixedType[where];
  if (baseProperty.isArray) {
    if (!Array) {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
    return /*#__PURE__*/_react.default.createElement(Array, _extends({}, props, {
      property: property,
      ItemComponent: BasePropertyComponent,
      testId: testId
    }));
  }
  if (baseProperty.type === 'mixed') {
    if (!Mixed) {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
    return /*#__PURE__*/_react.default.createElement(Mixed, _extends({}, props, {
      property: property,
      ItemComponent: BasePropertyComponent,
      testId: testId
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    "data-testid": testId
  }, /*#__PURE__*/_react.default.createElement(Component, {
    property: property,
    resource: resource,
    record: record,
    filter: filter,
    onChange: onChange,
    where: where
  })));
};
exports.BasePropertyComponent = exports.default = BasePropertyComponent;