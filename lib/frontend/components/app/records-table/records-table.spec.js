"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactTestingLibrary = require("react-testing-library");
var _sinon = _interopRequireDefault(require("sinon"));
var _chai = require("chai");
var _factoryGirl = _interopRequireDefault(require("factory-girl"));
var _reactRedux = require("react-redux");
var _recordsTable = require("./records-table");
var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));
var _store = _interopRequireDefault(require("../../../store/store"));
require("../../spec/resource-json.factory");
require("../../spec/record-json.factory");
require("../../spec/property-json.factory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const renderSubject = props => {
  const onSelect = _sinon.default.stub();
  const onSelectAll = _sinon.default.stub();
  const renderResult = (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)({})
  }, /*#__PURE__*/_react.default.createElement(_recordsTable.RecordsTable, _extends({}, props, {
    onSelect: onSelect,
    onSelectAll: onSelectAll
  })))));
  return _objectSpread(_objectSpread({}, renderResult), {}, {
    onSelect,
    onSelectAll
  });
};
describe('<RecordsTable />', function () {
  let properties;
  let resource;
  let records;
  let container;
  beforeEach(async function () {
    const name = await _factoryGirl.default.build('PropertyJSON', {
      path: 'path',
      isTitle: true
    });
    properties = [await _factoryGirl.default.build('PropertyJSON', {
      path: 'id',
      isId: true
    }), name, await _factoryGirl.default.build('PropertyJSON', {
      path: 'surname'
    })];
    resource = await _factoryGirl.default.build('ResourceJSON', {
      listProperties: properties,
      titleProperty: name
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  context('10 records are given without bulk and list actions', function () {
    beforeEach(async function () {
      records = await _factoryGirl.default.buildMany('RecordJSON', 10, {
        params: {
          id: _factoryGirl.default.sequence('record.id'),
          name: _factoryGirl.default.sequence('record.name', n => `name ${n}`),
          surname: _factoryGirl.default.sequence('record.surname', n => `surname ${n}`)
        }
      });
      ({
        container
      } = renderSubject({
        resource,
        records,
        selectedRecords: []
      }));
    });
    it('renders each record as a separate <tr> tag', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr')).to.have.lengthOf(10);
    });
    it('does not render any link in the record rows', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr a')).to.have.lengthOf(0);
    });
    it('does not render checkbox for selecting particular record', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody > tr input')).to.have.lengthOf(0);
    });
  });
  context('10 records are given with bulk delete and show actions', function () {
    beforeEach(async function () {
      records = await _factoryGirl.default.buildMany('RecordJSON', 10, {
        params: {
          id: _factoryGirl.default.sequence('record.id'),
          name: _factoryGirl.default.sequence('record.name', n => `name ${n}`),
          surname: _factoryGirl.default.sequence('record.surname', n => `surname ${n}`)
        },
        recordActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'show',
          actionType: 'record'
        })],
        bulkActions: [await _factoryGirl.default.build('ActionJSON', {
          name: 'bulkDelete',
          actionType: 'bulk'
        })]
      });
      ({
        container
      } = renderSubject({
        resource,
        records,
        selectedRecords: []
      }));
    });
    it('renders input checkbox for selecting many records', function () {
      (0, _chai.expect)(container.querySelectorAll('tbody td:first-child input')).to.have.lengthOf(10);
    });
  });
});