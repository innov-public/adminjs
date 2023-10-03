"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineTranslations = void 0;
var _merge = _interopRequireDefault(require("lodash/merge"));
var _translateFunctions = require("../utils/translate-functions.factory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Locale object passed to {@link AdminJSOptions} and stored in the application
 *
 * @memberof AdminJSOptions
 * @alias Locale
 */

/**
 * Locale object passed to {@link AdminJSOptions} and stored in the application
 *
 * @memberof AdminJSOptions
 * @alias LocaleList
 */

// Locale translations is not well parsed by JSDoc so the typedef is placed below

/**
 * Contains all the translations for given language. Everything is divided to
 * sections/blocks like actions, properties, buttons, labels and messages,
 * but also the same sections can can be nested under 'resources' property.
 *
 * This allows you to define translations either for entire UI or for a specific resource.
 * Take a look at this example:
 *
 * ```javascript
 * {
 *   translations: {
 *     buttons: {
 *       save: 'Save it',
 *     },
 *     resources: {
 *       Comments: {
 *         buttons: {
 *           save: 'Save this comment'
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * In the example above all save buttons will be named: 'Save it'. All but save button in
 * Comments resource. Where the button name will be: Save this comment.
 *
 * @memberof AdminJSOptions
 * @alias LocaleTranslations
 * @typedef {Object} LocaleTranslations
 * @property {Record<string, string>} [actions]         translated action labels
 * @property {Record<string, string>} [properties]      translated resource properties
 * @property {Record<string, string>} [messages]        translated messages
 * @property {Record<string, string>} [buttons]         translated button labels
 * @property {Record<string, string>} [labels]          translated labels
 * @property {Record<string, object>} [resources]       optional resources sub-translations
 * @property {Record<string, object>} resources.resourceId  Id of a resource from the database. i.e.
 *                                                      Comments for comments mongoose collection
 * @property {Record<string, string>} [resources.resourceId.actions]
 * @property {Record<string, string>} [resources.resourceId.properties]
 * @property {Record<string, string>} [resources.resourceId.messages]
 * @property {Record<string, string>} [resources.resourceId.buttons]
 * @property {Record<string, string>} [resources.resourceId.labels]
 *
 */ // Escaping all keys with . (changing to '&#46;')
const renameKeys = object => Object.entries(object).reduce((memo, [k, v]) => {
  if (typeof v === 'object') {
    return _objectSpread(_objectSpread({}, memo), {}, {
      [(0, _translateFunctions.formatName)(k)]: renameKeys(v)
    });
  }
  return _objectSpread(_objectSpread({}, memo), {}, {
    [(0, _translateFunctions.formatName)(k)]: v
  });
}, {});
const combineTranslations = (originalTranslations, adminTranslations = {}) => {
  const formattedTranslations = renameKeys(adminTranslations);
  return (0, _merge.default)(originalTranslations, formattedTranslations);
};
exports.combineTranslations = combineTranslations;