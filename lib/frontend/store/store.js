"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _redux = require("redux");
var _actions = require("./actions");
var _constants = require("../../constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable @typescript-eslint/explicit-function-return-type */
const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case _actions.RESOURCES_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const pagesReducer = (state = [], action) => {
  switch (action.type) {
    case _actions.PAGES_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const localesReducer = (state = {
  language: 'en',
  translations: {}
}, action) => {
  switch (action.type) {
    case _actions.LOCALE_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const brandingReducer = (state = {}, action) => {
  switch (action.type) {
    case _actions.BRANDING_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const assetsReducer = (state = {}, action) => {
  switch (action.type) {
    case _actions.ASSETS_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const pathsReducer = (state = _constants.DEFAULT_PATHS, action) => {
  switch (action.type) {
    case _actions.PATHS_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case _actions.DASHBOARD_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const sessionReducer = (state = null, action) => {
  switch (action.type) {
    case _actions.SESSION_INITIALIZE:
      return action.data;
    default:
      return state;
  }
};
const versionsReducer = (state = {}, action) => {
  switch (action.type) {
    case _actions.VERSIONS_INITIALIZE:
      return {
        admin: action.data.admin,
        app: action.data.app
      };
    default:
      return state;
  }
};
const noticesReducer = (state = [], action) => {
  switch (action.type) {
    case _actions.ADD_NOTICE:
      {
        const notices = [action.data];
        return notices;
      }
    case _actions.DROP_NOTICE:
      {
        return state.filter(notice => notice.id !== action.data.noticeId);
      }
    case _actions.SET_NOTICE_PROGRESS:
      {
        return state.map(notice => _objectSpread(_objectSpread({}, notice), {}, {
          progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress
        }));
      }
    default:
      return state;
  }
};
const reducer = (0, _redux.combineReducers)({
  resources: resourcesReducer,
  branding: brandingReducer,
  assets: assetsReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
  pages: pagesReducer,
  locale: localesReducer
});
var _default = (initialState = {}) => (0, _redux.createStore)(reducer, initialState);
exports.default = _default;