/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  font-family: 'Lato', sans-serif;\n  font-family: 'Source Sans Pro', sans-serif;\n  margin: 0px;\n  padding: 0px;\n}\n\n.header {\n  align-items: center;\n  background-color: black;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n  width: 100vw;\n}\n\n.body {\n  display: flex;\n}\n\n.logo {\n  height: 115px;\n}\n\n.header__logo-container {\n  background-color: inherit;\n  margin-right: 20px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-areas:\n    \"navbar main main main main main\";\n  grid-template-columns: repeat(6, 1fr);\n  width: 100vw;\n}\n\n.main-section__content {\n  grid-area: main;\n  position: relative;\n}\n\n.nav-bar {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  grid-area: navbar;\n  justify-content: flex-start;\n}\n\n.nav-bar_p {\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  width: 100%;\n  text-align: center;\n  padding: 30px 20px 30px 20px;\n  font-size: 140%;\n  text-align: center;\n  width: 100%;\n  height: 116px;\n}\n\n.nav-bar_p:hover {\n  color: #F452A1;\n}\n\n.active {\n  background-color: #6B818C;\n  color: white;\n}\n\n.image-container {\n  max-height: 275px;\n  object-fit: cover;\n  overflow: hidden;\n  width: 100%;\n}\n\n.main-section__content-img {\n  height: 100%;\n  object-fit: cover;\n  object-position: 0px -300px;\n  width: 100%;\n}\n\n.card-container {\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: repeat(auto-fit, 16rem);\n  margin: 0px 18px 0px 18px;\n}\n\n.card-img {\n  display: block;\n  height: 94px;\n  object-fit: cover;\n  object-position: center center;\n  width: 100%;\n}\n\n/* .submit {\n  display: flex;\n  justify-content: center;\n} */\n\n.box {\n  border-radius: 25px;\n  height: 186px;\n  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  height: 210px;\n  overflow: hidden;\n  position: relative;\n}\n\n.card-content > p,\nh3,\n.total-expenses {\n  text-align: center;\n}\n\nh3 {\n  padding: 0px 10px 0px 10px;\n}\n\n.responseMessage {\n  color: #06BCC1;\n  font-weight: bold;\n  text-align: center;\n  margin-top: 8px;\n  max-width: 80%;\n}\n\n.total-expenses {\n  font-size: 150%;\n  font-weight: bold;\n  margin: 20px 0px 20px 0px;\n}\n\n.total-expenses-container {\n  border: 3px solid #06BCC1;\n  border-radius: 25px;\n  margin: 25px 4px 0px 4px;\n  box-shadow: 0px 3px 8px #06BCC1;\n  margin-top: 25px;\n  padding: 15px;\n}\n\n.box:hover {\n  box-shadow: inset 0 0 10px #777777;\n}\n\n.form-container {\n  background: white;\n  border-radius: 25px;\n  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  height: 310px;\n  left: 25px;\n  padding: 10px 25px 25px 25px;\n  position: absolute;\n  top: 25px;\n  width: 405px;\n  z-index: 2;\n}\n\nlabel {\n  display: block;\n  font-size: 125%;\n  margin: 10px;\n}\n\ninput,\nselect {\n  cursor: pointer;\n}\n\n.float {\n  position: absolute;\n  top: 10%;\n  right: 5%;\n  background-color: #F01981;\n  border-radius: 25px;\n  color: white;\n  font-weight: bold;\n  font-size: 120%;\n  padding: 7px;\n  position: absolute;\n  right: 5%;\n  top: 10%;\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  font-size: 115%;\n  overflow: scroll;\n}\n\nh1 {\n\n  line-height: 150%;\n  overflow: scroll;\n  padding: 10px;\n}\n\n.login-page {\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  z-index: 5;\n}\n\n.screen {\n  background-color: white;\n  height: 100%;\n  opacity: .7;\n  position: fixed;\n  width: 100%;\n  z-index: 3;\n}\n\n.login-container {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  min-height: fit-content;\n  width: fit-content;\n}\n\n.login-form-container {\n  align-items: center;\n  background-color: white;\n  border-radius: 25px;\n  box-shadow: inset 0 0 10px #F452A1;\n  display: flex;\n  flex-direction: column;\n  min-height: fit-content;\n  min-width: fit-content;\n  padding: 40px;\n  z-index: 5;\n}\n\n.login-fox {\n  display: block;\n  max-height: 75px;\n}\n\nform > p {\n  margin: 15px;\n}\n\nh1, h2 {\n  padding: 20px;\n}\n\nh2, h3 {\n  text-align: center;\n}\n\n.submit {\n  align-items: center;\n  background-color: #6B818C;\n  border: 3px solid gray;\n  margin: 0px 50% 0px 50%;\n  padding: 8px;\n  color: white;\n  cursor: pointer;\n  border-radius: 25px;\n  height: 2em;\n  display: flex;\n  min-width: fit-content;\n  white-space: nowrap;\n}\n\n.hidden {\n  display: none;\n}\n\n.transparent {\n  visibility: hidden;\n}\n\n@media (max-width: 1160px) {\n  .main-section__content-img {\n    height: 100%;\n    object-fit: cover;\n    object-position: 0px 0px;\n    width: 100%;\n    /* try hard-coding proportions */\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,+BAA+B;EAC/B,0CAA0C;EAC1C,WAAW;EACX,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,8BAA8B;EAC9B,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb;qCACmC;EACnC,qCAAqC;EACrC,YAAY;AACd;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,iBAAiB;EACjB,2BAA2B;AAC7B;;AAEA;EACE,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,4BAA4B;EAC5B,eAAe;EACf,kBAAkB;EAClB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,2BAA2B;EAC3B,WAAW;AACb;;AAEA;EACE,aAAa;EACb,SAAS;EACT,8CAA8C;EAC9C,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,iBAAiB;EACjB,8BAA8B;EAC9B,WAAW;AACb;;AAEA;;;GAGG;;AAEH;EACE,mBAAmB;EACnB,aAAa;EACb,wCAAwC;EACxC,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;;;EAGE,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,kBAAkB;EAClB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,wBAAwB;EACxB,+BAA+B;EAC/B,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,wCAAwC;EACxC,aAAa;EACb,sBAAsB;EACtB,aAAa;EACb,UAAU;EACV,4BAA4B;EAC5B,kBAAkB;EAClB,SAAS;EACT,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,eAAe;EACf,YAAY;AACd;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,yBAAyB;EACzB,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,SAAS;EACT,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,gBAAgB;AAClB;;AAEA;;EAEE,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,uBAAuB;EACvB,eAAe;EACf,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,eAAe;EACf,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;EACnB,kCAAkC;EAClC,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;EACtB,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;EACzB,sBAAsB;EACtB,uBAAuB;EACvB,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE;IACE,YAAY;IACZ,iBAAiB;IACjB,wBAAwB;IACxB,WAAW;IACX,gCAAgC;EAClC;AACF","sourcesContent":["* {\n  box-sizing: border-box;\n  font-family: 'Lato', sans-serif;\n  font-family: 'Source Sans Pro', sans-serif;\n  margin: 0px;\n  padding: 0px;\n}\n\n.header {\n  align-items: center;\n  background-color: black;\n  color: white;\n  display: flex;\n  justify-content: space-between;\n  width: 100vw;\n}\n\n.body {\n  display: flex;\n}\n\n.logo {\n  height: 115px;\n}\n\n.header__logo-container {\n  background-color: inherit;\n  margin-right: 20px;\n}\n\n.main-section {\n  display: grid;\n  grid-template-areas:\n    \"navbar main main main main main\";\n  grid-template-columns: repeat(6, 1fr);\n  width: 100vw;\n}\n\n.main-section__content {\n  grid-area: main;\n  position: relative;\n}\n\n.nav-bar {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  grid-area: navbar;\n  justify-content: flex-start;\n}\n\n.nav-bar_p {\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  width: 100%;\n  text-align: center;\n  padding: 30px 20px 30px 20px;\n  font-size: 140%;\n  text-align: center;\n  width: 100%;\n  height: 116px;\n}\n\n.nav-bar_p:hover {\n  color: #F452A1;\n}\n\n.active {\n  background-color: #6B818C;\n  color: white;\n}\n\n.image-container {\n  max-height: 275px;\n  object-fit: cover;\n  overflow: hidden;\n  width: 100%;\n}\n\n.main-section__content-img {\n  height: 100%;\n  object-fit: cover;\n  object-position: 0px -300px;\n  width: 100%;\n}\n\n.card-container {\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: repeat(auto-fit, 16rem);\n  margin: 0px 18px 0px 18px;\n}\n\n.card-img {\n  display: block;\n  height: 94px;\n  object-fit: cover;\n  object-position: center center;\n  width: 100%;\n}\n\n/* .submit {\n  display: flex;\n  justify-content: center;\n} */\n\n.box {\n  border-radius: 25px;\n  height: 186px;\n  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  height: 210px;\n  overflow: hidden;\n  position: relative;\n}\n\n.card-content > p,\nh3,\n.total-expenses {\n  text-align: center;\n}\n\nh3 {\n  padding: 0px 10px 0px 10px;\n}\n\n.responseMessage {\n  color: #06BCC1;\n  font-weight: bold;\n  text-align: center;\n  margin-top: 8px;\n  max-width: 80%;\n}\n\n.total-expenses {\n  font-size: 150%;\n  font-weight: bold;\n  margin: 20px 0px 20px 0px;\n}\n\n.total-expenses-container {\n  border: 3px solid #06BCC1;\n  border-radius: 25px;\n  margin: 25px 4px 0px 4px;\n  box-shadow: 0px 3px 8px #06BCC1;\n  margin-top: 25px;\n  padding: 15px;\n}\n\n.box:hover {\n  box-shadow: inset 0 0 10px #777777;\n}\n\n.form-container {\n  background: white;\n  border-radius: 25px;\n  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);\n  display: flex;\n  flex-direction: column;\n  height: 310px;\n  left: 25px;\n  padding: 10px 25px 25px 25px;\n  position: absolute;\n  top: 25px;\n  width: 405px;\n  z-index: 2;\n}\n\nlabel {\n  display: block;\n  font-size: 125%;\n  margin: 10px;\n}\n\ninput,\nselect {\n  cursor: pointer;\n}\n\n.float {\n  position: absolute;\n  top: 10%;\n  right: 5%;\n  background-color: #F01981;\n  border-radius: 25px;\n  color: white;\n  font-weight: bold;\n  font-size: 120%;\n  padding: 7px;\n  position: absolute;\n  right: 5%;\n  top: 10%;\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  font-size: 115%;\n  overflow: scroll;\n}\n\nh1 {\n\n  line-height: 150%;\n  overflow: scroll;\n  padding: 10px;\n}\n\n.login-page {\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  z-index: 5;\n}\n\n.screen {\n  background-color: white;\n  height: 100%;\n  opacity: .7;\n  position: fixed;\n  width: 100%;\n  z-index: 3;\n}\n\n.login-container {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  min-height: fit-content;\n  width: fit-content;\n}\n\n.login-form-container {\n  align-items: center;\n  background-color: white;\n  border-radius: 25px;\n  box-shadow: inset 0 0 10px #F452A1;\n  display: flex;\n  flex-direction: column;\n  min-height: fit-content;\n  min-width: fit-content;\n  padding: 40px;\n  z-index: 5;\n}\n\n.login-fox {\n  display: block;\n  max-height: 75px;\n}\n\nform > p {\n  margin: 15px;\n}\n\nh1, h2 {\n  padding: 20px;\n}\n\nh2, h3 {\n  text-align: center;\n}\n\n.submit {\n  align-items: center;\n  background-color: #6B818C;\n  border: 3px solid gray;\n  margin: 0px 50% 0px 50%;\n  padding: 8px;\n  color: white;\n  cursor: pointer;\n  border-radius: 25px;\n  height: 2em;\n  display: flex;\n  min-width: fit-content;\n  white-space: nowrap;\n}\n\n.hidden {\n  display: none;\n}\n\n.transparent {\n  visibility: hidden;\n}\n\n@media (max-width: 1160px) {\n  .main-section__content-img {\n    height: 100%;\n    object-fit: cover;\n    object-position: 0px 0px;\n    width: 100%;\n    /* try hard-coding proportions */\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "fetchUserData": () => (/* binding */ fetchUserData),
/* harmony export */   "fetchPost": () => (/* binding */ fetchPost)
/* harmony export */ });
const fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, we were unable to retrieve necessary data. Please try again.");
      };
      return response.json();
    })
  .then(data => data[dataType])
};

