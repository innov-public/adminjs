"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTranslation = exports.default = void 0;
var _reactI18next = require("react-i18next");
var _translateFunctions = require("../../utils/translate-functions.factory");
const _excluded = ["i18n"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/**
 * Extends {@link TranslateFunctions}. Apart from that it also returns all the properties
 * defined below.
 *
 * ```javascript
 * import { useTranslation } from 'adminjs'
 *
 * const MyComponent = () => {
 *   const { translateButton } = useTranslation()
 *
 *   return (
 *     <Box>
 *       <Button variant="primary" onClick={...}>{translateButton('save')}<Button>
 *     </Box>
 *   )
 * }
 * ```
 *
 * @memberof useTranslation
 * @alias UseTranslationResponse
 *
 * @property {TranslateFunction} ... All functions defined in {@link TranslateFunctions}
 */

/**
 * @classdesc
 * Extends the useTranslation hook from react-i18next library.
 *
 * Returns all the {@link TranslateFunctions} + methods returned by the original
 * useTranslation method from react-i18next like: `i18n` instance and `ready` flag.
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 * @returns {UseTranslationResponse}
 */
const useTranslation = () => {
  // eslint-disable-next-line no-shadow
  const _originalUseTranslati = (0, _reactI18next.useTranslation)(),
    {
      i18n
    } = _originalUseTranslati,
    rest = _objectWithoutProperties(_originalUseTranslati, _excluded);
  const translateFunctions = (0, _translateFunctions.createFunctions)(i18n);
  return _objectSpread(_objectSpread({}, rest), {}, {
    i18n
  }, translateFunctions);
};
exports.useTranslation = useTranslation;
var _default = exports.default = useTranslation;