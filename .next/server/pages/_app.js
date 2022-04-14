module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9hbnRkL2Rpc3QvYW50ZC5jc3MuanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/antd/dist/antd.css\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/dist/antd.css */ \"./node_modules/antd/dist/antd.css\");\n/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles.css */ \"./styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./store.js\");\n\n\nvar _jsxFileName = \"/Users/macbookpro/Projects/web/dipongo_app/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_store__WEBPACK_IMPORTED_MODULE_3__[\"AuthProvider\"], {\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Component, _objectSpread({}, pageProps), void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 9,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 13\n    }, this)\n  }, void 0, false);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQSxLQUFULENBQWU7QUFBRUMsV0FBRjtBQUFhQztBQUFiLENBQWYsRUFBeUM7QUFDckMsc0JBQ0k7QUFBQSwyQkFDSSxxRUFBQyxtREFBRDtBQUFBLDZCQUNJLHFFQUFDLFNBQUQsb0JBQWVBLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESixtQkFESjtBQU9IOztBQUVjRixvRUFBZiIsImZpbGUiOiIuL3BhZ2VzL19hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XG5pbXBvcnQgJy4uL3N0eWxlcy5jc3MnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4uL3N0b3JlXCI7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICA8QXV0aFByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgICAgIDwvQXV0aFByb3ZpZGVyPlxuICAgICAgICA8Lz5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./public/correct.mp3":
/*!****************************!*\
  !*** ./public/correct.mp3 ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"/_next/static/chunks/media/public/correct.mp3\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvY29ycmVjdC5tcDM/Y2U1YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFlLDhHQUErQyIsImZpbGUiOiIuL3B1YmxpYy9jb3JyZWN0Lm1wMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL19uZXh0L3N0YXRpYy9jaHVua3MvbWVkaWEvcHVibGljL2NvcnJlY3QubXAzXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/correct.mp3\n");

/***/ }),

/***/ "./public/musique-ambiance.mp3":
/*!*************************************!*\
  !*** ./public/musique-ambiance.mp3 ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"/_next/static/chunks/media/public/musique-ambiance.mp3\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvbXVzaXF1ZS1hbWJpYW5jZS5tcDM/MjI3NiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFlLHVIQUF3RCIsImZpbGUiOiIuL3B1YmxpYy9tdXNpcXVlLWFtYmlhbmNlLm1wMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiL19uZXh0L3N0YXRpYy9jaHVua3MvbWVkaWEvcHVibGljL211c2lxdWUtYW1iaWFuY2UubXAzXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/musique-ambiance.mp3\n");

/***/ }),

