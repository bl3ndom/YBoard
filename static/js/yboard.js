/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _Captcha = __webpack_require__(5);

var _Captcha2 = _interopRequireDefault(_Captcha);

var _Theme = __webpack_require__(11);

var _Theme2 = _interopRequireDefault(_Theme);

var _Toast = __webpack_require__(16);

var _Toast2 = _interopRequireDefault(_Toast);

var _Catalog = __webpack_require__(6);

var _Catalog2 = _interopRequireDefault(_Catalog);

var _Thread = __webpack_require__(12);

var _Thread2 = _interopRequireDefault(_Thread);

var _Post = __webpack_require__(8);

var _Post2 = _interopRequireDefault(_Post);

var _PostForm = __webpack_require__(9);

var _PostForm2 = _interopRequireDefault(_PostForm);

var _Modal = __webpack_require__(7);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YBoard = function () {
    function YBoard() {
        _classCallCheck(this, YBoard);

        this.Catalog = new _Catalog2.default();
        this.Captcha = new _Captcha2.default();
        this.Theme = new _Theme2.default();
        this.Toast = new _Toast2.default();
        this.Thread = new _Thread2.default();
        this.Post = new _Post2.default();
        this.PostForm = new _PostForm2.default();
        this.Modal = new _Modal2.default();

        if (this.isBadBrowser()) {
            this.browserWarning();
        }

        document.addEventListener('keydown', function (e) {
            if (!e.ctrlKey && !e.shiftKey && e.which === 116 || e.ctrlKey && !e.shiftKey && e.which === 82) {
                // Make F5 || CTRL + R function like clicking links and thus not reloading everything
                // Maybe we can remove this completely one day.
                this.pageReload();
                return false;
            }
            if (e.ctrlKey && e.which === 13) {
                // Submit the post form with CTRL + Enter
                this.PostForm.submit(e);
            }
        });
    }

    _createClass(YBoard, [{
        key: 'getSelectionText',
        value: function getSelectionText() {
            var text = '';
            if (window.getSelection) {
                text = window.getSelection().toString();
            } else {
                if (document.selection && document.selection.type !== 'Control') {
                    text = document.selection.createRange().text;
                }
            }

            return text;
        }
    }, {
        key: 'isBadBrowser',
        value: function isBadBrowser() {
            if (typeof FormData !== 'function') {
                return true;
            }

            if ((typeof localStorage === 'undefined' ? 'undefined' : _typeof(localStorage)) !== 'object') {
                return true;
            }

            return false;
        }
    }, {
        key: 'browserWarning',
        value: function browserWarning() {
            var browserWarning = document.createElement('div');
            browserWarning.classList.add('old-browser-warning');
            browserWarning.innerHTML = '<p>' + messages.oldBrowserWarning + '</p>';

            document.body.appendChild(browserWarning);
        }
    }, {
        key: 'pageReload',
        value: function pageReload() {
            window.location = window.location.href.split('#')[0];
        }
    }, {
        key: 'returnToBoard',
        value: function returnToBoard() {
            // Remove everything after the last slash and redirect
            // Should work if we are in a thread, otherwise not really
            var url = window.location.href;
            url = url.substr(0, url.lastIndexOf('/') + 1);

            window.location = url;
        }
    }, {
        key: 'spinnerHtml',
        value: function spinnerHtml() {
            var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (classes !== '') {
                classes += ' ';
            }

            return '<span class="' + classes + 'loading icon-loading spin"></span>';
        }
    }, {
        key: 'submitForm',
        value: function submitForm(e) {
            e.preventDefault();

            var form = $(e.target);
            var fd = new FormData(e.target);

            var overlay = $('<div class="form-overlay"><div>' + this.spinnerHtml() + '</div></div>');
            form.append(overlay);

            _YQuery2.default.post(form.getAttribute('action'), fd).done(function (data) {
                if (data.reload) {
                    if (data.url) {
                        window.location = data.url;
                    } else {
                        window.location.reload();
                    }
                } else {
                    overlay.remove();
                    this.Toast.success(data.message);
                    form.reset();
                }
            }).fail(function () {
                overlay.remove();
            });
        }
    }, {
        key: 'signup',
        value: function signup(elm, e) {
            // Signup form in sidebar
            e.preventDefault();
            elm = $(elm);

            this.Captcha.render('signup-captcha', {
                'size': 'invisible',
                'theme': 'dark'
            });

            var form = $('#login');
            var signupForm = $('#signup-form');

            if (typeof form.data('login') === 'undefined') {
                form.data('login', form.attr('action'));
            }

            if (!elm.data('open')) {
                form.attr('action', form.data('signup'));
                elm.html(messages.cancel);
                $('#loginbutton').val(messages.signUp);
                signupForm.slideDown();
                elm.data('open', true);
            } else {
                form.attr('action', form.data('login'));
                elm.html(messages.signUp);

                $('#loginbutton').val(messages.logIn);
                signupForm.slideUp();
                signupForm.find('input').val('');
                elm.data('open', false);
            }
        }
    }]);

    return YBoard;
}();

