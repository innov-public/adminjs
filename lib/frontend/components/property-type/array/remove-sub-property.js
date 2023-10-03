"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSubProperty = void 0;
var _utils = require("../../../../utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Removes selected array item from given record. It performs following tasks:
 * 1. removes array item from the array
 * 2. reorders keys in new array item
 * 3. if property has populated fields it also reorders them
 * it uses {@link flat } module and its removePath method
 *
 * @param {RecordJSON} record
 * @param {string}     subPropertyPath            which has to be removed. It has to be flattened
 *                                                in notation, and ending with array index
 * @private
 * @hide
 */
const removeSubProperty = (record, subPropertyPath) => {
  // by default populated is flatten just to the path level - object itself is not flatten. That is
  // why we have to retrieve the original state. That is why we have to replace record.populated to
  // from { 'some.nested.1.key': RecordJSON } to { 'some.nested.1.key': 'some.nested.1.key' },
  // then remove keys, and refill back some.nested.1.key to the value from the original populated
  // object.
  const populatedKeyMap = Object.keys(record.populated).reduce((memo, propertyKey) => _objectSpread(_objectSpread({}, memo), {}, {
    [propertyKey]: propertyKey
  }), {});
  const newPopulatedKeyMap = _utils.flat.removePath(populatedKeyMap, subPropertyPath);
  const newPopulated = Object.entries(newPopulatedKeyMap).reduce((memo, [newPropertyKey, oldPropertyKey]) => _objectSpread(_objectSpread({}, memo), {}, {
    [newPropertyKey]: oldPropertyKey && record.populated[oldPropertyKey === null || oldPropertyKey === void 0 ? void 0 : oldPropertyKey.toString()]
  }), {});
  return _objectSpread(_objectSpread({}, record), {}, {
    params: _utils.flat.removePath(record.params, subPropertyPath),
    populated: newPopulated
  });
};
exports.removeSubProperty = removeSubProperty;