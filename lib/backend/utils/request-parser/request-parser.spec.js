"use strict";

var _chai = require("chai");
var _requestParser = _interopRequireDefault(require("./request-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const buildResourceWithProperty = (key, property) => {
  const resource = {
    _decorated: {
      getPropertyByKey: path => key === path ? property : null
    }
  };
  return resource;
};
let resource;
describe('RequestParser', function () {
  const baseRequest = {
    params: {
      resourceId: 'resourceId',
      action: 'edit'
    },
    method: 'post',
    payload: {}
  };
  describe('boolean values', function () {
    beforeEach(function () {
      resource = buildResourceWithProperty('isHired', {
        type: () => 'boolean'
      });
    });
    it('sets value to `false` when empty string is given', function () {
      var _requestParser$payloa;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: ''
        }
      });
      (0, _chai.expect)((_requestParser$payloa = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa === void 0 ? void 0 : _requestParser$payloa.isHired).to.be.false;
    });
    it('changes "true" string to true', function () {
      var _requestParser$payloa2;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'true'
        }
      });
      (0, _chai.expect)((_requestParser$payloa2 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa2 === void 0 ? void 0 : _requestParser$payloa2.isHired).to.be.true;
    });
    it('changes "false" string to true', function () {
      var _requestParser$payloa3;
      const request = _objectSpread(_objectSpread({}, baseRequest), {}, {
        payload: {
          isHired: 'false'
        }
      });
      (0, _chai.expect)((_requestParser$payloa3 = (0, _requestParser.default)(request, resource).payload) === null || _requestParser$payloa3 === void 0 ? void 0 : _requestParser$payloa3.isHired).to.be.false;
    });
  });
});