exports.default = new YBoard();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YQuery = function () {
    function YQuery() {
        _classCallCheck(this, YQuery);

        this.ajaxOptions = {
            'method': 'GET',
            'url': '',
            'data': null,
            'timeout': 30000,
            'loadFunction': null,
            'timeoutFunction': null,
            'errorFunction': null,
            'loadendFunction': null,
            'cache': false,
            'contentType': null,
            'xhr': null
        };
        this.ajaxHeaders = {
            'X-Requested-With': 'XMLHttpRequest'
        };
    }

    _createClass(YQuery, [{
        key: 'on',
        value: function on(eventName, target, fn) {
            document.addEventListener(eventName, function (event) {
                if (!target || event.target.matches(target)) {
                    fn(event);
                }
            });

            return this;
        }
    }, {
        key: 'toggle',
        value: function toggle(element) {
            if (window.getComputedStyle(element).display === 'block') {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }
        }

        // AJAX

    }, {
        key: 'ajaxSetup',
        value: function ajaxSetup(options) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this.ajaxOptions = Object.assign(this.ajaxOptions, options);
            this.ajaxHeaders = Object.assign(this.ajaxHeaders, headers);
        }
    }, {
        key: 'get',
        value: function get(url) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            options = Object.assign({
                'url': url
            }, options);

            headers = Object.assign(this.ajaxHeaders, headers);

            return this.ajax(options, headers);
        }
    }, {
        key: 'post',
        value: function post(url, data) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            options = Object.assign({
                'method': 'POST',
                'url': url,
                'data': data,
                'contentType': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, options);

            if (options.contentType !== null) {
                headers = Object.assign(headers, {
                    'Content-Type': options.contentType
                });
            }

            headers = Object.assign(this.ajaxHeaders, headers);

            return this.ajax(options, headers);
        }
    }, {
        key: 'ajax',
        value: function ajax() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            options = Object.assign(this.ajaxOptions, options);

            if (!options.cache) {
                headers = Object.assign(headers, {
                    'Cache-Control': 'no-cache, max-age=0'
                });
            }

            var xhr = new XMLHttpRequest();
            xhr.timeout = options.timeout;
            xhr.open(options.method, options.url);

            for (var key in headers) {
                if (!headers.hasOwnProperty(key)) {
                    continue;
                }

                xhr.setRequestHeader(key, headers[key]);
            }

            // OnLoad
            this.onLoad = function (fn) {
                xhr.addEventListener('load', function () {
                    if (xhr.status !== 200) {
                        return;
                    }

                    fn(xhr);
                });

                return this;
            };
            if (typeof options.loadFunction === 'function') {
                this.onLoad(options.loadFunction);
            }

            // OnTimeout
            this.onTimeout = function (fn) {
                xhr.addEventListener('timeout', function () {
                    fn(xhr);
                });

                return this;
            };
            if (typeof options.timeoutFunction === 'function') {
                this.onTimeout(options.timeoutFunction);
            }

            // OnError
            this.onError = function (fn) {
                xhr.addEventListener('loadend', function () {
                    if (xhr.status === 200 || xhr.status === 0) {
                        return;
                    }
                    fn(xhr);
                });

                return this;
            };
            if (typeof options.errorFunction === 'function') {
                this.onError(options.errorFunction);
            }

            // Run always
            this.onEnd = function (fn) {
                xhr.addEventListener('loadend', function () {
                    fn(xhr);
                });

                return this;
            };
            if (typeof options.loadendFunction === 'function') {
                this.onEnd(options.loadendFunction);
            }

            this.getXhrObject = function () {
                return xhr;
            };

            // Customizable XHR-object
            if (typeof options.xhr === 'function') {
                xhr = options.xhr(xhr);
            }

            window.fd = options.data;
            xhr.send(options.data);

            return this;
        }
    }]);

    return YQuery;
}();

exports.default = new YQuery();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof NodeList.prototype.remove !== 'function') {
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    };
}

if (typeof NodeList.prototype.forEach !== 'function') {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

if (typeof Element.prototype.matches !== 'function') {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
        var element = this;
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        var index = 0;

        while (elements[index] && elements[index] !== element) {
            ++index;
        }

        return Boolean(elements[index]);
    };
}

