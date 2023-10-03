"use strict";

var _chai = require("chai");
var _buildFeature = require("../build-feature");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint-disable @typescript-eslint/no-empty-function */
describe('mergeResourceOptions', function () {
  it('chaines before hooks', function () {
    const existingOptions = {
      actions: {
        new: {
          before: function firstBeforeHook() {},
          handler: null
        },
        edit: {
          after: [function firstAfterHook() {}]
        }
      }
    };
    const newOptions = {
      actions: {
        new: {
          before: function lastBeforeHook() {},
          handler: function lastHandler() {}
        },
        edit: {
          after: function lastAfterHook() {}
        },
        newAction: {
          handler: function newHandler() {}
        }
      }
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      actions: {
        new: {
          before: [existingOptions.actions.new.before, newOptions.actions.new.before],
          handler: [newOptions.actions.new.handler]
        },
        edit: {
          after: [existingOptions.actions.edit.after[0], newOptions.actions.edit.after]
        },
        newAction: {
          handler: [newOptions.actions.newAction.handler]
        }
      }
    });
  });
  it('chaines properties', function () {
    const existingOptions = {
      properties: {
        password: {
          isVisible: true,
          component: 'ala'
        }
      }
    };
    const newOptions = {
      properties: {
        password2: {
          isVisible: false,
          component: 'ela'
        }
      }
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      properties: _objectSpread(_objectSpread({}, existingOptions.properties), newOptions.properties)
    });
  });
  it('merges falsey options', function () {
    const existingOptions = {
      navigation: {
        name: 'db'
      }
    };
    const newOptions = {
      navigation: false
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      navigation: false
    });
  });
});