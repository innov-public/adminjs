"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FilterDrawer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
var _propertyType = _interopRequireDefault(require("../property-type"));
var _hooks = require("../../hooks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const parseQuery = location => {
  const filter = {};
  const query = new URLSearchParams(location.search);
  for (const entry of query.entries()) {
    const [key, value] = entry;
    if (key.match('filters.')) {
      filter[key.replace('filters.', '')] = value;
    }
  }
  return filter;
};
const FilterDrawer = props => {
  const {
    resource,
    isVisible,
    toggleFilter
  } = props;
  const properties = resource.filterProperties;
  const location = (0, _reactRouterDom.useLocation)();
  const [filter, setFilter] = (0, _react.useState)(parseQuery(location));
  const match = (0, _reactRouterDom.useRouteMatch)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    translateLabel,
    translateButton
  } = (0, _hooks.useTranslation)();
  (0, _react.useEffect)(() => setFilter({}), [match.params.resourceId]);
  const handleSubmit = event => {
    event.preventDefault();
    const search = new URLSearchParams(window.location.search);
    Object.keys(filter).forEach(key => {
      if (filter[key] !== '') {
        search.set(`filters.${key}`, filter[key]);
      } else {
        search.delete(`filters.${key}`);
      }
    });
    search.set('page', '1');
    history.push(`${history.location.pathname}?${search.toString()}`, {
      previousPage: window.location.href
    });
    return false;
  };
  const resetFilter = event => {
    event.preventDefault();
    const filteredSearch = new URLSearchParams();
    const search = new URLSearchParams(window.location.search);
    for (const key of search.keys()) {
      if (!key.match('filters.')) {
        filteredSearch.set(key, search.get(key));
      }
    }
    const query = filteredSearch.toString() === '' ? `?${filteredSearch.toString()}` : '';
    history.push(history.location.pathname + query, {
      previousPage: window.location.href
    });
    setFilter({});
  };
  const handleChange = (propertyName, value) => {
    if (propertyName.params) {
      throw new Error('you can not pass RecordJSON to filters');
    }
    setFilter(_objectSpread(_objectSpread({}, filter), {}, {
      [propertyName]: value
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_designSystem.Drawer, {
    variant: "filter",
    isHidden: !isVisible,
    as: "form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, null, /*#__PURE__*/_react.default.createElement(_designSystem.H3, null, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    type: "button",
    size: "icon",
    rounded: true,
    mr: "lg",
    onClick: () => toggleFilter()
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "ChevronRight",
    color: "white"
  })), translateLabel('filters', resource.id)), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    my: "x3"
  }, properties.map(property => /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "filter",
    onChange: handleChange,
    property: property,
    filter: filter,
    resource: resource
  })))), /*#__PURE__*/_react.default.createElement(_designSystem.DrawerFooter, null, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    size: "lg"
  }, translateButton('applyChanges', resource.id)), /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "text",
    size: "lg",
    onClick: resetFilter,
    type: "button",
    color: "white"
  }, translateButton('resetFilter', resource.id))));
};
exports.FilterDrawer = FilterDrawer;
var _default = exports.default = FilterDrawer;