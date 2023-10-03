"use strict";

var _chai = require("chai");
var _sinon = _interopRequireDefault(require("sinon"));
var _propertyDecorator = _interopRequireDefault(require("./property-decorator"));
var _baseProperty = _interopRequireDefault(require("../../adapters/property/base-property"));
var _adminjs = _interopRequireDefault(require("../../../adminjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
describe('PropertyDecorator', () => {
  const translatedProperty = 'translated property';
  let stubbedAdmin;
  let property;
  let args;
  beforeEach(() => {
    property = new _baseProperty.default({
      path: 'name',
      type: 'string'
    });
    stubbedAdmin = _sinon.default.createStubInstance(_adminjs.default);
    stubbedAdmin.translateProperty = _sinon.default.stub().returns(translatedProperty);
    args = {
      property,
      admin: stubbedAdmin,
      resource: {
        id: () => 'someId'
      }
    };
  });
  describe('#isSortable', () => {
    it('passes the execution to the base property', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isSortable').returns(false);
      (0, _chai.expect)(new _propertyDecorator.default(args).isSortable()).to.equal(false);
    });
  });
  describe('#isVisible', () => {
    it('passes execution to BaseProperty.isVisible for list when no options are specified', () => {
      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('list')).to.equal(property.isVisible());
    });
    it('passes execution to BaseProperty.isEditable for edit when no options are specified', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isVisible').returns(false);
      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('edit')).to.equal(property.isEditable());
    });
    it('sets new value when it is changed for all views by isVisible option', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {
          isVisible: false
        }
      }));
      (0, _chai.expect)(decorator.isVisible('list')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('edit')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('show')).to.equal(false);
    });
  });
  describe('#label', () => {
    it('returns translated label', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'name').returns('normalName');
      (0, _chai.expect)(new _propertyDecorator.default(args).label()).to.equal(translatedProperty);
    });
  });
  describe('#reference', () => {
    const rawReferenceValue = 'Article';
    const optionsReferenceValue = 'BlogPost';
    const ReferenceResource = 'OtherResource';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: 'externalId',
        type: 'reference'
      });
      _sinon.default.stub(property, 'reference').returns(rawReferenceValue);
      args.admin.findResource.returns(ReferenceResource);
    });
    it('returns model from AdminJS for reference name in properties', () => {
      new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property
      })).reference();
      (0, _chai.expect)(args.admin.findResource).to.have.been.calledWith(rawReferenceValue);
    });
    it('returns model from options when they are given', () => {
      new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        options: {
          reference: optionsReferenceValue
        }
      })).reference();
      (0, _chai.expect)(args.admin.findResource).to.have.been.calledWith(optionsReferenceValue);
    });
  });
  describe('#type', () => {
    const propertyType = 'boolean';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: 'externalId',
        type: propertyType
      });
    });
    it('returns `reference` type if reference is set in options', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        options: {
          reference: 'SomeReference'
        }
      }));
      (0, _chai.expect)(decorator.type()).to.equal('reference');
    });
    it('returns property reference when no options are given', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property
      }));
      (0, _chai.expect)(decorator.type()).to.equal(propertyType);
    });
  });
  describe('#availableValues', () => {
    it('map default value to { value, label } object and uses translations', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'availableValues').returns(['val']);
      (0, _chai.expect)(new _propertyDecorator.default(args).availableValues()).to.deep.equal([{
        value: 'val',
        label: translatedProperty
      }]);
    });
  });
  describe('#position', () => {
    it('returns -1 for title field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(true);
      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(-1);
    });
    it('returns 101 for second field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);
      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(101);
    });
    it('returns 0 for an id field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);
      _sinon.default.stub(_baseProperty.default.prototype, 'isId').returns(true);
      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(0);
    });
  });
  describe('#subProperties', () => {
    let propertyDecorator;
    const propertyName = 'super';
    const subPropertyName = 'nested';
    const subPropertyLabel = 'nestedLabel';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: propertyName,
        type: 'string'
      });
      _sinon.default.stub(property, 'subProperties').returns([new _baseProperty.default({
        path: subPropertyName,
        type: 'string'
      })]);
      propertyDecorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        resource: {
          id: () => 'resourceId',
          options: {
            properties: {
              [`${propertyName}.${subPropertyName}`]: {
                label: subPropertyLabel
              }
            }
          }
        }
      }));
    });
    it('returns the array of decorated properties', () => {
      (0, _chai.expect)(propertyDecorator.subProperties()).to.have.lengthOf(1);
      (0, _chai.expect)(propertyDecorator.subProperties()[0]).to.be.instanceOf(_propertyDecorator.default);
    });
    it('changes label of the nested property to what was given in PropertyOptions', () => {
      const subProperty = propertyDecorator.subProperties()[0];
      (0, _chai.expect)(subProperty.label()).to.eq(translatedProperty);
    });
  });
  describe('#toJSON', () => {
    it('returns JSON representation of a property', () => {
      (0, _chai.expect)(new _propertyDecorator.default(args).toJSON()).to.have.keys('isTitle', 'isId', 'position', 'isSortable', 'availableValues', 'name', 'label', 'type', 'reference', 'components', 'isDisabled', 'subProperties', 'isArray', 'isDraggable', 'custom', 'resourceId', 'propertyPath', 'isRequired', 'isVirtual', 'props', 'hideLabel');
    });
  });
  afterEach(() => {
    _sinon.default.restore();
  });
});