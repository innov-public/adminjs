"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListAction = void 0;
var flat = _interopRequireWildcard(require("flat"));
var _sortSetter = _interopRequireDefault(require("../../services/sort-setter/sort-setter"));
var _filter = _interopRequireDefault(require("../../utils/filter/filter"));
var _populator = _interopRequireDefault(require("../../utils/populator/populator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const PER_PAGE_LIMIT = 500;

/**
 * @implements Action
 * @category Actions
 * @module ListAction
 * @description
 * Returns selected Records in a list form
 * @private
 */
const ListAction = exports.ListAction = {
  name: 'list',
  isVisible: true,
  actionType: 'resource',
  showFilter: true,
  showInDrawer: false,
  /**
   * Responsible for returning data for all records.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @implements Action#handler
   * @memberof module:ListAction
   * @return {Promise<ListActionResponse>} records with metadata
   */
  handler: async (request, response, context) => {
    const {
      query
    } = request;
    const {
      sortBy,
      direction,
      filters = {}
    } = flat.unflatten(query || {});
    const {
      resource
    } = context;
    let {
      page,
      perPage
    } = flat.unflatten(query || {});
    if (perPage) {
      perPage = +perPage > PER_PAGE_LIMIT ? PER_PAGE_LIMIT : +perPage;
    } else {
      perPage = 10; // default
    }

    page = Number(page) || 1;
    const listProperties = resource.decorate().getListProperties();
    const firstProperty = listProperties.find(p => p.isSortable());
    let sort;
    if (firstProperty) {
      sort = (0, _sortSetter.default)({
        sortBy,
        direction
      }, firstProperty.name(), resource.decorate().options);
    }

    // const filter = await new Filter(filters, resource).populate()
    const filter = await new _filter.default(filters, resource);
    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort
    });
    const populatedRecords = await (0, _populator.default)(records);

    // eslint-disable-next-line no-param-reassign
    context.records = populatedRecords;
    const total = await resource.count(filter);
    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort.direction,
        sortBy: sort.sortBy
      },
      records: populatedRecords.map(r => r.toJSON(context.currentAdmin))
    };
  }
};
var _default = exports.default = ListAction;
/**
 * Response returned by List action
 * @memberof module:ListAction
 * @alias ListAction
 */