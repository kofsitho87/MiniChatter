'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));
var gql = _interopDefault(require('graphql-tag'));
var apolloClient = require('apollo-client');
var apolloLinkHttp = require('apollo-link-http');
var apolloCacheInmemory = require('apollo-cache-inmemory');
var apolloLinkWs = require('apollo-link-ws');
var apolloLink = require('apollo-link');
var apolloUtilities = require('apollo-utilities');
var moment = _interopDefault(require('moment'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      default: null
    },
    maxHeight: {
      type: [Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      // data property for v-model binding with real textarea tag
      currentValue: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      inputHeight: 0
    };
  },
  computed: {
    computedStyles: function computedStyles() {
      if (!this.autosize) { return {}; }
      return {
        'min-height': this.inputHeight
      };
    }
  },
  watch: {
    currentValue: function currentValue(val) {
      this.$nextTick(this.resize); //this.$emit('input', val)
    },
    minHeight: function minHeight() {
      this.$nextTick(this.resize);
    },
    maxHeight: function maxHeight() {
      this.$nextTick(this.resize);
    },
    autosize: function autosize(val) {
      if (val) { this.resize(); }
    }
  },
  mounted: function mounted() {
    this.resize();
  },
  methods: {
    resize: function resize(e) {
      var contentHeight = this.$refs.shadow.scrollHeight;

      if (this.minHeight) {
        contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight;
      }

      if (this.maxHeight) {
        if (contentHeight > this.maxHeight) {
          contentHeight = this.maxHeight;
          this.maxHeightScroll = true;
        } else {
          this.maxHeightScroll = false;
        }
      }

      this.inputHeight = "".concat(contentHeight, "px");
      return this;
    },
    sendMessage: function sendMessage() {
      this.$emit("sendMessage", this.currentValue);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"textarea"},[_c('div',{staticClass:"flex"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],staticClass:"block w-full p-2 rounded-none border-t",style:(_vm.computedStyles),attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled},domProps:{"value":(_vm.currentValue)},on:{"focus":_vm.resize,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }if($event.ctrlKey||$event.shiftKey||$event.altKey||$event.metaKey){ return null; }return _vm.sendMessage($event)},"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value;}}}),_vm._v(" "),_c('div',{staticClass:"flex"},[_c('button',{staticClass:"bg-blue-700 px-2 text-white",attrs:{"type":"button"},on:{"click":_vm.sendMessage}},[_vm._v("Send")])])]),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentValue),expression:"currentValue"}],ref:"shadow",staticClass:"shadow",attrs:{"tabindex":"0"},domProps:{"value":(_vm.currentValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.currentValue=$event.target.value;}}})])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-6965cf19_0", { source: ".textarea[data-v-6965cf19]{position:relative}.textarea textarea[data-v-6965cf19]{position:relative;z-index:100;resize:none;overflow:auto;font-size:16px;height:0}.textarea textarea.shadow[data-v-6965cf19]{max-height:0;pointer-events:none;opacity:0;margin:0;padding:0;position:absolute;left:0;top:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-6965cf19";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

function _templateObject4() {
  var data = _taggedTemplateLiteral(["mutation ($channelId: ID!, $content: String!) {\n            sendMessage(channelId: $channelId, content: $content) {\n              id\n              content\n              owner {\n                id\n                userId\n                nickName\n              }\n              createdAt\n            }\n          }"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["subscription messageAdded($channelId: ID!) {\n        messageAdded(channelId: $channelId) {\n          id\n          content\n          owner {\n            id\n            userId\n            nickName\n          }\n        }\n      }"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["query ($channelId: ID!) {\n            messages(channelId: $channelId) {\n              id\n              owner {\n                id\n                nickName\n                userId\n              }\n              content\n              createdAt\n            }\n          }"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["mutation ($apiKey: String!, $userId: ID!, $nickName: String!) {\n            connect(apiKey: $apiKey, userId: $userId, nickName: $nickName) {\n              user {\n                id\n                userId\n                nickName\n                profileURL\n              }\n              token\n            }\n          }"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var script$1 = {
  name: 'VueMiniChatter',
  props: {
    apiKey: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true
    }
  },
  components: {
    TextareaAutosize: __vue_component__
  },
  data: function data() {
    return {
      messages: [],
      token: null,
      user: null,
      connected: false,
      value: null,
      wsLink: null
    };
  },
  filters: {
    dateFormat: function dateFormat(value) {
      if (!value) { return ''; }
      return moment(value).format("LT");
    }
  },
  created: function created() {
    var _this = this;

    var httpLink = apolloLinkHttp.createHttpLink({
      // You should use an absolute URL here
      uri: 'http://localhost:9000/graphql',
      fetch: fetch
    });
    var wsLink = new apolloLinkWs.WebSocketLink({
      uri: 'ws://localhost:9000/graphql',
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: function connectionParams() {
          return {
            authorization: _this.token
          };
        }
      }
    });
    this.wsLink = wsLink; // Cache implementation

    var cache = new apolloCacheInmemory.InMemoryCache();
    var link = apolloLink.split( // split based on operation type
    function (_ref) {
      var query = _ref.query;
      var definition = apolloUtilities.getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, wsLink, httpLink); // Create the apollo client

    this.apolloClient = new apolloClient.ApolloClient({
      link: link,
      cache: cache
    });
  },
  mounted: function mounted() {
    console.log("mini chatter mounted");
    this.connect();
  },
  methods: {
    nl2br: function nl2br(value) {
      return value.replace(/\n/g, "<br>");
    },
    connect: function connect() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$_this2$apolloC, connect;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this2.apolloClient.mutate({
                  mutation: gql(_templateObject()),
                  variables: {
                    apiKey: _this2.apiKey,
                    userId: _this2.userId,
                    nickName: _this2.nickName
                  }
                });

              case 3:
                _yield$_this2$apolloC = _context.sent;
                connect = _yield$_this2$apolloC.data.connect;
                _this2.connected = true;
                _this2.user = connect.user;
                _this2.token = connect.token;

                _this2.getMessages();

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);

                _this2.$toast.error(_context.t0.message, {
                  duration: 2000
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }))();
    },
    getMessages: function getMessages() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$_this3$apolloC, messages;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this3.apolloClient.query({
                  query: gql(_templateObject2()),
                  variables: {
                    channelId: _this3.channelId
                  },
                  context: {
                    headers: {
                      authorization: _this3.token
                    }
                  }
                });

              case 3:
                _yield$_this3$apolloC = _context2.sent;
                messages = _yield$_this3$apolloC.data.messages;
                _this3.messages = messages;

                _this3.startSubscriptionMessages();

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);

                _this3.$toast.error(_context2.t0.message, {
                  duration: 2000
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    startSubscriptionMessages: function startSubscriptionMessages() {
      var subQuery = gql(_templateObject3());
      var observer = this.apolloClient.subscribe({
        query: subQuery,
        variables: {
          channelId: this.channelId
        },
        context: {
          headers: {
            authorization: this.token
          }
        }
      });
      var self = this;
      observer.subscribe({
        next: function next(_ref2) {
          var messageAdded = _ref2.data.messageAdded;
          //console.log(messageAdded)
          self.messages = [].concat(_toConsumableArray(self.messages), [messageAdded]);
          console.log("scollToBottom");
          self.scollToBottom();
        },
        error: function error(e) {
          console.log(e);
          this.$toast.error(e.message, {
            duration: 2000
          });
        }
      });
    },
    sendMessage: function sendMessage(message) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _yield$_this4$apolloC, sendMessage;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (message) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                if (!(_this4.wsLink.subscriptionClient.status != 1)) {
                  _context3.next = 5;
                  break;
                }

                _this4.$toast.error("SOCKET NOT READY", {
                  duration: 2000
                });

                return _context3.abrupt("return");

              case 5:
                _context3.prev = 5;
                _context3.next = 8;
                return _this4.apolloClient.mutate({
                  mutation: gql(_templateObject4()),
                  variables: {
                    channelId: _this4.channelId,
                    content: message
                  },
                  context: {
                    headers: {
                      authorization: _this4.token
                    }
                  }
                });

              case 8:
                _yield$_this4$apolloC = _context3.sent;
                sendMessage = _yield$_this4$apolloC.data.sendMessage;
                _this4.$refs.input.currentValue = null;
                _context3.next = 16;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](5);

                _this4.$toast.error(_context3.t0.message, {
                  duration: 2000
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 13]]);
      }))();
    },
    scollToBottom: function scollToBottom() {
      var _this5 = this;

      this.$nextTick(function () {
        setTimeout(function () {
          console.log(_this5.$refs["messages"]);
          var scrollHeight = _this5.$refs["messages"].scrollHeight;

          _this5.$refs["messages"].scrollTo(0, scrollHeight); //window.scrollTo(0, scrollHeight)

        }, 100);
      });
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"flex flex-column"},[_c('div',{staticClass:"h-screen bg-red-200 flex-1 flex flex-column"},[_c('div',{ref:"messages",staticClass:"px-4 flex-1 overflow-scroll",attrs:{"id":"messages"}},_vm._l((_vm.messages),function(message){return _c('div',{key:message.id},[_c('div',{staticClass:"flex my-4 items-start",class:message.owner.id == _vm.user.id ? 'justify-end': 'justify-start'},[(message.owner.id != _vm.user.id)?_c('div',{staticClass:"mr-2"}):_vm._e(),_vm._v(" "),_c('div',[_c('div',{staticClass:"text-sm"},[_vm._v(" "+_vm._s(message.owner.nickName)+" ")]),_vm._v(" "),_c('div',{staticClass:"bg-red-400 p-2 rounded text-md",domProps:{"innerHTML":_vm._s(_vm.nl2br(message.content))}}),_vm._v(" "),_c('div',{staticClass:"text-xs"},[_vm._v("\n              "+_vm._s(_vm._f("dateFormat")(message.createdAt))+"\n            ")])])])])}),0),_vm._v(" "),_c('div',{attrs:{"id":"input_container"}},[_c('textarea-autosize',{ref:"input",attrs:{"placeholder":"Type something here...","min-height":50,"max-height":200,"disabled":false},on:{"sendMessage":_vm.sendMessage}})],1)])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//   install(Vue, args = {}) {
//     if (this.installed) {
//       return
//     }
//     this.installed = true
//     Vue.component('MiniChatter', MiniChatter)
//   }
// }

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('MiniChatter', __vue_component__$1);
}
var plugin = {
  install: install
}; // Auto-install when vue is found (eg. in browser via <script> tag)

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

exports.default = __vue_component__$1;
exports.install = install;