if (typeof Element.prototype.closest !== 'function') {
    Element.prototype.closest = function closest(selector) {
        var element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// These might not be a good idea. I'm just lazy.
// Hopefully they will not completely break down if some browser implements these functions.

Element.prototype.setAttributes = function (attributes) {
    for (var key in attributes) {
        if (!attributes.hasOwnProperty(key)) {
            return true;
        }

        this.setAttribute(key, attributes[key]);
    }
};

Element.prototype.appendBefore = function (elm) {
    elm.parentNode.insertBefore(this, elm);
};

Element.prototype.appendAfter = function (elm) {
    elm.parentNode.insertBefore(this, elm.nextSibling);
};

Element.prototype.toggle = function () {
    if (window.getComputedStyle(this).display !== 'none') {
        this.hide();
    } else {
        this.show();
    }
};

Element.prototype.hide = function () {
    this.style.display = 'none';
};

Element.prototype.show = function () {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';

    this.style.display = style;
};

Element.prototype.insertAtCaret = function (before) {
    var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (document.selection) {
        // IE
        var selection = document.selection.createRange();
        selection.text = before + selection.text + after;
        this.focus();
    } else if (this.selectionStart || this.selectionStart === 0) {
        // FF & Chrome
        var selectedText = this.value.substr(this.selectionStart, this.selectionEnd - this.selectionStart);
        var startPos = this.selectionStart;
        var endPos = this.selectionEnd;
        this.value = this.value.substr(0, startPos) + before + selectedText + after + this.value.substr(endPos, this.value.length);

        // Move selection to end of "before" -tag
        this.selectionStart = startPos + before.length;
        this.selectionEnd = startPos + before.length;

        this.focus();
    } else {
        // Nothing selected/not supported, append
        this.value += before + after;
        this.focus();
    }
};

NodeList.prototype.toggle = function () {
    this.forEach(function (elm) {
        elm.toggle();
    });
};

NodeList.prototype.hide = function () {
    this.forEach(function (elm) {
        elm.hide();
    });
};

NodeList.prototype.show = function () {
    this.forEach(function (elm) {
        elm.show();
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_YQuery2.default.ajaxSetup({
    // AJAX options
    'timeout': 10000,
    'errorFunction': function errorFunction(xhr) {
        var errorMessage = xhr.responseText;
        var errorTitle = messages.errorOccurred;
        if (xhr.responseText.length === 0 && xhr.readyState === 0 && xhr.status === 0) {
            errorMessage = messages.networkError;
        } else {
            if (xhr.responseText === 'timeout') {
                errorMessage = messages.timeoutWarning;
            } else {
                try {
                    var text = JSON.parse(xhr.responseText);
                    errorMessage = text.message;
                    if (typeof text.title !== 'undefined' && text.title !== null && text.title.length !== 0) {
                        errorTitle = text.title;
                    }
                } catch (e) {
                    errorMessage = xhr.responseText;
                }
            }
        }

        if (xhr.status === 418) {
            _YBoard2.default.Toast.error(errorMessage);
        } else {
            _YBoard2.default.Toast.error(errorMessage, errorTitle);
        }
    },
    'timeoutFunction': function timeoutFunction(xhr) {
        _YBoard2.default.Toast.error(messages.timeoutWarning);
    }
}, {
    // Headers
    'X-CSRF-Token': typeof csrfToken !== 'undefined' ? csrfToken : null
});

window.YBoard = _YBoard2.default;
window.YQuery = _YQuery2.default;

// Localize dates, numbers and currencies
document.querySelectorAll('.datetime').forEach(function (elm) {
    this.innerHTML = new Date(this.innerHTML.replace(' ', 'T') + 'Z').toLocaleString();
});
document.querySelectorAll('.number').forEach(function (elm) {
    this.innerHTML = parseFloat(this.innerHTML).toLocaleString();
});
document.querySelectorAll('.currency').forEach(function (elm) {
    this.innerHTML = parseFloat(this.innerHTML).toLocaleString('', {
        'style': 'currency',
        'currency': 'eur'
    });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// reCAPTCHA

var Captcha = function () {
    function Captcha() {
        _classCallCheck(this, Captcha);
    }

    _createClass(Captcha, [{
        key: 'render',
        value: function render(elm) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!this.isEnabled() || typeof grecaptcha === 'undefined' || !document.getElementById(elm)) {
                // Captcha not enabled, grecaptcha -library not loaded or captcha element not found
                return false;
            }

            if (!!document.getElementById(elm).innerHTML) {
                // If the captcha is already rendered
                return true;
            }

            options = Object.assign({ 'sitekey': config.reCaptchaPublicKey }, options);
            grecaptcha.render(elm, options);

            return true;
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (!this.isEnabled() || typeof grecaptcha === 'undefined') {
                // Captcha not enabled or grecaptcha -library not loaded
                return false;
            }

            grecaptcha.reset();

            return true;
        }
    }, {
        key: 'isEnabled',
        value: function isEnabled() {
            return typeof config.reCaptchaPublicKey !== 'undefined';
        }
    }]);

    return Captcha;
}();

exports.default = Captcha;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Catalog = function () {
    function Catalog() {
        _classCallCheck(this, Catalog);

        var searchInput = document.getElementById('search-catalog');
        if (searchInput) {
            searchInput.addEventListener('keyup', this.search);
        }
    }

    _createClass(Catalog, [{
        key: 'search',
        value: function search(elm) {
            var word = elm.getAttribute('value');
            console.log(word);
            var threads = document.querySelectorAll('.thread-box');
            if (word.length === 0) {
                threads.show();
            } else {
                threads.hide();
                threads.forEach(function (elm) {
                    if (elm.find('h3').innerHTML.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                        elm.show();
                        return true;
                    }
                    if (elm.find('.post').innerHTML.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                        elm.show();
                        return true;
                    }
                });
            }
        }
    }]);

    return Catalog;
}();

exports.default = Catalog;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
    function Modal() {
        _classCallCheck(this, Modal);
    }

    _createClass(Modal, [{
        key: 'open',
        value: function open(url, options) {
            this.$body = $('body');
            this.$blocker = null;

            // Default options
            this.options = $.extend({
                closeExisting: true,
                postData: {},
                onAjaxComplete: function onAjaxComplete() {}
            }, options);

            // Close any open modals.
            if (this.options.closeExisting) {
                $('.modal-container').remove();
            }

            // Open blocker
            this.$body.css('overflow', 'hidden');
            $('.modal-container.current').removeClass('current');
            this.$blocker = $('<div class="modal-container current"></div>').appendTo(this.$body);

            // Bind close event
            $(document).off('keydown.modal').on('keydown.modal', function (e) {
                if (e.which == 27) {
                    this.close();
                }
            });
            this.$blocker.click(function (e) {
                if (e.target == this) {
                    this.close();
                }
            });

            this.$container = $('<div class="modal"><button class="modal-close"><span class="icon-cross2"></span></button></div>');
            this.$blocker.append(this.$container);
            this.$elm = $('<div class="modal-content"></div>');
            this.$container.append(this.$elm);
            this.$elm.html('<div class="modal-loading">' + YB.spinnerHtml() + '</div>');

            var current = this.$elm;
            $.ajax({
                url: url,
                type: 'POST',
                data: options.postData
            }).done(function (html) {
                current.html(html);
            }).fail(function () {
                YB.modal.close();
            });
        }
    }, {
        key: 'close',
        value: function close() {
            $('.modal-container:last').remove();
            $('.modal-container:last').addClass('current');

            if ($('.modal-container').length == 0) {
                $('body').css('overflow', '');
            }
        }
    }, {
        key: 'closeAll',
        value: function closeAll() {
            $('.modal-container').remove();
            $('body').css('overflow', '');
        }
    }]);

    return Modal;
}();

exports.default = Modal;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

var _File = __webpack_require__(10);

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Post = function () {
    function Post() {
        _classCallCheck(this, Post);

        this.file = new _File2.default();

        // Remove highlighted posts when the location hash is changed
        document.addEventListener('hashchange', function () {
            this.removeHighlights();
        });
    }

    _createClass(Post, [{
        key: 'getElm',
        value: function getElm(id) {
            return document.getElementById('post-' + id);
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            if (!confirm(messages.confirmDeletePost)) {
                return false;
            }

            var that = this;
            _YQuery2.default.post('/scripts/posts/delete', { 'postId': id }, {
                'loadFunction': function loadFunction() {
                    that.getElm(id).remove();
                    if ($('body').hasClass('thread-page')) {
                        if (YB.thread.getElm(id).is('*')) {
                            // We're in the thread we just deleted
                            YB.returnToBoard();
                        }
                    } else {
                        // The deleted post is not the current thread
                        _YBoard2.default.thread.getElm(id).remove();
                        _YBoard2.default.Toast.success(messages.postDeleted);
                    }
                }
            });
        }
    }, {
        key: 'highlight',
        value: function highlight(id) {
            this.getElm(id).classList.add('highlighted');
        }
    }, {
        key: 'removeHighlights',
        value: function removeHighlights() {
            document.getElementsByClassName('highlighted').forEach(function (elm) {
                elm.classList.remove('highlighted');
            });
        }
    }]);

    return Post;
}();

exports.default = Post;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostForm = function () {
    function PostForm() {
        _classCallCheck(this, PostForm);

        var that = this;
        this.elm = document.getElementById('post-form');
        this.locationParent = this.elm.parentNode;
        this.location = this.elm.nextElementSibling;
        this.msgElm = this.elm.querySelector('#post-message');
        this.fileUploadInProgress = false;
        this.fileUploadXhr = null;
        this.submitAfterFileUpload = false;
        this.submitInProgress = false;
        this.origDestName = false;
        this.origDestValue = false;

        // BBCode buttons
        this.elm.querySelectorAll('.bb-code').forEach(function (elm) {
            elm.addEventListener('click', function (e) {
                that.insertBbCode(e.target.dataset.code);
            });
        });
        this.elm.querySelector('.bb-color-bar').addEventListener('click', function () {
            that.toggleBbColorBar();
        });

        // Confirm page exit when there's text in the post form
        document.addEventListener('beforeunload', function (e) {
            if (!that.submitInProgress && that.msgElm.offsetParent !== null && that.msgElm.value.length !== 0) {
                return messages.confirmUnload;
            } else {
                e = null;
            }
        });

        // Reply to a post
        document.querySelectorAll('.add-post-reply').forEach(function (elm) {
            elm.addEventListener('click', function (e) {
                e.preventDefault();
                that.postReply(e.target.closest('.post').dataset.id);
                that.msgElm.focus();
            });
        });

        // Create thread
        document.querySelectorAll('.create-thread').forEach(function (elm) {
            elm.addEventListener('click', function () {
                that.show();
            });
        });

        // Reply to a thread
        document.querySelectorAll('.add-reply').forEach(function (elm) {
            elm.addEventListener('click', function (e) {
                that.threadReply(e.target.closest('.thread').dataset.id);
                that.msgElm.focus();
            });
        });

        // Cancel post
        this.elm.querySelector('#reset-button').addEventListener('click', function (e) {
            e.preventDefault();
            that.reset();
        });

        // Upload file after change
        this.elm.querySelector('#post-files').addEventListener('change', function () {
            that.uploadFile();
        });

        // Remove file -button
        this.elm.querySelector('#remove-file').addEventListener('click', function () {
            that.removeFile();
        });

        // Toggle post options
        this.elm.querySelector('.toggle-options').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('post-options').toggle();
        });

        // Submit a post
        this.elm.addEventListener('submit', function (e) {
            that.submit(e);
        });
    }

    _createClass(PostForm, [{
        key: 'show',
        value: function show(isReply) {
            if (!isReply) {
                // Reset if we click the "Create thread" -button
                this.reset();
            }

            this.elm.classList.add('visible');
            if (this.msgElm.offsetParent !== null) {
                this.msgElm.focus();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.elm.classList.remove('visible');
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.elm.reset();
            if (this.location !== null) {
                this.locationParent.insertBefore(this.elm, this.location);
            } else {
                this.locationParent.appendChild(this.elm);
            }

            this.removeFile();
            this.resetDestination();
            this.hide();
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.msgElm.focus();
        }
    }, {
        key: 'setDestination',
        value: function setDestination(isReply, destination) {
            this.saveDestination();
            var name = 'board';

            if (isReply) {
                name = 'thread';
            }

            var postDestination = this.elm.querySelector('#post-destination');
            postDestination.setAttribute('name', name);
            postDestination.value = destination;
        }
    }, {
        key: 'saveDestination',
        value: function saveDestination() {
            var destElm = this.elm.querySelector('#post-destination');
            var boardSelector = this.elm.querySelector('#label-board');

            // Hide board selector
            if (boardSelector !== null) {
                boardSelector.hide();
                boardSelector.querySelector('select').required = false;
                return true;
            }

            if (this.origDestName) {
                return true;
            }

            this.origDestName = destElm.getAttribute('name');
            this.origDestValue = destElm.value;

            return true;
        }
    }, {
        key: 'resetDestination',
        value: function resetDestination() {
            var destElm = this.elm.querySelector('#post-destination');
            var boardSelector = this.elm.querySelector('#label-board');

            // Restore board selector
            if (boardSelector !== null) {
                boardSelector.show();
                boardSelector.querySelector('select').required = true;
            }

            if (!this.origDestName) {
                return true;
            }

            destElm.setAttribute('name', this.origDestName);
            destElm.value = this.origDestValue;

            this.origDestName = false;
            this.origDestValue = false;

            return true;
        }
    }, {
        key: 'insertBbCode',
        value: function insertBbCode(code) {
            this.msgElm.insertAtCaret('[' + code + ']', '[/' + code + ']');
        }
    }, {
        key: 'toggleBbColorBar',
        value: function toggleBbColorBar() {
            this.elm.querySelector('#color-buttons').toggle();
            this.msgElm.focus();
        }
    }, {
        key: 'uploadFile',
        value: function uploadFile() {
            var fileInput = this.elm.querySelector('#post-files');
            var fileNameElm = this.elm.querySelector('#file-name');

            fileNameElm.value = '';
            this.submitAfterFileUpload = false;

            // Abort any ongoing uploads
            if (this.fileUploadXhr !== null) {
                this.fileUploadXhr.abort();
            }

            this.updateFileProgressBar(1);

            // Calculate upload size and check it does not exceed the set maximum
            var maxSize = fileInput.dataset.maxsize;
            var fileList = fileInput.files;
            var fileSizeSum = 0;
            for (var i = 0, file; file = fileList[i]; i++) {
                fileSizeSum += file.size;
            }

            if (fileSizeSum > maxSize) {
                _YBoard2.default.Toast.warning(messages.maxSizeExceeded);
                this.updateFileProgressBar(0);
                return false;
            }

            var fd = new FormData();
            Array.from(fileList).forEach(function (file) {
                fd.append('file', file);
            });

            this.fileUploadInProgress = true;

            var fileName = fileInput.value.split('\\').pop().split('.');
            fileName.pop();
            fileNameElm.value = fileName.join('.');

            var that = this;
            var fileUpload = YQuery.post('/api/files/upload', fd, {
                contentType: null,
                xhr: function xhr(_xhr) {
                    if (!_xhr.upload) {
                        return _xhr;
                    }
                    _xhr.upload.addEventListener('progress', function (evt) {
                        console.log(evt);
                        if (evt.lengthComputable) {
                            var percent = Math.round(evt.loaded / evt.total * 100);
                            if (percent < 1) {
                                percent = 1;
                            } else {
                                if (percent > 95) {
                                    percent = 95;
                                }
                            }
                            that.updateFileProgressBar(percent);
                        }
                    }, false);

                    return _xhr;
                }
            }).onEnd(function () {
                that.fileUploadInProgress = false;
            }).onLoad(function (data) {
                that.updateFileProgressBar(100);
                data = JSON.parse(data);
                if (data.message.length !== 0) {
                    that.elm.querySelector('#file-id').value = data.message;

                    if (that.submitAfterFileUpload) {
                        this.submit();
                    }
                } else {
                    _YBoard2.default.Toast.error(messages.errorOccurred);
                    that.updateFileProgressBar(0);
                }
            }).onError(function () {
                that.updateFileProgressBar(0);
            });

            this.fileUploadXhr = fileUpload.getXhrObject();
        }
    }, {
        key: 'removeFile',
        value: function removeFile() {
            this.elm.querySelector('#post-files').value = '';
            this.elm.querySelector('#file-id').value = '';
            this.elm.querySelector('#file-name').value = '';
            this.updateFileProgressBar(0);
            this.submitAfterFileUpload = false;

            if (this.fileUploadXhr !== null) {
                this.fileUploadXhr.abort();
            }
        }
    }, {
        key: 'updateFileProgressBar',
        value: function updateFileProgressBar(progress) {
            if (progress < 0) {
                progress = 0;
            } else {
                if (progress > 100) {
                    progress = 100;
                }
            }

            var bar = this.elm.querySelector('.file-progress div');
            if (progress === 0) {
                bar.style.width = 0;
                bar.classList.remove('in-progress');
            } else {
                bar.style.width = progress + '%';
                bar.classList.add('in-progress');
            }
        }
    }, {
        key: 'threadReply',
        value: function threadReply(threadId) {
            this.elm.appendTo(YB.thread.getElm(threadId).find('.thread-content'));
            this.show(true);

            this.setDestination(true, threadId);

            this.msgElm.focus();
        }
    }, {
        key: 'postReply',
        value: function postReply(postId) {
            var selectedText = _YBoard2.default.getSelectionText();

            this.elm.appendChild(_YBoard2.default.Post.getElm(postId));
            this.show(true);

            this.setDestination(true, this.elm.closest('.thread').data('id'));

            this.msgElm.focus();
            var append = '';
            if (this.msgElm.val().substr(-1) == '\n') {
                append += '\n';
            } else {
                if (this.msgElm.val().length != 0) {
                    append += '\n\n';
                }
            }
            append += '>>' + postId + '\n';

            // If any text on the page was selected, add it to post form with quotes
            if (selectedText != '') {
                append += '>' + selectedText.replace(/(\r\n|\n|\r)/g, '$1>') + '\n';
            }

            this.msgElm.val(this.msgElm.val().trim() + append);
        }
    }, {
        key: 'submit',
        value: function submit(e) {
            if (typeof e !== 'undefined') {
                e.preventDefault();
            }

            var submitButton = this.elm.querySelector('input[type="submit"].button');

            // File upload in progress -> wait until done
            if (this.fileUploadInProgress) {
                submitButton.setAttribute('disabled', true);
                this.submitAfterFileUpload = true;
                return false;
            }

            // Prevent duplicate submissions by double clicking etc.
            if (this.submitInProgress) {
                return false;
            }
            this.submitInProgress = true;

            this.elm.querySelector('#post-files').value = '';

            var fd = new FormData(this.elm);

            var that = this;
            YQuery.post(this.elm.getAttribute('action'), fd).done(function (data) {
                var dest = $('#post-destination');
                var thread;
                if (dest.setAttribute('name') != 'thread') {
                    thread = null;
                } else {
                    thread = dest.val();
                }

                if (thread != null) {
                    toastr.success(messages.postSent);
                    YB.thread.ajaxUpdate.runOnce(thread);
                } else {
                    if (data.length == 0) {
                        YB.pageReload();
                    } else {
                        data = JSON.parse(data);
                        if (typeof data.message == 'undefined') {
                            toastr.error(messages.errorOccurred);
                        } else {
                            window.location = '/' + that.elm.find('[name="board"]').val() + '/' + data.message;
                        }
                    }
                }

                // Reset post form
                that.reset();
            }).always(function () {
                submitButton.removeAttribute('disabled');
                that.submitInProgress = false;

                YB.captcha.reset();
            });
        }
    }]);

    return PostForm;
}();

exports.default = PostForm;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
    function File() {
        _classCallCheck(this, File);

        // Video volume change
        document.addEventListener('volumechange', function () {
            localStorage.setItem('videoVolume', this.volume);
        });
    }

    _createClass(File, [{
        key: 'delete',
        value: function _delete(id) {
            if (!confirm(messages.confirmDeleteFile)) {
                return false;
            }

            _YQuery2.default.post('/scripts/posts/deletefile', {
                'post_id': id,
                'loadFunction': function loadFunction() {
                    this.getElm(id).find('figure').remove();
                    _YBoard2.default.Toast.success(messages.fileDeleted);
                }
            });
        }
    }, {
        key: 'expand',
        value: function expand(elm) {
            var img = $(elm).find('img');
            elm.parent('.message').addClass('full');

            img.data('orig-src', img.attr('src'));
            this.changeSrc(img, elm.find('figcaption a').attr('href'));
            elm.removeClass('thumbnail');
        }
    }, {
        key: 'restoreThumbnail',
        value: function restoreThumbnail(elm) {
            var img = $(elm).find('img');

            this.changeSrc(img, img.data('orig-src'));
            elm.addClass('thumbnail');

            // Scroll to top of image
            var elmTop = elm.offset().top;
            if ($(document).scrollTop() > elmTop) {
                $(document).scrollTop(elmTop);
            }
        }
    }, {
        key: 'changeSrc',
        value: function changeSrc(img, src) {
            img.data('expanding', 'true');
            var loading = setTimeout(function () {
                img.after('<div class="overlay center">' + YB.spinnerHtml() + '</div>');
            }, 200);
            img.attr('src', src).on('load', function () {
                img.removeData('expanding');
                clearTimeout(loading);
                img.next('div.overlay').remove();
            });
        }
    }, {
        key: 'playMedia',
        value: function playMedia(elm) {
            this.stopAllMedia();

            var post = elm.parent('.message');
            var img = elm.find('img');

            var fileId = elm.data('id');

            if (typeof elm.data('loading') != 'undefined') {
                return false;
            }

            elm.data('loading', 'true');

            var loading = setTimeout(function () {
                img.after('<div class="overlay bottom left">' + YB.spinnerHtml() + '</div>');
            }, 200);

            $.post('/scripts/files/getmediaplayer', { 'fileId': fileId }).done(function (data) {
                elm.removeClass('thumbnail').addClass('media-player-container');
                post.addClass('full');
                elm.prepend(data);

                var volume = localStorage.getItem('videoVolume');
                if (volume !== null) {
                    elm.find('video').prop('volume', volume);
                }
            }).always(function () {
                clearTimeout(loading);
                elm.find('div.overlay').remove();
                elm.removeData('loading');
            });
        }
    }, {
        key: 'stopAllMedia',
        value: function stopAllMedia() {
            $('.media-player-container').each(function () {
                var self = $(this);
                var mediaPlayer = self.find('.media-player');

                mediaPlayer.find('video').trigger('pause');
                mediaPlayer.remove();

                self.removeClass('media-player-container').addClass('thumbnail');
            });
        }
    }]);

    return File;
}();

exports.default = File;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
    function Theme() {
        _classCallCheck(this, Theme);
    }

    _createClass(Theme, [{
        key: 'toggleSidebar',
        value: function toggleSidebar() {
            if (document.getElementById('hide-sidebar') !== null) {
                document.getElementById('hide-sidebar').remove();
                document.getElementById('sidebar').classList.remove('visible');

                _YQuery2.default.post('/api/user/preferences/sidebar', {
                    'sidebarHidden': 'false'
                });
            } else {
                var hideSidebarCss = document.createElement('link');
                hideSidebarCss.setAttribute('rel', 'stylesheet');
                hideSidebarCss.setAttribute('id', 'hide-sidebar');
                hideSidebarCss.setAttribute('href', config.staticUrl + '/css/hide_sidebar.css');
                document.querySelector('head').appendChild(hideSidebarCss);

                _YQuery2.default.post('/api/user/preferences/set', {
                    'sidebarHidden': 'true'
                });
            }
        }
    }, {
        key: 'switchVariation',
        value: function switchVariation() {
            var css = document.querySelectorAll('head .css');
            css = css[css.length - 1];

            var current = css.getAttribute('href');
            var variation = css.dataset.alt;

            var newCss = document.createElement('link');
            newCss.setAttributes({
                'rel': 'stylesheet',
                'class': 'css',
                'href': variation,
                'data-alt': current
            });
            newCss.appendAfter(css);

            var timeout = setTimeout(function () {
                css.remove();
            }, 5000);

            _YQuery2.default.post('/api/user/preferences/set', {
                'themeVariation': 'true',
                'errorFunction': function errorFunction() {
                    clearTimeout(timeout);
                    _YBoard2.default.Toast.error(messages.errorOccurred);
                }
            });
        }
    }]);

    return Theme;
}();

exports.default = Theme;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AutoUpdate = __webpack_require__(13);

var _AutoUpdate2 = _interopRequireDefault(_AutoUpdate);

var _Hide = __webpack_require__(15);

var _Hide2 = _interopRequireDefault(_Hide);

var _Follow = __webpack_require__(14);

var _Follow2 = _interopRequireDefault(_Follow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thread = function () {
    function Thread() {
        _classCallCheck(this, Thread);

        this.AutoUpdate = new _AutoUpdate2.default();
        this.Hide = new _Hide2.default();
        this.Follow = new _Follow2.default();
    }

    _createClass(Thread, [{
        key: 'getElm',
        value: function getElm(id) {
            return $('#thread-' + id);
        }
    }, {
        key: 'toggleLock',
        value: function toggleLock(id) {
            if (this.getElm(id).find('h3 a .icon-lock').length == 0) {
                $.post('/scripts/threads/lock', { 'threadId': id }).done(function () {
                    YB.thread.getElm(id).find('h3 a').prepend('<span class="icon-lock icon"></span>');
                    toastr.success(messages.threadLocked);
                });
            } else {
                $.post('/scripts/threads/unlock', { 'threadId': id }).done(function () {
                    YB.thread.getElm(id).find('h3 a .icon-lock').remove();
                    toastr.success(messages.threadUnlocked);
                });
            }
        }
    }, {
        key: 'toggleSticky',
        value: function toggleSticky(id) {
            if (this.getElm(id).find('h3 a .icon-lock').length == 0) {
                $.post('/scripts/threads/stick', { 'threadId': id }).done(function () {
                    YB.thread.getElm(id).find('h3 a').prepend('<span class="icon-pushpin icon"></span>');
                    toastr.success(messages.threadStickied);
                });
            } else {
                $.post('/scripts/threads/unstick', { 'threadId': id }).done(function () {
                    YB.thread.getElm(id).find('h3 a .icon-pushpin').remove();
                    toastr.success(messages.threadUnstickied);
                });
            }
        }
    }, {
        key: 'expand',
        value: function expand(threadId) {
            // Thread inline expansion
            var thread = this.getElm(threadId);
            if (!thread.hasClass('expanded')) {
                // Expand
                thread.addClass('expanded', true);

                var fromId = thread.find('.reply:first').attr('id').replace('post-', '');

                $.post('/scripts/threads/getreplies', {
                    'threadId': threadId,
                    'fromId': fromId
                }).done(function (data) {
                    // Update timestamps
                    data = $(data);
                    data.find('.datetime').localizeTimestamp(this);

                    thread.find('.more-replies-container').html(data);
                });
            } else {
                // Contract
                thread.removeClass('expanded').find('.more-replies-container').html('');
            }
        }
    }]);

    return Thread;
}();

exports.default = Thread;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoUpdate = function () {
    function AutoUpdate() {
        _classCallCheck(this, AutoUpdate);

        this.threadId = false;
        this.nextLoadDelay = 2000;
        this.newReplies = 0;
        this.lastUpdateNewReplies = 0;
        this.runCount = 0;
        this.nowLoading = false;
        this.isActive = false;
        this.nextRunTimeout = 0;
        this.startDelayTimeout = 0;
        this.originalDocTitle = document.title;
    }

    _createClass(AutoUpdate, [{
        key: 'run',
        value: function run(manual) {
            if (this.nowLoading) {
                return false;
            }

            this.nextLoadDelay = this.nextLoadDelay * (this.runCount == 0 ? 1 : this.runCount);
            if (this.nextLoadDelay > 30000) {
                this.nextLoadDelay = 30000;
            }

            // Limit
            if (this.runCount > 40) {
                this.stop();
            }

            if (manual) {
                this.runCount = 0;
                if (this.isActive) {
                    this.restart();
                }
            }

            var thread = YB.thread.getElm(this.threadId);
            var fromId = thread.find('.reply:last').attr('id');
            if (typeof fromId === 'undefined') {
                fromId = 0;
            } else {
                fromId = fromId.replace('post-', '');
            }

            this.nowLoading = true;
            var that = this;
            YQuery.post('/scripts/threads/getreplies', {
                'threadId': this.threadId,
                'fromId': fromId,
                'newest': true
            }).onLoad(function (data) {
                if (manual && data.length == 0) {
                    YBoard.Toast.info(messages.noNewReplies);
                }
                // Update timestamps
                data = $(data);
                data.find('.datetime').localizeTimestamp(this);

                that.lastUpdateNewReplies = data.find('.message').length;
                that.newReplies += that.lastUpdateNewReplies;

                if (that.lastUpdateNewReplies == 0) {
                    ++that.runCount;
                } else {
                    that.runCount = 0;
                }

                data.appendTo(thread.find('.replies'));

                // Run again
                if (!manual) {
                    that.nextRunTimeout = setTimeout(function () {
                        that.start();
                    }, that.nextLoadDelay);
                }
            }).onError(function () {
                that.stop();
            }).onEnd(function () {
                that.nowLoading = false;

                // Notify about new posts on title
                if (!document.hasFocus() && that.newReplies > 0 && $('body').hasClass('thread-page')) {
                    document.title = '(' + that.newReplies + ') ' + that.originalDocTitle;
                    var replies = $('.replies');
                    replies.find('hr').remove();
                    replies.find('.reply:eq(-' + that.newReplies + ')').before('<hr>');
                } else {
                    if (self.newReplies != 0) {
                        that.newReplies = 0;
                    }
                }
            });
        }
    }, {
        key: 'runOnce',
        value: function runOnce(thread) {
            this.threadId = thread;
            this.run(true);
        }
    }, {
        key: 'start',
        value: function start() {
            this.isActive = true;
            if (this.startDelayTimeout) {
                clearTimeout(this.startDelayTimeout);
            }

            var that = this;
            this.threadId = $('.thread:first').data('id');
            this.startDelayTimeout = setTimeout(function () {
                that.run(false);
            }, 1000);

            return true;
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isActive) {
                return true;
            }

            if (this.startDelayTimeout) {
                clearTimeout(this.startDelayTimeout);
            }
            this.isActive = false;

            this.reset();
            return true;
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.stop();
            this.start();
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.nowLoading = false;
            this.newReplies = 0;
            this.runCount = 0;
            if (document.title !== this.originalDocTitle) {
                document.title = this.originalDocTitle;
            }

            if (this.nextRunTimeout) {
                clearTimeout(this.nextRunTimeout);
            }
        }
    }]);

    return AutoUpdate;
}();

exports.default = AutoUpdate;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YQuery = __webpack_require__(1);

var _YQuery2 = _interopRequireDefault(_YQuery);

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Follow = function () {
    function Follow() {
        _classCallCheck(this, Follow);
    }

    _createClass(Follow, [{
        key: 'add',
        value: function add(id) {
            this.doAjax(id, '/api/thread/follow/add');
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            this.doAjax(id, '/api/thread/follow/remove');
        }
    }, {
        key: 'markAllRead',
        value: function markAllRead() {
            $('.icon-bookmark2 .unread-count').hide();
            $('h3 .notification-count').hide();
            $.post('/api/thread/follow/markallread').fail(function () {
                $('.icon-bookmark2 .unread-count').show();
                $('h3 .notification-count').show();
            });
        }
    }, {
        key: 'toggleButton',
        value: function toggleButton(id) {
            var button = _YBoard2.default.thread.getElm(id).find('.followbutton');

            if (button.hasClass('add')) {
                button.removeClass('icon-bookmark-add add').addClass('icon-bookmark-remove remove');
            } else {
                button.removeClass('icon-bookmark-remove remove').addClass('icon-bookmark-add add');
            }
        }
    }, {
        key: 'doAjax',
        value: function doAjax(id, url) {
            this.toggleButton(id);
            _YQuery2.default.post(url, { 'threadId': id }).fail(function () {
                _YBoard2.default.Thread.Follow.toggleButton(id);
            });
        }
    }]);

    return Follow;
}();

exports.default = Follow;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _YBoard = __webpack_require__(0);

var _YBoard2 = _interopRequireDefault(_YBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hide = function () {
    function Hide() {
        _classCallCheck(this, Hide);
    }

    _createClass(Hide, [{
        key: 'add',
        value: function add(id) {
            _YBoard2.default.Thread.getElm(id).hide();
            $.post('/scripts/threads/hide', { 'threadId': id }).onError(function () {
                _YBoard2.default.Thread.getElm(id).show();
            });
        }
    }, {
        key: 'remove',
        value: function remove(id) {
            _YBoard2.default.Thread.getElm(id).show();
            YQuery.post('/scripts/threads/restore', { 'threadId': id }).onError(function () {
                _YBoard2.default.Thread.getElm(id).hide();
            });
        }
    }]);

    return Hide;
}();

exports.default = Hide;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Toast = function () {
    function Toast() {
        _classCallCheck(this, Toast);
    }

    _createClass(Toast, [{
        key: 'success',
        value: function success(message) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this._show('success', message, title);
        }
    }, {
        key: 'info',
        value: function info(message) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this._show('info', message, title);
        }
    }, {
        key: 'warning',
        value: function warning(message) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this._show('warning', message, title);
        }
    }, {
        key: 'error',
        value: function error(message) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this._show('error', message, title);
        }
    }, {
        key: '_show',
        value: function _show(type, message, title) {
            alert(type + ': ' + title + "\n\n" + message);
        }
    }]);

    return Toast;
}();

exports.default = Toast;

/***/ })
/******/ ]);