/***/ "./public/wrong.mp3":
/*!**************************!*\
  !*** ./public/wrong.mp3 ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"/_next/static/chunks/media/public/wrong.mp3\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvd3JvbmcubXAzPzA3MmQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBZSw0R0FBNkMiLCJmaWxlIjoiLi9wdWJsaWMvd3JvbmcubXAzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCIvX25leHQvc3RhdGljL2NodW5rcy9tZWRpYS9wdWJsaWMvd3JvbmcubXAzXCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/wrong.mp3\n");

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: useAuth, AuthProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useAuth\", function() { return useAuth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AuthProvider\", function() { return AuthProvider; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jwt-decode */ \"jwt-decode\");\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _urlapi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./urlapi */ \"./urlapi.js\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _useSocket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useSocket */ \"./useSocket.js\");\n/* harmony import */ var _public_musique_ambiance_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./public/musique-ambiance.mp3 */ \"./public/musique-ambiance.mp3\");\n/* harmony import */ var _public_wrong_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./public/wrong.mp3 */ \"./public/wrong.mp3\");\n/* harmony import */ var _public_correct_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./public/correct.mp3 */ \"./public/correct.mp3\");\n\n\nvar _jsxFileName = \"/Users/macbookpro/Projects/web/dipongo_app/store.js\";\n\n\n\n\n\n\n\n\n\n\nconst authContextDefaultValues = {\n  session: null,\n  updateSession: () => {},\n  deleteSession: () => {},\n  initSession: () => {},\n  firstClick: () => {},\n  stopMusic: () => {}\n};\nconst AuthContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_1__[\"createContext\"])(authContextDefaultValues);\nfunction useAuth() {\n  return Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(AuthContext);\n}\nfunction AuthProvider({\n  children\n}) {\n  const getCookie = name => {\n    if (false) { var value, re; }\n  };\n\n  const setCookie = (name, value) => {\n    if (false) { var date, expires; }\n  };\n\n  const {\n    0: session,\n    1: setSession\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(null);\n  const {\n    0: isPlaying,\n    1: setIsPlaying\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(false);\n\n  const updateSession = s => {\n    if (false) {}\n  };\n\n  const deleteSession = () => {\n    if (false) {}\n  };\n\n  const initSession = data => {\n    if (false) {}\n\n    setSession(data);\n\n    if (data.running_session !== null) {\n      router.push('/roadmap');\n    } else {\n      router.push('/onboard');\n    }\n  };\n\n  const clearStorage = () => {\n    localStorage.removeItem(\"user\");\n    localStorage.removeItem(\"token\");\n    setCookie(\"token\", null);\n    localStorage.removeItem(\"session\");\n  };\n\n  const firstClick = () => {\n    /*if(router.pathname !== '/win/video'){\n        if(!isPlaying){\n            console.log('click')\n            setIsPlaying(true)\n            const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n            audioEl.play().then((e)=>{console.log('play')});\n        }\n    }*/\n    if (router.pathname === '/roadmap') {\n      setIsPlaying(true);\n      const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n      audioEl.play().then(e => {\n        console.log('play');\n      });\n    } else {\n      if (isPlaying) {\n        setIsPlaying(false);\n        const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n        audioEl.pause();\n      }\n    }\n    /*else{\n        setIsPlaying(false)\n    }*/\n\n  };\n\n  const stopMusic = () => {\n    if (isPlaying) {\n      setIsPlaying(false);\n      const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n      audioEl.pause();\n    }\n    /*else{\n        setIsPlaying(false)\n    }*/\n\n  };\n\n  const value = {\n    session,\n    updateSession,\n    deleteSession,\n    initSession,\n    firstClick,\n    stopMusic\n  };\n  let isAuth = false;\n  const publicPath = ['/', '/login', '/signin'];\n  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__[\"useRouter\"])();\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    if (router.pathname !== '/roadmap') {\n      setIsPlaying(false);\n      const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n      audioEl.pause();\n    } else {\n      setIsPlaying(true);\n      const audioEl = document.getElementsByClassName(\"audio-element-base\")[0];\n      audioEl.play().then(e => {\n        console.log('play');\n      });\n    }\n  }, [router.pathname]);\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    if (false) {}\n  }, []);\n  const {\n    0: messages,\n    1: setMessages\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])([]);\n  const {\n    0: message,\n    1: setMessage\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])([]);\n  const socket = Object(_useSocket__WEBPACK_IMPORTED_MODULE_7__[\"default\"])();\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    axios__WEBPACK_IMPORTED_MODULE_4___default.a.interceptors.response.use(res => {\n      // Add configurations here\n      if (res.config.method === \"post\" && res.config.url.includes('answer/question')) {\n        if (res.status === 200) {\n          if (res.data.data !== undefined && res.data.data.answer !== undefined && res.data.data.answer.is_true === true) {\n            document.getElementsByClassName(\"audio-correct\")[0].play().then(() => {});\n          } else {\n            document.getElementsByClassName(\"audio-wrong\")[0].play().then(() => {});\n          }\n        }\n      }\n\n      return res;\n    }, err => {\n      return Promise.reject(err);\n    });\n  }, []);\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    if (false) {}\n  }, [socket]);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"audio\", {\n      className: \"audio-element-base\",\n      loop: true,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"source\", {\n        src: _public_musique_ambiance_mp3__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n        type: \"audio/mpeg\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 306,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 305,\n      columnNumber: 13\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"audio\", {\n      className: \"audio-wrong\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"source\", {\n        src: _public_wrong_mp3__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n        type: \"audio/mpeg\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 309,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 308,\n      columnNumber: 13\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"audio\", {\n      className: \"audio-correct\",\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"source\", {\n        src: _public_correct_mp3__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n        type: \"audio/mpeg\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 312,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 311,\n      columnNumber: 13\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(AuthContext.Provider, {\n      value: value,\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        onClick: () => {\n          firstClick();\n        },\n        children: children\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 315,\n        columnNumber: 17\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 314,\n      columnNumber: 13\n    }, this)]\n  }, void 0, true);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS5qcz8wNTcxIl0sIm5hbWVzIjpbImF1dGhDb250ZXh0RGVmYXVsdFZhbHVlcyIsInNlc3Npb24iLCJ1cGRhdGVTZXNzaW9uIiwiZGVsZXRlU2Vzc2lvbiIsImluaXRTZXNzaW9uIiwiZmlyc3RDbGljayIsInN0b3BNdXNpYyIsIkF1dGhDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsInVzZUF1dGgiLCJ1c2VDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJnZXRDb29raWUiLCJuYW1lIiwic2V0Q29va2llIiwidmFsdWUiLCJzZXRTZXNzaW9uIiwidXNlU3RhdGUiLCJpc1BsYXlpbmciLCJzZXRJc1BsYXlpbmciLCJzIiwiZGF0YSIsInJ1bm5pbmdfc2Vzc2lvbiIsInJvdXRlciIsInB1c2giLCJjbGVhclN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwicGF0aG5hbWUiLCJhdWRpb0VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicGxheSIsInRoZW4iLCJlIiwiY29uc29sZSIsImxvZyIsInBhdXNlIiwiaXNBdXRoIiwicHVibGljUGF0aCIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJtZXNzYWdlIiwic2V0TWVzc2FnZSIsInNvY2tldCIsInVzZVNvY2tldCIsImF4aW9zIiwiaW50ZXJjZXB0b3JzIiwicmVzcG9uc2UiLCJ1c2UiLCJyZXMiLCJjb25maWciLCJtZXRob2QiLCJ1cmwiLCJpbmNsdWRlcyIsInN0YXR1cyIsInVuZGVmaW5lZCIsImFuc3dlciIsImlzX3RydWUiLCJlcnIiLCJQcm9taXNlIiwicmVqZWN0IiwibXVzaWMiLCJtdXNpY1dyb25nIiwibXVzaWNDb3JyZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QXlCQXBCLHlEQUFTLENBQUMsTUFBTTtBQUVaLGVBQWtDLEVBT2pDO0FBRUosR0FYUSxFQVdOLENBQUNLLE1BQUQsQ0FYTSxDQUFUO0FBYUEsc0JBQ0k7QUFBQSw0QkFDSTtBQUFPLGVBQVMsRUFBQyxvQkFBakI7QUFBc0MsVUFBSSxNQUExQztBQUFBLDZCQUNJO0FBQVEsV0FBRyxFQUFFa0Isb0VBQWI7QUFBb0IsWUFBSSxFQUFDO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREosZUFJSTtBQUFPLGVBQVMsRUFBQyxhQUFqQjtBQUFBLDZCQUNJO0FBQVEsV0FBRyxFQUFFQyx5REFBYjtBQUF5QixZQUFJLEVBQUM7QUFBOUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURKO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFKSixlQU9JO0FBQU8sZUFBUyxFQUFDLGVBQWpCO0FBQUEsNkJBQ0k7QUFBUSxXQUFHLEVBQUVDLDREQUFiO0FBQTJCLFlBQUksRUFBQztBQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVBKLGVBVUkscUVBQUMsV0FBRCxDQUFhLFFBQWI7QUFBc0IsV0FBSyxFQUFFbkQsS0FBN0I7QUFBQSw2QkFDSTtBQUFLLGVBQU8sRUFBRSxNQUFJO0FBQUNYLG9CQUFVO0FBQUcsU0FBaEM7QUFBQSxrQkFDS087QUFETDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVZKO0FBQUEsa0JBREo7QUFrQkgiLCJmaWxlIjoiLi9zdG9yZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge2NyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIFJlYWN0Tm9kZSwgdXNlU3RhdGUsIHVzZUVmZmVjdH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gXCJqd3QtZGVjb2RlXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge1VSTH0gZnJvbSBcIi4vdXJsYXBpXCI7XG5pbXBvcnQge21lc3NhZ2V9IGZyb20gXCJhbnRkXCI7XG5pbXBvcnQgdXNlU29ja2V0IGZyb20gXCIuL3VzZVNvY2tldFwiO1xuaW1wb3J0IG11c2ljIGZyb20gXCIuL3B1YmxpYy9tdXNpcXVlLWFtYmlhbmNlLm1wM1wiO1xuaW1wb3J0IG11c2ljV3JvbmcgZnJvbSBcIi4vcHVibGljL3dyb25nLm1wM1wiO1xuaW1wb3J0IG11c2ljQ29ycmVjdCBmcm9tIFwiLi9wdWJsaWMvY29ycmVjdC5tcDNcIjtcblxuY29uc3QgYXV0aENvbnRleHREZWZhdWx0VmFsdWVzID0ge1xuICAgIHNlc3Npb246IG51bGwsXG4gICAgdXBkYXRlU2Vzc2lvbjogKCkgPT4ge30sXG4gICAgZGVsZXRlU2Vzc2lvbjogKCkgPT4ge30sXG4gICAgaW5pdFNlc3Npb246ICgpID0+IHt9LFxuICAgIGZpcnN0Q2xpY2s6ICgpID0+IHt9LFxuICAgIHN0b3BNdXNpYzogKCkgPT4ge30sXG59O1xuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KGF1dGhDb250ZXh0RGVmYXVsdFZhbHVlcyk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBdXRoKCkge1xuICAgIHJldHVybiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcblxuXG4gICAgY29uc3QgZ2V0Q29va2llID0gKG5hbWUpID0+XG4gICAge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKG5hbWUgKyBcIj0oW147XSspXCIpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcmUuZXhlYyhkb2N1bWVudC5jb29raWUpO1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAhPSBudWxsKSA/IHVuZXNjYXBlKHZhbHVlWzFdKSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbnN0IHNldENvb2tpZSA9IChuYW1lLHZhbHVlKT0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgdmFyIGV4cGlyZXMgPSBcIlwiO1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKDM2NSoyNCo2MCo2MCoxMDAwKSk7XG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyAodmFsdWUgfHwgXCJcIikgICsgZXhwaXJlcyArIFwiOyBwYXRoPS9cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBbc2Vzc2lvbiwgc2V0U2Vzc2lvbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHVwZGF0ZVNlc3Npb24gPSAocykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICBpZihzIT09IHVuZGVmaW5lZCAmJiBzLnJ1bm5pbmdfc2Vzc2lvbiAhPT0gdW5kZWZpbmVkICYmIHMucnVubmluZ19zZXNzaW9uIT09bnVsbCl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZXNzaW9uXCIsSlNPTi5zdHJpbmdpZnkocy5ydW5uaW5nX3Nlc3Npb24pKTtcbiAgICAgICAgICAgICAgICBzZXRTZXNzaW9uKHtzZXNzaW9uOiBzLnJ1bm5pbmdfc2Vzc2lvbn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlc3Npb25cIixudWxsKVxuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvb25ib2FyZCcpLnRoZW4oKHIpPT57fSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBkZWxldGVTZXNzaW9uID0gKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICBzdG9wTXVzaWMoKTtcbiAgICAgICAgICAgIHNldFNlc3Npb24obnVsbCk7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIilcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlclwiKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gICAgICAgICAgICBzZXRDb29raWUoXCJ0b2tlblwiLFwibnVsbFwiKVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzZXNzaW9uXCIpO1xuICAgICAgICAgICAgaWYodG9rZW4hPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgYXhpb3MuZ2V0KFVSTCArICcvYXBpL2xlYXZlL2dhbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKS50aGVuKChyZXMpPT57fSlcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvJykudGhlbigocmVzKT0+e30pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvJykudGhlbigocmVzKT0+e30pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cblxuICAgIH07XG4gICAgY29uc3QgaW5pdFNlc3Npb24gPSAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgICAgICBpZihkYXRhLnJ1bm5pbmdfc2Vzc2lvbiA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZXNzaW9uXCIsbnVsbCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlc3Npb25cIixKU09OLnN0cmluZ2lmeShkYXRhLnJ1bm5pbmdfc2Vzc2lvbikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLGRhdGEudG9rZW4pO1xuICAgICAgICAgICAgc2V0Q29va2llKFwidG9rZW5cIixkYXRhLnRva2VuKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlclwiLEpTT04uc3RyaW5naWZ5KGRhdGEudXNlcikpO1xuXG4gICAgICAgIH1cbiAgICAgICAgc2V0U2Vzc2lvbihkYXRhKTtcbiAgICAgICAgaWYoZGF0YS5ydW5uaW5nX3Nlc3Npb24gIT09IG51bGwpe1xuICAgICAgICAgICByb3V0ZXIucHVzaCgnL3JvYWRtYXAnKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgIHJvdXRlci5wdXNoKCcvb25ib2FyZCcpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VyXCIpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgICAgICBzZXRDb29raWUoXCJ0b2tlblwiLG51bGwpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwic2Vzc2lvblwiKTtcbiAgICB9O1xuICAgIGNvbnN0IGZpcnN0Q2xpY2sgPSAoKT0+e1xuICAgICAgICAvKmlmKHJvdXRlci5wYXRobmFtZSAhPT0gJy93aW4vdmlkZW8nKXtcbiAgICAgICAgICAgIGlmKCFpc1BsYXlpbmcpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgICAgICAgICAgICAgc2V0SXNQbGF5aW5nKHRydWUpXG4gICAgICAgICAgICAgICAgY29uc3QgYXVkaW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhdWRpby1lbGVtZW50LWJhc2VcIilbMF07XG4gICAgICAgICAgICAgICAgYXVkaW9FbC5wbGF5KCkudGhlbigoZSk9Pntjb25zb2xlLmxvZygncGxheScpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0qL1xuICAgICAgICBpZihyb3V0ZXIucGF0aG5hbWUgPT09ICcvcm9hZG1hcCcpe1xuXG4gICAgICAgICAgICAgICAgc2V0SXNQbGF5aW5nKHRydWUpXG4gICAgICAgICAgICAgICAgY29uc3QgYXVkaW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhdWRpby1lbGVtZW50LWJhc2VcIilbMF07XG4gICAgICAgICAgICAgICAgYXVkaW9FbC5wbGF5KCkudGhlbigoZSk9Pntjb25zb2xlLmxvZygncGxheScpfSk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoaXNQbGF5aW5nKXtcbiAgICAgICAgICAgICAgICBzZXRJc1BsYXlpbmcoZmFsc2UpXG4gICAgICAgICAgICAgICAgY29uc3QgYXVkaW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhdWRpby1lbGVtZW50LWJhc2VcIilbMF07XG4gICAgICAgICAgICAgICAgYXVkaW9FbC5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyplbHNle1xuICAgICAgICAgICAgc2V0SXNQbGF5aW5nKGZhbHNlKVxuICAgICAgICB9Ki9cblxuICAgIH07XG4gICAgY29uc3Qgc3RvcE11c2ljID0gKCk9PntcbiAgICAgICAgaWYoaXNQbGF5aW5nKXtcbiAgICAgICAgICAgIHNldElzUGxheWluZyhmYWxzZSlcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYXVkaW8tZWxlbWVudC1iYXNlXCIpWzBdO1xuICAgICAgICAgICAgYXVkaW9FbC5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8qZWxzZXtcbiAgICAgICAgICAgIHNldElzUGxheWluZyhmYWxzZSlcbiAgICAgICAgfSovXG5cbiAgICB9O1xuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgICBzZXNzaW9uLFxuICAgICAgICB1cGRhdGVTZXNzaW9uLFxuICAgICAgICBkZWxldGVTZXNzaW9uLFxuICAgICAgICBpbml0U2Vzc2lvbixcbiAgICAgICAgZmlyc3RDbGljayxcbiAgICAgICAgc3RvcE11c2ljXG4gICAgfTtcbiAgICBsZXQgaXNBdXRoID0gZmFsc2U7XG4gICAgY29uc3QgcHVibGljUGF0aCA9IFsnLycsJy9sb2dpbicsJy9zaWduaW4nXTtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gICAgdXNlRWZmZWN0KCgpPT57XG4gICAgICAgIGlmKHJvdXRlci5wYXRobmFtZSAhPT0gJy9yb2FkbWFwJyl7XG4gICAgICAgICAgICBzZXRJc1BsYXlpbmcoZmFsc2UpXG4gICAgICAgICAgICBjb25zdCBhdWRpb0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImF1ZGlvLWVsZW1lbnQtYmFzZVwiKVswXTtcbiAgICAgICAgICAgIGF1ZGlvRWwucGF1c2UoKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZXRJc1BsYXlpbmcodHJ1ZSlcbiAgICAgICAgICAgIGNvbnN0IGF1ZGlvRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYXVkaW8tZWxlbWVudC1iYXNlXCIpWzBdO1xuICAgICAgICAgICAgYXVkaW9FbC5wbGF5KCkudGhlbigoZSk9Pntjb25zb2xlLmxvZygncGxheScpfSk7XG4gICAgICAgIH1cbiAgICB9LFtyb3V0ZXIucGF0aG5hbWVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKXtcblxuXG5cblxuICAgICAgICAgICAgaXNBdXRoICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlclwiKSAhPT0gbnVsbDtcbiAgICAgICAgICAgaWYoIWlzQXV0aCl7XG4gICAgICAgICAgICAgICBkZWxldGVTZXNzaW9uKCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XG4gICAgICAgICAgICAgICBsZXQgZGVUID0gand0X2RlY29kZSh0b2tlbik7XG4gICAgICAgICAgICAgICBsZXQgZXhwID0gZGVULmV4cDtcbiAgICAgICAgICAgICAgIGxldCB0aW1lID0gRGF0ZS5ub3coKS8xMDAwO1xuICAgICAgICAgICAgICAgaWYodGltZSA+IGV4cCl7XG4gICAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgIGF4aW9zLmdldChVUkwgKyAnL2FwaS91c2VyL2luZm8nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0LmRhdGEuZGF0YS5ydW5uaW5nX3Nlc3Npb24gIT09IG51bGwpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKmlmKHJlc3VsdC5kYXRhLmRhdGEucnVubmluZ19zZXNzaW9uLmN1cnJlbnRfdGltZSA8IDMwMDAgJiYgcmVzdWx0LmRhdGEuZGF0YS5ydW5uaW5nX3Nlc3Npb24ucXVlc3Rpb25fZG9uZSA8IDUwICl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaCgnL3JvYWRtYXAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuZGF0YS5kYXRhLnJ1bm5pbmdfc2Vzc2lvbi5xdWVzdGlvbl9kb25lID09PSA1MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvd2luJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goJy9sb3N0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2Vzc2lvbih7c2Vzc2lvbjogcmVzdWx0LmRhdGEuZGF0YS5ydW5uaW5nX3Nlc3Npb259KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZXNzaW9uXCIsSlNPTi5zdHJpbmdpZnkocmVzdWx0LmRhdGEuZGF0YS5ydW5uaW5nX3Nlc3Npb24pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZXIucGF0aG5hbWUgPT09ICcvJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goJy9yb2FkbWFwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyb3V0ZXIucGF0aG5hbWUuaW5jbHVkZXMoJ29uYm9hcmQnKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvcm9hZG1hcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlc3Npb24oe3Nlc3Npb246IG51bGx9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzZXNzaW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaCgnL29uYm9hcmQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZS5kYXRhLmNvZGUgPT09IFwiaW52YWxpZF9qd3RfdG9rZW5cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNzYWdlLndhcm5pbmcoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IucmVxdWVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yJywgZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSwgW10pXG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IHNvY2tldCA9IHVzZVNvY2tldCgpO1xuXG4gICAgdXNlRWZmZWN0KCgpPT57XG4gICAgICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoXG4gICAgICAgICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGNvbmZpZ3VyYXRpb25zIGhlcmVcbiAgICAgICAgICAgICAgICBpZihyZXMuY29uZmlnLm1ldGhvZCA9PT0gXCJwb3N0XCIgJiYgcmVzLmNvbmZpZy51cmwuaW5jbHVkZXMoJ2Fuc3dlci9xdWVzdGlvbicpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuZGF0YSAhPT0gdW5kZWZpbmVkICYmIHJlcy5kYXRhLmRhdGEuYW5zd2VyICE9PSB1bmRlZmluZWQgJiYgcmVzLmRhdGEuZGF0YS5hbnN3ZXIuaXNfdHJ1ZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImF1ZGlvLWNvcnJlY3RcIilbMF0ucGxheSgpLnRoZW4oKCk9Pnt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImF1ZGlvLXdyb25nXCIpWzBdLnBsYXkoKS50aGVuKCgpPT57fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0sW10pO1xuXG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgICAgIC8vY29uc3QgYXVkaW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhdWRpby1lbGVtZW50LWJhc2VcIilbMF07XG4gICAgICAgICAgICAvL2F1ZGlvRWwubXV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgLy9hdWRpb0VsLnBsYXkoKS50aGVuKChlKT0+e2NvbnNvbGUubG9nKCdwbGF5Jyl9KTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKSE9PW51bGwpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgndXNlcl9vbmxpbmUnLCB7dG9rZW46IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSwgW3NvY2tldF0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxhdWRpbyBjbGFzc05hbWU9XCJhdWRpby1lbGVtZW50LWJhc2VcIiBsb29wPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPXttdXNpY30gdHlwZT1cImF1ZGlvL21wZWdcIj48L3NvdXJjZT5cbiAgICAgICAgICAgIDwvYXVkaW8+XG4gICAgICAgICAgICA8YXVkaW8gY2xhc3NOYW1lPVwiYXVkaW8td3JvbmdcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz17bXVzaWNXcm9uZ30gdHlwZT1cImF1ZGlvL21wZWdcIj48L3NvdXJjZT5cbiAgICAgICAgICAgIDwvYXVkaW8+XG4gICAgICAgICAgICA8YXVkaW8gY2xhc3NOYW1lPVwiYXVkaW8tY29ycmVjdFwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPXttdXNpY0NvcnJlY3R9IHR5cGU9XCJhdWRpby9tcGVnXCI+PC9zb3VyY2U+XG4gICAgICAgICAgICA8L2F1ZGlvPlxuICAgICAgICAgICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKT0+e2ZpcnN0Q2xpY2soKX19PlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICA8Lz5cbiAgICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store.js\n");

