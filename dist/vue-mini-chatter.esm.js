import fetch from 'node-fetch';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import moment from 'moment';

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

  data() {
    return {
      // data property for v-model binding with real textarea tag
      currentValue: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      inputHeight: 0
    };
  },

  computed: {
    computedStyles() {
      if (!this.autosize) return {};
      return {
        'min-height': this.inputHeight
      };
    }

  },
  watch: {
    currentValue(val) {
      this.$nextTick(this.resize); //this.$emit('input', val)
    },

    minHeight() {
      this.$nextTick(this.resize);
    },

    maxHeight() {
      this.$nextTick(this.resize);
    },

    autosize(val) {
      if (val) this.resize();
    }

  },

  mounted() {
    this.resize();
  },

  methods: {
    resize(e) {
      let contentHeight = this.$refs.shadow.scrollHeight;

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

      this.inputHeight = `${contentHeight}px`;
      return this;
    },

    sendMessage() {
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
    const options = typeof script === 'function' ? script.options : script;
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
    let hook;
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
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
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
                style.element.setAttribute('media', css.media);
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
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "textarea" }, [
    _c("div", { staticClass: "flex" }, [
      _c("textarea", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.currentValue,
            expression: "currentValue"
          }
        ],
        staticClass: "block w-full p-2 rounded-none border-t",
        style: _vm.computedStyles,
        attrs: { placeholder: _vm.placeholder, disabled: _vm.disabled },
        domProps: { value: _vm.currentValue },
        on: {
          focus: _vm.resize,
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            if (
              $event.ctrlKey ||
              $event.shiftKey ||
              $event.altKey ||
              $event.metaKey
            ) {
              return null
            }
            return _vm.sendMessage($event)
          },
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.currentValue = $event.target.value;
          }
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "flex" }, [
        _c(
          "button",
          {
            staticClass: "bg-blue-700 px-2 text-white",
            attrs: { type: "button" },
            on: { click: _vm.sendMessage }
          },
          [_vm._v("Send")]
        )
      ])
    ]),
    _vm._v(" "),
    _c("textarea", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.currentValue,
          expression: "currentValue"
        }
      ],
      ref: "shadow",
      staticClass: "shadow",
      attrs: { tabindex: "0" },
      domProps: { value: _vm.currentValue },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.currentValue = $event.target.value;
        }
      }
    })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-a7459d6a_0", { source: ".textarea[data-v-a7459d6a] {\n  position: relative;\n}\n.textarea textarea[data-v-a7459d6a] {\n  position: relative;\n  z-index: 100;\n  resize: none;\n  overflow: auto;\n  font-size: 16px;\n  height: 0;\n}\n.textarea textarea.shadow[data-v-a7459d6a] {\n  max-height: 0;\n  pointer-events: none;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n/*# sourceMappingURL=TextareaAutosize.vue.map */", map: {"version":3,"sources":["/Users/heewungsong/Desktop/WEB/MiniChatter/src/components/TextareaAutosize.vue","TextareaAutosize.vue"],"names":[],"mappings":"AAwGA;EACA,kBAAA;ACvGA;ADyGA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,cAAA;EACA,eAAA;EACA,SAAA;ACvGA;ADyGA;EACA,aAAA;EACA,oBAAA;EACA,UAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;ACvGA;;AAEA,+CAA+C","file":"TextareaAutosize.vue","sourcesContent":["<template>\n  <div class=\"textarea\">\n    <div class=\"flex\">\n      <textarea \n        :placeholder=\"placeholder\" \n        class=\"block w-full p-2 rounded-none border-t\"\n        :style=\"computedStyles\"\n        @focus=\"resize\"\n        v-model=\"currentValue\"\n        :disabled=\"disabled\"\n        @keyup.enter.exact=\"sendMessage($event)\"\n      ></textarea>\n      <div class=\"flex\">\n        <button class=\"bg-blue-700 px-2 text-white\" type=\"button\" @click=\"sendMessage\">Send</button>\n      </div>\n    </div>\n    <textarea class=\"shadow\" v-model=\"currentValue\" ref=\"shadow\" tabindex=\"0\"></textarea>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    placeholder: {\n      type: String,\n      default: \"\"\n    },\n    autosize: {\n      type: Boolean,\n      default: true\n    },\n    minHeight: {\n      type: [Number],\n      default: null\n    },\n    maxHeight: {\n      type: [Number],\n      default: null\n    },\n    disabled: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      // data property for v-model binding with real textarea tag\n      currentValue: null,\n      // works when content height becomes more then value of the maxHeight property\n      maxHeightScroll: false,\n      inputHeight: 0\n    }\n  },\n  computed: {\n    computedStyles () {\n      if (!this.autosize) return {}\n      return {\n        'min-height': this.inputHeight\n      }\n    },\n  },\n   watch: {\n    currentValue (val) {\n      this.$nextTick(this.resize)\n      //this.$emit('input', val)\n    },\n    minHeight () {\n      this.$nextTick(this.resize)\n    },\n    maxHeight () {\n      this.$nextTick(this.resize)\n    },\n    autosize (val) {\n      if (val) this.resize()\n    }\n  },\n  mounted(){\n    this.resize()\n  },\n  methods: {\n    resize(e){\n      let contentHeight = this.$refs.shadow.scrollHeight\n      if (this.minHeight) {\n        contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight\n      }\n      if (this.maxHeight) {\n        if (contentHeight > this.maxHeight) {\n          contentHeight = this.maxHeight\n          this.maxHeightScroll = true\n        } else {\n          this.maxHeightScroll = false\n        }\n      }\n      this.inputHeight = `${contentHeight}px`\n      return this\n    },\n    sendMessage(){\n      this.$emit(\"sendMessage\", this.currentValue)\n    }\n  }\n}\n</script>\n\n<style scoped lang=\"scss\">\n.textarea {\n  position: relative;\n\n  textarea {\n    position: relative;\n    z-index: 100;\n    resize: none;\n    overflow: auto;\n    font-size: 16px;\n    height: 0;\n\n    &.shadow {\n      max-height: 0;\n      pointer-events: none;\n      opacity: 0;\n      margin: 0;\n      padding:0;\n      position: absolute;\n      left: 0;\n      top:0;\n    }\n  }\n}\n</style>",".textarea {\n  position: relative;\n}\n.textarea textarea {\n  position: relative;\n  z-index: 100;\n  resize: none;\n  overflow: auto;\n  font-size: 16px;\n  height: 0;\n}\n.textarea textarea.shadow {\n  max-height: 0;\n  pointer-events: none;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n/*# sourceMappingURL=TextareaAutosize.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-a7459d6a";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

//
var script$1 = {
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

  data() {
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
    dateFormat(value) {
      if (!value) return '';
      return moment(value).format("LT");
    }

  },

  created() {
    const httpLink = createHttpLink({
      // You should use an absolute URL here
      uri: 'http://localhost:9000/graphql',
      fetch: fetch
    });
    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:9000/graphql',
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
          authorization: this.token
        })
      }
    });
    this.wsLink = wsLink; // Cache implementation

    const cache = new InMemoryCache();
    const link = split( // split based on operation type
    ({
      query
    }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    }, wsLink, httpLink); // Create the apollo client

    this.apolloClient = new ApolloClient({
      link: link,
      cache
    });
  },

  mounted() {
    console.log("mini chatter mounted");
    this.connect();
  },

  methods: {
    nl2br(value) {
      return value.replace(/\n/g, "<br>");
    },

    async connect() {
      // let a = await this.wsLink.subscriptionClient.connectionParams()
      // console.log(a)
      try {
        let {
          data: {
            connect
          }
        } = await this.apolloClient.mutate({
          mutation: gql`mutation ($apiKey: String!, $userId: ID!, $nickName: String!) {
            connect(apiKey: $apiKey, userId: $userId, nickName: $nickName) {
              user {
                id
                userId
                nickName
                profileURL
              }
              token
            }
          }`,
          variables: {
            apiKey: this.apiKey,
            userId: this.userId,
            nickName: this.nickName
          }
        });
        this.connected = true;
        this.user = connect.user;
        this.token = connect.token;
        this.getMessages();
      } catch (e) {
        this.$toast.error(e.message, {
          duration: 2000
        });
      }
    },

    async getMessages() {
      try {
        let {
          data: {
            messages
          }
        } = await this.apolloClient.query({
          query: gql`query ($channelId: ID!) {
            messages(channelId: $channelId) {
              id
              owner {
                id
                nickName
                userId
              }
              content
              createdAt
            }
          }`,
          variables: {
            channelId: this.channelId
          },
          context: {
            headers: {
              authorization: this.token
            }
          }
        });
        this.messages = messages;
        this.startSubscriptionMessages();
      } catch (e) {
        this.$toast.error(e.message, {
          duration: 2000
        });
      }
    },

    startSubscriptionMessages() {
      const subQuery = gql`subscription messageAdded($channelId: ID!) {
        messageAdded(channelId: $channelId) {
          id
          content
          owner {
            id
            userId
            nickName
          }
        }
      }`;
      const observer = this.apolloClient.subscribe({
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
        next({
          data: {
            messageAdded
          }
        }) {
          //console.log(messageAdded)
          self.messages = [...self.messages, messageAdded];
          console.log("scollToBottom");
          self.scollToBottom();
        },

        error(e) {
          console.log(e);
          this.$toast.error(e.message, {
            duration: 2000
          });
        }

      });
    },

    async sendMessage(message) {
      if (!message) {
        return;
      }

      if (this.wsLink.subscriptionClient.status != 1) {
        this.$toast.error("SOCKET NOT READY", {
          duration: 2000
        });
        return;
      }

      try {
        let {
          data: {
            sendMessage
          }
        } = await this.apolloClient.mutate({
          mutation: gql`mutation ($channelId: ID!, $content: String!) {
            sendMessage(channelId: $channelId, content: $content) {
              id
              content
              owner {
                id
                userId
                nickName
              }
              createdAt
            }
          }`,
          variables: {
            channelId: this.channelId,
            content: message
          },
          context: {
            headers: {
              authorization: this.token
            }
          }
        });
        this.$refs.input.currentValue = null;
      } catch (e) {
        this.$toast.error(e.message, {
          duration: 2000
        });
      }
    },

    scollToBottom() {
      this.$nextTick(() => {
        setTimeout(() => {
          console.log(this.$refs["messages"]);
          let scrollHeight = this.$refs["messages"].scrollHeight;
          this.$refs["messages"].scrollTo(0, scrollHeight); //window.scrollTo(0, scrollHeight)
        }, 100);
      });
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("main", { staticClass: "flex flex-column" }, [
    _c("div", { staticClass: "h-screen bg-red-200 flex-1 flex flex-column" }, [
      _c(
        "div",
        {
          ref: "messages",
          staticClass: "px-4 flex-1 overflow-scroll",
          attrs: { id: "messages" }
        },
        _vm._l(_vm.messages, function(message) {
          return _c("div", { key: message.id }, [
            _c(
              "div",
              {
                staticClass: "flex my-4 items-start",
                class:
                  message.owner.id == _vm.user.id
                    ? "justify-end"
                    : "justify-start"
              },
              [
                message.owner.id != _vm.user.id
                  ? _c("div", { staticClass: "mr-2" })
                  : _vm._e(),
                _vm._v(" "),
                _c("div", [
                  _c("div", { staticClass: "text-sm" }, [
                    _vm._v(" " + _vm._s(message.owner.nickName) + " ")
                  ]),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "bg-red-400 p-2 rounded text-md",
                    domProps: { innerHTML: _vm._s(_vm.nl2br(message.content)) }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "text-xs" }, [
                    _vm._v(
                      "\n              " +
                        _vm._s(_vm._f("dateFormat")(message.createdAt)) +
                        "\n            "
                    )
                  ])
                ])
              ]
            )
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "input_container" } },
        [
          _c("textarea-autosize", {
            ref: "input",
            attrs: {
              placeholder: "Type something here...",
              "min-height": 50,
              "max-height": 200,
              disabled: false
            },
            on: { sendMessage: _vm.sendMessage }
          })
        ],
        1
      )
    ])
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-10c2f8d3_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"MiniChatter.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

var index = {
  install(Vue, args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;
    Vue.component('MiniChatter', __vue_component__$1);
  }

}; //export { MiniChatter }

export default index;
