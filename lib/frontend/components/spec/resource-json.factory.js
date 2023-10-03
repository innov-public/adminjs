"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));
require("./property-json.factory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_factoryGirl.default.define('ResourceJSON', Object, {
  id: _factoryGirl.default.sequence('ResourceJSON.id', i => `resource${i}`),
  name: _factoryGirl.default.sequence('ResourceJSON.name', i => `resource ${i}`),
  href: '/admin/resourceName',
  titleProperty: () => _factoryGirl.default.build('PropertyJSON'),
  navigation: {
    name: 'someName',
    icon: 'someIcon',
    show: true
  },
  actions: [],
  resourceActions: [],
  listProperties: [],
  properties: {},
  showProperties: [],
  filterProperties: [],
  editProperties: []
});
_factoryGirl.default.extend('ResourceJSON', 'ResourceJSON.full', {}, {
  afterBuild: async model => {
    const properties = [await _factoryGirl.default.build('PropertyJSON', {
      name: 'name',
      isTitle: true
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'surname'
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'content',
      type: 'string'
    }), await _factoryGirl.default.build('PropertyJSON', {
      name: 'longerData',
      type: 'textarea'
    }),
    // await factory.build<PropertyJSON>('PropertyJSON', { name: 'publishedAt', type: 'date' }),
    await _factoryGirl.default.build('PropertyJSON', {
      name: 'gender',
      availableValues: [{
        label: 'male',
        value: 'MALE'
      }, {
        label: 'female',
        value: 'FEMALE'
      }]
    })];
    return _objectSpread(_objectSpread({}, model), {}, {
      listProperties: properties,
      showProperties: properties,
      editProperties: properties,
      filterProperties: properties
    });
  }
});