const fetchUserData = (userID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, we were unable to retrieve your account information. Please try again.");
      };
      return response.json();
    })
    // .then(data => data)
};

const fetchPost = (newTripObj) => {
  return fetch('http://localhost:3001/api/v1/trips', newTripObj)
    .then(response => {
      if(!response.ok) {
        throw new Error("Sorry, your request was not submitted. Please try again.");
      };
      return response.json();
    });
};




/***/ }),
/* 7 */
/***/ ((module) => {

class Traveler {
  constructor(travelerObj) {
    this.id = travelerObj.id,
    this.name = travelerObj.name,
    this.travelerType = travelerObj.travelerType
  }

  filterTravelersTrips(tripsArray) {
    return tripsArray.filter(tripObj => tripObj.userID === this.id)
  };

  returnYearExpenditures(tripsArray, destinationsArray, year) {
    let eachTripCosts = [];
    this.filterTravelersTrips(tripsArray).forEach(thisUsersTrip => {
      let destinationObj = destinationsArray.find(destination => destination.id === thisUsersTrip.destinationID)
      if(thisUsersTrip.date.includes(year) && thisUsersTrip.status !== 'pending') {
        const baseCost = (thisUsersTrip.duration * destinationObj.estimatedLodgingCostPerDay)
          + (destinationObj.estimatedFlightCostPerPerson * thisUsersTrip.travelers);
        eachTripCosts.push(baseCost + (baseCost * .1));
      }
    });
    return Math.round(eachTripCosts.reduce((total, curr) => {
      return total += curr
    }, 0)).toLocaleString('en-US');
  };

  greetUser() {
    return this.name.split(" ")[0]
  };

};

module.exports = Traveler;


/***/ }),
/* 8 */
/***/ ((module) => {

class Trip {
  constructor(user, destination, tripObj) {
    this.id = tripObj.id || Date.now(),
    this.userID = user.id,
    this.destinationID = destination.id,
    this.travelers = tripObj.travelers,
    this.date = tripObj.date,
    this.duration = tripObj.duration,
    this.status = 'pending',
    this.suggestedActivities = [];
  };

  calculateCost(destinationObj) {
    const costWithoutFee = (this.travelers * destinationObj.estimatedFlightCostPerPerson)
     + (this.duration * destinationObj.estimatedLodgingCostPerDay);
    const fee = costWithoutFee * .1;
    return `$${parseInt(costWithoutFee + fee).toLocaleString()}`;
  };

  approveTrip() {
    this.status = 'approved';
  };
};

module.exports = Trip;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destinationsData": () => (/* binding */ destinationsData)
/* harmony export */ });
const destinationsData = {
destinations: [
{
id: 1,
destination: "Lima, Peru",
estimatedLodgingCostPerDay: 70,
estimatedFlightCostPerPerson: 400,
image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
alt: "overview of city buildings with a clear sky"
},
{
id: 2,
destination: "Stockholm, Sweden",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 780,
image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "city with boats on the water during the day time"
},
{
id: 3,
destination: "Sydney, Austrailia",
estimatedLodgingCostPerDay: 130,
estimatedFlightCostPerPerson: 950,
image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "opera house and city buildings on the water with boats"
},
{
id: 4,
destination: "Cartagena, Colombia",
estimatedLodgingCostPerDay: 65,
estimatedFlightCostPerPerson: 350,
image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
alt: "boats at a dock during the day time"
},
{
id: 5,
destination: "Madrid, Spain",
estimatedLodgingCostPerDay: 150,
estimatedFlightCostPerPerson: 650,
image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "city with clear skys and a road in the day time"
},
{
id: 6,
destination: "Jakarta, Indonesia",
estimatedLodgingCostPerDay: 70,
estimatedFlightCostPerPerson: 890,
image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "lit up city at night"
},
{
id: 7,
destination: "Paris, France",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 395,
image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
alt: "city during the day time with eiffel tower"
},
{
id: 8,
destination: "Tokyo, Japan",
estimatedLodgingCostPerDay: 125,
estimatedFlightCostPerPerson: 1000,
image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
alt: "city with people walking in crosswalk and brightly lit shops at night"
},
{
id: 9,
destination: "Amsterdam, Netherlands",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 950,
image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "canal with boats and trees and buildings along the side"
},
{
id: 10,
destination: "Toronto, Canada",
estimatedLodgingCostPerDay: 90,
estimatedFlightCostPerPerson: 450,
image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
},
{
id: 11,
destination: "Mikonos, Greece",
estimatedLodgingCostPerDay: 140,
estimatedFlightCostPerPerson: 1000,
image: "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80",
alt: "cityscape along the water during the day"
},
{
id: 12,
destination: "Wellington, New Zealand",
estimatedLodgingCostPerDay: 150,
estimatedFlightCostPerPerson: 1200,
image: "https://images.unsplash.com/photo-1442483221814-59f7d8b22739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "overview of city with buildings, water and trees"
},
{
id: 13,
destination: "St. Petersburg, Russia",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 1100,
image: "https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "buildings and people crossing the street carrying shoping bags during the day"
},
{
id: 14,
destination: "Marrakesh, Morocco",
estimatedLodgingCostPerDay: 70,
estimatedFlightCostPerPerson: 830,
image: "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
alt: "people buying oranges and other fruit from a street vendor"
},
{
id: 15,
destination: "Manila, Philippines",
estimatedLodgingCostPerDay: 40,
estimatedFlightCostPerPerson: 900,
image: "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "colorful buildings near the water with docked boats"
},
{
id: 16,
destination: "Bangkok, Thailand",
estimatedLodgingCostPerDay: 35,
estimatedFlightCostPerPerson: 988,
image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
alt: "ornate buildings with a garden during the day"
},
{
id: 17,
destination: "Jaipur, India",
estimatedLodgingCostPerDay: 30,
estimatedFlightCostPerPerson: 1200,
image: "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "a courtyard with trees and mountain in the distance"
},
{
id: 18,
destination: "Cape Town, South Africa",
estimatedLodgingCostPerDay: 120,
estimatedFlightCostPerPerson: 1200,
image: "https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80",
alt: "a city with mountain cliffs by the sea"
},
{
id: 19,
destination: "Quito, Ecuador",
estimatedLodgingCostPerDay: 60,
estimatedFlightCostPerPerson: 500,
image: "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
alt: "a city at night with cloudy, snowy mountains in the distance"
},
{
id: 20,
destination: "Miami, Florida",
estimatedLodgingCostPerDay: 158,
estimatedFlightCostPerPerson: 275,
image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
alt: "sand with palm trees and tall buildings in the background"
},
{
id: 21,
destination: "Tulum, Mexico",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 350,
image: "https://images.unsplash.com/photo-1501619593928-bef49688c888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "a donkey standing on the beach"
},
{
id: 22,
destination: "Rome, Italy",
estimatedLodgingCostPerDay: 90,
estimatedFlightCostPerPerson: 650,
image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "people standing inside a colosseum during the day"
},
{
id: 23,
destination: "Copenhagen, Denmark",
estimatedLodgingCostPerDay: 120,
estimatedFlightCostPerPerson: 1000,
image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "colorful buildings with holiday decorations by the water with tents and docked boats"
},
{
id: 24,
destination: "Vilnius, Lithuania",
estimatedLodgingCostPerDay: 65,
estimatedFlightCostPerPerson: 1100,
image: "https://images.unsplash.com/photo-1549891472-991e6bc75d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
alt: "overhead view of a city with a hot air balloon"
},
{
id: 25,
destination: "New York, New York",
estimatedLodgingCostPerDay: 175,
estimatedFlightCostPerPerson: 200,
image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "people crossing the street during the day surrounded by tall buildings and advertisements"
},
{
id: 26,
destination: "London, England",
estimatedLodgingCostPerDay: 100,
estimatedFlightCostPerPerson: 1000,
image: "https://images.unsplash.com/photo-1549471156-52ee71691122?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "city with bridge under night sky"
},
{
id: 27,
destination: "San Francisco, California",
estimatedLodgingCostPerDay: 175,
estimatedFlightCostPerPerson: 200,
image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
alt: "golden gate bridge during the day time"
},
{
id: 28,
destination: "San Juan, Puerto Rico",
estimatedLodgingCostPerDay: 70,
estimatedFlightCostPerPerson: 900,
image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
alt: "white and brown concrete buildings near sea under white clouds during daytime"
},
{
id: 29,
destination: "Willemstad, Curaçao",
estimatedLodgingCostPerDay: 80,
estimatedFlightCostPerPerson: 1100,
image: "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
alt: "brightly colored buildings near body of water"
},
{
id: 30,
destination: "Antananarivo, Madagascar",
estimatedLodgingCostPerDay: 70,
estimatedFlightCostPerPerson: 1200,
image: "https://images.unsplash.com/photo-1563656353898-febc9270a0f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "landscape photo of a city skyline"
},
{
id: 31,
destination: "Colombo, Sri Lanka",
estimatedLodgingCostPerDay: 55,
estimatedFlightCostPerPerson: 1300,
image: "https://images.unsplash.com/photo-1578159802020-13ec49d669df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "people walking inside flea market"
},
{
id: 32,
destination: "Kathmandu, Nepal",
estimatedLodgingCostPerDay: 45,
estimatedFlightCostPerPerson: 1200,
image: "https://images.unsplash.com/photo-1558799401-1dcba79834c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
alt: "temple with buntings during daytime"
},
{
id: 33,
destination: "Brussels, Belgium",
estimatedLodgingCostPerDay: 1000,
estimatedFlightCostPerPerson: 110,
image: "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "brown concrete gate"
},
{
id: 34,
destination: "Seoul, South Korea",
estimatedLodgingCostPerDay: 1200,
estimatedFlightCostPerPerson: 150,
image: "https://images.unsplash.com/photo-1578193661644-dee2e67b779b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2025&q=80",
alt: "aerial photography of city during daytime"
},
{
id: 35,
destination: "Anchorage, Alaska",
estimatedLodgingCostPerDay: 200,
estimatedFlightCostPerPerson: 100,
image: "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
alt: "man riding on kayak surrounded by mountains"
},
{
id: 36,
destination: "Reykjavík, Iceland",
estimatedLodgingCostPerDay: 900,
estimatedFlightCostPerPerson: 120,
image: "https://images.unsplash.com/photo-1515005319369-c4406c3f832b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
alt: "frozen river in the middle of rock mountains"
},
{
id: 37,
destination: "Frankfurt, Germany",
estimatedLodgingCostPerDay: 1100,
estimatedFlightCostPerPerson: 150,
image: "https://images.unsplash.com/photo-1564859117892-8c3657465bfb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
alt: "grey concrete bridge at night"
},
{
id: 38,
destination: "Helsinki, Finland",
estimatedLodgingCostPerDay: 950,
estimatedFlightCostPerPerson: 100,
image: "https://images.unsplash.com/photo-1517128581046-8ee7e6fa3cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1484&q=80",
alt: "two white motorboats on dock near brown trees at daytime"
},
{
id: 39,
destination: "Porto, Portugal",
estimatedLodgingCostPerDay: 995,
estimatedFlightCostPerPerson: 90,
image: "https://images.unsplash.com/photo-1564644929137-34b018daf461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1778&q=80",
alt: "looking over the water on to a city on a hill"
},
{
id: 40,
destination: "La Isla Tortuga, Costa Rica",
estimatedLodgingCostPerDay: 600,
estimatedFlightCostPerPerson: 80,
image: "https://images.unsplash.com/photo-1536708880921-03a9306ec47d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1336&q=80",
alt: "trees near seashore"
},
{
id: 41,
destination: "Montego Bay, Jamaica",
estimatedLodgingCostPerDay: 500,
estimatedFlightCostPerPerson: 100,
image: "https://images.unsplash.com/photo-1557129604-0e50f1300fab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
alt: "boats docked beside trees on river"
},
{
id: 42,
destination: "Santo Domingo, Dominican Republic",
estimatedLodgingCostPerDay: 400,
estimatedFlightCostPerPerson: 80,
image: "https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
alt: "aerial view of houses and high rise building"
},
{
id: 43,
destination: "Nassau, The Bahamas",
estimatedLodgingCostPerDay: 550,
estimatedFlightCostPerPerson: 90,
image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
alt: "aerial photography of white and blue cruise ships during daytime"
},
{
id: 44,
destination: "Caye Caulker, Belize",
estimatedLodgingCostPerDay: 450,
estimatedFlightCostPerPerson: 80,
image: "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
alt: "boat on dock during daytime"
},
{
id: 45,
destination: "Calgary, Canada",
estimatedLodgingCostPerDay: 200,
estimatedFlightCostPerPerson: 125,
image: "https://images.unsplash.com/photo-1523167508699-c34c50472b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
alt: "city buildings reflection on body of water"
},
{
id: 46,
destination: "Victoria, Seychelles",
estimatedLodgingCostPerDay: 1100,
estimatedFlightCostPerPerson: 100,
image: "https://images.unsplash.com/photo-1539980307411-6820f89db71b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
alt: "birds eye photography of body of water"
},
{
id: 47,
destination: "Zürich, Switzerland",
estimatedLodgingCostPerDay: 1100,
estimatedFlightCostPerPerson: 110,
image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1390&q=80",
alt: "landscape photo of cityscape"
},
{
id: 48,
destination: "Dar es Salaam, Tanzania",
estimatedLodgingCostPerDay: 1200,
estimatedFlightCostPerPerson: 100,
image: "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
alt: "aerial photography of high-rise building"
},
{
id: 49,
destination: "Castries, St Lucia",
estimatedLodgingCostPerDay: 650,
estimatedFlightCostPerPerson: 90,
image: "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
alt: "aerial photography of rocky mountain under cloudy sky"
},
{
id: 50,
destination: "Hobart, Tasmania",
estimatedLodgingCostPerDay: 1400,
estimatedFlightCostPerPerson: 75,
image: "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
alt: "person sitting on brown rock in front of small body of water"
}
]
};




