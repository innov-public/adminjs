"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ApiClient = void 0;
var _axios = _interopRequireDefault(require("axios"));
const _excluded = ["resourceId", "actionName", "data", "query"],
  _excluded2 = ["resourceId", "recordId", "actionName", "data"],
  _excluded3 = ["resourceId", "recordIds", "actionName", "data"],
  _excluded4 = ["pageName"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
/* eslint-disable no-alert */

let globalAny = {};
try {
  globalAny = window;
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error;
  } else {
    globalAny = {
      isOnServer: true
    };
  }
}

/**
 * Type of an [axios request]{@link https://github.com/axios/axios/blob/master/index.d.ts#L43}
 *
 * @typedef {object} AxiosRequestConfig
 * @alias AxiosRequestConfig
 * @memberof ApiClient
 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
 */

const checkResponse = response => {
  if (globalAny.isOnServer) {
    return;
  }
  const loginUrl = [globalAny.location.origin, globalAny.REDUX_STATE.paths.loginPath].join('');
  // if response has redirect to loginUrl
  if (response.request.responseURL && response.request.responseURL.match(loginUrl)) {
    // eslint-disable-next-line no-undef
    alert('Your session expired. You will be redirected to login screen');
    globalAny.location.assign(loginUrl);
  }
};

/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias ActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */

/**
 * Extends {@link ActionAPIParams}
 *
 * @alias ResourceActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */

/**
 * Extends {@link ActionAPIParams}
 *
 * @alias RecordActionAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link ActionAPIParams}
 */

/**
 * Extends {@link ActionAPIParams}
 *
 * @alias BulkActionAPIParams
 * @memberof ApiClient
 * @see https://github.com/axios/axios/blob/master/index.d.ts#L43
 * @property {any}   ...    any property supported by {@link ActionAPIParams}
 */

/**
 * Extends {@link AxiosRequestConfig}
 *
 * @alias GetPageAPIParams
 * @memberof ApiClient
 * @property {any}   ...    any property supported by {@link AxiosRequestConfig}
 */

/**
 * Client which access the admin API.
 * Use it to fetch data from auto generated AdminJS API.
 *
 * In the backend it uses [axios](https://github.com/axios/axios) client
 * library.
 *
 * Usage:
 * ```javascript
 * import { ApiClient } from 'adminjs'
 *
 * const api = new ApiClient()
 * // fetching all records
 * api.resourceAction({ resourceId: 'Comments', actionName: 'list' }).then(results => {...})
 * ```
 * @see https://github.com/axios/axios
 * @hideconstructor
 */
class ApiClient {
  constructor() {
    this.baseURL = ApiClient.getBaseUrl();
    this.client = _axios.default.create({
      baseURL: this.baseURL
    });
  }
  static getBaseUrl() {
    var _globalAny$REDUX_STAT;
    if (globalAny.isOnServer) {
      return '';
    }
    return [globalAny.location.origin, (_globalAny$REDUX_STAT = globalAny.REDUX_STATE) === null || _globalAny$REDUX_STAT === void 0 ? void 0 : _globalAny$REDUX_STAT.paths.rootPath].join('');
  }

  /**
   * Search by query string for records in a given resource.
   *
   * @param   {Object}  options
   * @param   {String}  options.resourceId  id of a {@link ResourceJSON}
   * @param   {String}  options.query       query string
   *
   * @return  {Promise<SearchResponse>}
   */
  async searchRecords({
    resourceId,
    query
  }) {
    if (globalAny.isOnServer) {
      return [];
    }
    const actionName = 'search';
    const response = await this.resourceAction({
      resourceId,
      actionName,
      query
    });
    checkResponse(response);
    return response.data.records;
  }

  /**
   * Invokes given resource {@link Action} on the backend.
   *
   * @param   {ResourceActionAPIParams}     options
   * @return  {Promise<ActionResponse>}     response from an {@link Action}
   */
  async resourceAction(options) {
    const {
        resourceId,
        actionName,
        data,
        query
      } = options,
      axiosParams = _objectWithoutProperties(options, _excluded);
    let url = `/api/resources/${resourceId}/actions/${actionName}`;
    if (query) {
      const q = encodeURIComponent(query);
      url = [url, q].join('/');
    }
    const response = await this.client.request(_objectSpread(_objectSpread({
      url,
      method: data ? 'POST' : 'GET'
    }, axiosParams), {}, {
      data
    }));
    checkResponse(response);
    return response;
  }

  /**
   * Invokes given record {@link Action} on the backend.
   *
   * @param   {RecordActionAPIParams} options
   * @return  {Promise<RecordActionResponse>}            response from an {@link Action}
   */
  async recordAction(options) {
    const {
        resourceId,
        recordId,
        actionName,
        data
      } = options,
      axiosParams = _objectWithoutProperties(options, _excluded2);
    const response = await this.client.request(_objectSpread(_objectSpread({
      url: `/api/resources/${resourceId}/records/${recordId}/${actionName}`,
      method: data ? 'POST' : 'GET'
    }, axiosParams), {}, {
      data
    }));
    checkResponse(response);
    return response;
  }

  /**
   * Invokes given bulk {@link Action} on the backend.
   *
   * @param   {BulkActionAPIParams} options
   * @return  {Promise<BulkActionResponse>}            response from an {@link Action}
   */
  async bulkAction(options) {
    const {
        resourceId,
        recordIds,
        actionName,
        data
      } = options,
      axiosParams = _objectWithoutProperties(options, _excluded3);
    const params = new URLSearchParams();
    params.set('recordIds', (recordIds || []).join(','));
    const response = await this.client.request(_objectSpread(_objectSpread({
      url: `/api/resources/${resourceId}/bulk/${actionName}`,
      method: data ? 'POST' : 'GET'
    }, axiosParams), {}, {
      data,
      params
    }));
    checkResponse(response);
    return response;
  }

  /**
   * Invokes dashboard handler.
   *
   * @param   {AxiosRequestConfig}       options
   * @return  {Promise<AxiosResponse<any>>} response from the handler function defined in
   *                                     {@link AdminJSOptions#dashboard}
   */
  async getDashboard(options = {}) {
    const response = await this.client.get('/api/dashboard', options);
    checkResponse(response);
    return response;
  }

  /**
   * Invokes handler function of given page and returns its response.
   *
   * @param   {GetPageAPIParams}                options
   * @return  {Promise<AxiosResponse<any>>}     response from the handler of given page
   *                                            defined in {@link AdminJSOptions#pages}
   */
  async getPage(options) {
    const {
        pageName
      } = options,
      axiosParams = _objectWithoutProperties(options, _excluded4);
    const response = await this.client.request(_objectSpread({
      url: `/api/pages/${pageName}`
    }, axiosParams));
    checkResponse(response);
    return response;
  }
}
exports.ApiClient = exports.default = ApiClient;