"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SearchAction = void 0;
var flat = _interopRequireWildcard(require("flat"));
var _filter = _interopRequireDefault(require("../../utils/filter/filter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @implements Action
 * @category Actions
 * @module SearchAction
 * @description
 * Used to search particular record based on "title" property. It is used by
 * select fields with autocomplete.
 * Uses {@link ShowAction} component to render form
 * @private
 */
const SearchAction = exports.SearchAction = {
  name: 'search',
  isVisible: false,
  actionType: 'resource',
  /**
   * Search records by query string.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   * @memberof module:SearchAction
   *
   * @return  {Promise<SearchResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data) => {
    var _decorated$options;
    const {
      currentAdmin,
      resource
    } = data;
    const {
      query
    } = request;
    const decorated = resource.decorate();
    const titlePropertyName = decorated.titleProperty().name();
    const {
      sortBy = ((_decorated$options = decorated.options) === null || _decorated$options === void 0 || (_decorated$options = _decorated$options.sort) === null || _decorated$options === void 0 ? void 0 : _decorated$options.sortBy) || titlePropertyName,
      direction = 'asc',
      filters: customFilters = {},
      perPage = 50,
      page = 1
    } = flat.unflatten(query || {});
    const queryString = request.params && request.params.query;
    const queryFilter = queryString ? {
      [titlePropertyName]: queryString
    } : {};
    const filters = _objectSpread(_objectSpread({}, customFilters), queryFilter);
    const filter = new _filter.default(filters, resource);
    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort: {
        sortBy,
        direction
      }
    });
    return {
      records: records.map(record => record.toJSON(currentAdmin))
    };
  }
};
var _default = exports.default = SearchAction;
/**
 * Response of a [Search]{@link ApiController#search} action in the API
 * @memberof module:SearchAction
 * @alias SearchResponse
 */