/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ellyn": () => (/* binding */ ellyn)
/* harmony export */ });
const ellyn = {
  user: {
  id: 14,
  name: "Ellynn Kyne",
  travelerType: "history buff"
  },
  trips: [{
  id: 13,
  userID: 14,
  destinationID: 12,
  travelers: 1,
  date: "2022/02/12",
  duration: 11,
  status: "approved",
  suggestedActivities: [ ]
  },
  {
  id: 23,
  userID: 14,
  destinationID: 24,
  travelers: 6,
  date: "2022/01/02",
  duration: 18,
  status: "approved",
  suggestedActivities: [ ]
  },
  {
  id: 85,
  userID: 14,
  destinationID: 32,
  travelers: 2,
  date: "2020/02/21",
  duration: 5,
  status: "approved",
  suggestedActivities: [ ]
}]
};




/***/ }),
/* 11 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ }),
/* 12 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/Oregon.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travelfox.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travelfox_white_notext.svg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travelfox_pink_notext.svg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Traveler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _Traveler_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Traveler_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Trip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Trip_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Trip_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _destinations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _traveler14_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_Oregon_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _images_travelfox_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _images_travelfox_white_notext_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _images_travelfox_pink_notext_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16);

// IMPORTS:






const dayjs = __webpack_require__(11)
var isSameOrBefore = __webpack_require__(12);
dayjs.extend(isSameOrBefore);

//IMAGES:





//QUERY SELECTORS:
const welcomeName = document.getElementById('header__welcome-message-name');
const userExpenses = document.getElementById('total-expenses');
const reviewExpensesBtn = document.getElementById('nav-bar__my-expenses');
const userExpensesContainer = document.getElementById('total-expenses-container');
const myTripsSection = document.getElementById('card-container');
const newTripBtn = document.getElementById('nav-bar__new-trip');
const newTripForm = document.getElementById('form-container');
const viewTripsBtn = document.getElementById('nav-bar__my-trips');
const buttonArray = [newTripBtn, reviewExpensesBtn, viewTripsBtn];
const submitBtn = document.getElementById('submit-btn');
const destinationChooser = document.getElementById('destinations');
const numTravelers = document.getElementById('num-travelers');
const startDate = document.getElementById('start-date');
const duration = document.getElementById('duration');
const responseMessage = document.getElementById('responseMessage');
const form = document.getElementById('new-trip-form');
const heading = document.getElementById('my-trips');
const loginBtn = document.getElementById('login-btn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginValidationMsg = document.getElementById('login-validation-msg');
const loginPage = document.getElementById('login-page');

//GLOBAL VARIABLES:
let currentYear = dayjs().format('YYYY');
let allDestinations;
let allTrips;
let currentUser;

//EVENT LISTENERS:
reviewExpensesBtn.addEventListener('click', showOrHideExpenses);
reviewExpensesBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { showOrHideExpenses() }
  });
newTripBtn.addEventListener('click', showOrHideRequestForm);
newTripBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { showOrHideRequestForm() }
  });
submitBtn.addEventListener('click', checkForm);
submitBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { checkForm() }
  });
viewTripsBtn.addEventListener('click', changeViewTripsBtn);
viewTripsBtn.addEventListener('keyup', function(e) {
  if(e.keyCode === 13) { changeViewTripsBtn() }
  });
loginBtn.addEventListener('click', checkLogin);


//FUNCTIONS:
function checkLogin() {
  if (!username.value || !password.value) {
    loginValidationMsg.innerText = "you must complete both fields!";
    reveal(loginValidationMsg);
  } else if (password.value !== 'travel') {
    loginValidationMsg.innerText = "wrong password, try again.";
    reveal(loginValidationMsg);
  } else {
    logIn(username.value);
  };
};

function logIn(username) {
  getData(username.slice(8));
  hide(loginPage);
};

function getData(userID) {
  allDestinations = _destinations_js__WEBPACK_IMPORTED_MODULE_4__.destinationsData.destinations;
  allTrips = _traveler14_js__WEBPACK_IMPORTED_MODULE_5__.ellyn.trips;
  currentUser = new (_Traveler_js__WEBPACK_IMPORTED_MODULE_2___default())(_traveler14_js__WEBPACK_IMPORTED_MODULE_5__.ellyn.user);
  generatePageLoad();
};

function generatePageLoad() {
  renderUserGreeting();
  renderUserExpenditures();
  renderUserCards();
  fillDestinationOptions();
};

function fillDestinationOptions() {
  allDestinations
  .sort((a, b) => {
      if(a.destination < b.destination) {
        return -1;
      } else {
        return 1;
      };
    })
  .forEach(destinationObj => {
    const newOption = document.createElement('option');
    newOption.value = destinationObj.destination;
    newOption.innerText = destinationObj.destination;
    destinationChooser.appendChild(newOption);
  });
};

function submitForm() {
  const date = dayjs(startDate.value).format('YYYY/MM/DD');
  const destination = allDestinations
    .find(destinationObj => destinationObj.destination === destinationChooser.value);
  const trip = new (_Trip_js__WEBPACK_IMPORTED_MODULE_3___default())(currentUser, destination, { travelers:`${numTravelers.value}`, date: date, duration:`${duration.value}` });
  allTrips.push(trip);
  respondSuccess(trip, destination);
  getData(currentUser.id);
  form.reset();
};

function checkForm() {
  event.preventDefault();
  if(checkInputs()) {
    submitForm();
  } else if (dayjs(startDate.value).isSameOrBefore(dayjs(), 'day')) {
    responseMessage.innerText = "Please select a date in the future!";
    reveal(responseMessage);
  } else if (numTravelers.value <= 0 || duration.value <= 0) {
    responseMessage.innerText = "Please check your numbers!"
    reveal(responseMessage);
  } else {
    responseMessage.innerText = "Please complete all fields!";
    reveal(responseMessage);
  };
};

function checkInputs() {
  return (!dayjs(startDate.value).isSameOrBefore(dayjs(), 'day')
    && destinationChooser.value
    && startDate.value
    && numTravelers.value > 0
    && duration.value > 0)
}

function respondSuccess(trip, destinationObj) {
  reveal(responseMessage);
  responseMessage.innerText = `Request submitted! Your estimated total is ${trip.calculateCost(destinationObj)}.`;
  setTimeout(function() {
    obscure(responseMessage);
  }, 3000);
};

function respondError(error) {
  reveal(responseMessage);
  responseMessage.innerText = error;
  setTimeout(function() {
    hide(responseMessage);
  }, 2000);
};

function respondLoadError(error) {
  myTripsSection.innerText = error;
};

function renderUserGreeting() {
  welcomeName.innerText = currentUser.greetUser();
};

function renderUserExpenditures() {
  userExpenses.innerText = `$${currentUser.returnYearExpenditures(allTrips, allDestinations, currentYear)}`
};

function renderUserCards() {
  myTripsSection.innerHTML = "";
  const userTrips = currentUser.filterTravelersTrips(allTrips);
  userTrips.forEach(tripObj => {
    const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID);
    const classedTrip = new (_Trip_js__WEBPACK_IMPORTED_MODULE_3___default())(currentUser, destinationObj, tripObj);
    myTripsSection.appendChild(createACard(destinationObj, classedTrip));
  })
};

function renderFilteredTrips(filter) {
  myTripsSection.innerHTML = "";
  const userTrips = currentUser.filterTravelersTrips(allTrips).filter(trip => {
    if(filter === 'past') {
      return calculateStatus(trip) === 'past';
    } else {
      return calculateStatus(trip) !== 'past';
      };
    });
  userTrips.forEach(tripObj => {
    const destinationObj = allDestinations.find(destination => destination.id === tripObj.destinationID)
    const classedTrip = new (_Trip_js__WEBPACK_IMPORTED_MODULE_3___default())(currentUser, destinationObj, tripObj);
    myTripsSection.appendChild(createACard(destinationObj, classedTrip));
    });
};

function createACard(destinationObj, tripObj) {
  const newElement = document.createElement('article');
  const formattedDate = dayjs(tripObj.date).format('MM/DD/YYYY')
  const endDate = dayjs(tripObj.date).add(tripObj.duration, 'day').format('MM/DD/YYYY');
  const status = calculateStatus(tripObj);
  newElement.classList.add('box');
  newElement.innerHTML = `<img class="card-img" src=${destinationObj.image} alt=${destinationObj.alt}/>
                          <p class="status-box float">${status}</p>
                          <div class="card-content" id="card-content">
                          <p id="location">${destinationObj.destination}</p>
                          <p id="date">${formattedDate} - ${endDate}</p>
                          <p id="price">${tripObj.calculateCost(destinationObj)}</p>
                          </div>`;
  return newElement;
};

function calculateStatus(tripObj) {
  if (!dayjs().isSameOrBefore(tripObj.date, 'day')) {
    return 'past';
  } else {
    return tripObj.status;
  };
};

function changeViewTripsBtn() {
  makeActive(viewTripsBtn);
  if(viewTripsBtn.innerText === 'view all trips') {
    heading.innerText = 'All my trips'
    viewTripsBtn.innerText = 'view upcoming trips';
    renderUserCards();
  } else if (viewTripsBtn.innerText === 'view upcoming trips') {
    heading.innerText = 'My upcoming trips'
    viewTripsBtn.innerText = 'view past trips';
    renderFilteredTrips('future');
  } else if (viewTripsBtn.innerText === 'view past trips') {
    heading.innerText = 'My past trips'
    viewTripsBtn.innerText = 'view all trips'
    renderFilteredTrips('past');
  };
};

//DISPLAY/HIDE FNs:
function showOrHideRequestForm() {
  if(newTripForm.classList.contains('hidden')) {
    unhide(newTripForm);
    makeActive(newTripBtn);
    newTripBtn.innerText = 'nevermind';
  } else {
    hide(newTripForm);
    makeInactive(newTripBtn);
    newTripBtn.innerText = 'new trip request';
  }
};

function showOrHideExpenses() {
  if(userExpensesContainer.classList.contains("hidden")) {
    unhide(userExpensesContainer);
    makeActive(reviewExpensesBtn);
    reviewExpensesBtn.innerText = "hide my travel expenses";
  } else {
    hideExpenses();
  }
};

function hideExpenses() {
  if(!userExpensesContainer.classList.contains("hidden")) {
    hide(userExpensesContainer);
    makeInactive(reviewExpensesBtn);
    reviewExpensesBtn.innerText = "review my travel expenses"
  }
};

function makeActive(element) {
  element.classList.add('active');
};

function makeInactive(element) {
  element.classList.remove('active');
};

function unhide(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function reveal(element) {
  element.classList.remove('transparent');
};

function obscure(element) {
  element.classList.add('transparent');
};

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map