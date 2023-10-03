"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const pagesToStore = (pages = {}) => Object.entries(pages).map(([key, adminPage]) => ({
  name: key,
  component: adminPage.component,
  icon: adminPage.icon,
  isVisible: adminPage.isVisible == undefined ? true : adminPage.isVisible
}));
var _default = exports.default = pagesToStore;