/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy5jc3MuanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles.css\n");

/***/ }),

/***/ "./urlapi.js":
/*!*******************!*\
  !*** ./urlapi.js ***!
  \*******************/
/*! exports provided: URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"URL\", function() { return URL; });\n/**\n * Created by sinclaireric on 14/05/2018.\n */\nconst URL = 'http://localhost/api-dipongo/public';//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91cmxhcGkuanM/YTJiMiJdLCJuYW1lcyI6WyJVUkwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFTyxNQUFNQSxHQUFHLEdBQUcscUNBQVoiLCJmaWxlIjoiLi91cmxhcGkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgc2luY2xhaXJlcmljIG9uIDE0LzA1LzIwMTguXG4gKi9cblxuZXhwb3J0IGNvbnN0IFVSTCA9ICdodHRwOi8vbG9jYWxob3N0L2FwaS1kaXBvbmdvL3B1YmxpYyc7XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./urlapi.js\n");

/***/ }),

/***/ "./useSocket.js":
/*!**********************!*\
  !*** ./useSocket.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return useSocket; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ \"socket.io-client\");\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default()();\nfunction useSocket(cb) {\n  const {\n    0: activeSocket,\n    1: setActiveSocket\n  } = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    // debug(\"Socket updated\", { socket, activeSocket });\n    if (activeSocket || !socket) return;\n    cb && cb(socket);\n    setActiveSocket(socket);\n    return function cleanup() {\n      // debug(\"Running useSocket cleanup\", { socket });\n      socket.off(\"connection\", cb);\n    };\n  }, [socket]);\n  return activeSocket;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91c2VTb2NrZXQuanM/YzBmYSJdLCJuYW1lcyI6WyJzb2NrZXQiLCJpbyIsInVzZVNvY2tldCIsImNiIiwiYWN0aXZlU29ja2V0Iiwic2V0QWN0aXZlU29ja2V0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJjbGVhbnVwIiwib2ZmIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsTUFBTUEsTUFBTSxHQUFHQyx1REFBRSxFQUFqQjtBQUVlLFNBQVNDLFNBQVQsQ0FBbUJDLEVBQW5CLEVBQXVCO0FBQ2xDLFFBQU07QUFBQSxPQUFDQyxZQUFEO0FBQUEsT0FBZUM7QUFBZixNQUFrQ0Msc0RBQVEsQ0FBQyxJQUFELENBQWhEO0FBRUFDLHlEQUFTLENBQUMsTUFBTTtBQUNaO0FBQ0EsUUFBSUgsWUFBWSxJQUFJLENBQUNKLE1BQXJCLEVBQTZCO0FBQzdCRyxNQUFFLElBQUlBLEVBQUUsQ0FBQ0gsTUFBRCxDQUFSO0FBQ0FLLG1CQUFlLENBQUNMLE1BQUQsQ0FBZjtBQUNBLFdBQU8sU0FBU1EsT0FBVCxHQUFtQjtBQUN0QjtBQUNBUixZQUFNLENBQUNTLEdBQVAsQ0FBVyxZQUFYLEVBQXlCTixFQUF6QjtBQUNILEtBSEQ7QUFJSCxHQVRRLEVBU04sQ0FBQ0gsTUFBRCxDQVRNLENBQVQ7QUFXQSxTQUFPSSxZQUFQO0FBQ0giLCJmaWxlIjoiLi91c2VTb2NrZXQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuY29uc3Qgc29ja2V0ID0gaW8oKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlU29ja2V0KGNiKSB7XG4gICAgY29uc3QgW2FjdGl2ZVNvY2tldCwgc2V0QWN0aXZlU29ja2V0XSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy8gZGVidWcoXCJTb2NrZXQgdXBkYXRlZFwiLCB7IHNvY2tldCwgYWN0aXZlU29ja2V0IH0pO1xuICAgICAgICBpZiAoYWN0aXZlU29ja2V0IHx8ICFzb2NrZXQpIHJldHVybjtcbiAgICAgICAgY2IgJiYgY2Ioc29ja2V0KTtcbiAgICAgICAgc2V0QWN0aXZlU29ja2V0KHNvY2tldCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICAgICAgLy8gZGVidWcoXCJSdW5uaW5nIHVzZVNvY2tldCBjbGVhbnVwXCIsIHsgc29ja2V0IH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9mZihcImNvbm5lY3Rpb25cIiwgY2IpO1xuICAgICAgICB9O1xuICAgIH0sIFtzb2NrZXRdKTtcblxuICAgIHJldHVybiBhY3RpdmVTb2NrZXQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./useSocket.js\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"antd\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbnRkXCI/MDhhYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJhbnRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW50ZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///antd\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jwt-decode\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqd3QtZGVjb2RlXCI/M2U5OSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJqd3QtZGVjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiand0LWRlY29kZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jwt-decode\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/router\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiP2Q4M2UiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibmV4dC9yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3JvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/router\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "socket.io-client":
/*!***********************************!*\
  !*** external "socket.io-client" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io-client\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW8tY2xpZW50XCI/OGJjNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJzb2NrZXQuaW8tY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvLWNsaWVudFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///socket.io-client\n");

/***/ })

/******/ });