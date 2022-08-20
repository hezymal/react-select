'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = require('react');

var reactDom = require('react-dom');

function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var App = function App() {
  return React__default["default"].createElement("div", null, "App");
};

var rootElement = document.getElementById("root");
reactDom.render(React__default["default"].createElement(App, null), rootElement);
