(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1220:function(t,e,l){t.exports=l.p+"img/EOS-logo.244ceb6.svg"},1221:function(t,e,l){t.exports=l.p+"img/BSC-logo.187534e.svg"},1222:function(t,e,l){"use strict";l.r(e);var n=l(2),r=(l(29),{layout:"box",middleware:["auth"],auth:"guest",data:function(){return{error:null}},computed:{bscWallet:function(){return this.$bsc?this.$bsc.wallet:null},eosWallet:function(){return this.$eos?this.$eos.wallet:null}},mounted:function(){this.$eos.rememberLogin(),this.$bsc.rememberLogin()},methods:{login:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var path;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.bscWallet||t.eosWallet){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,t.$auth.loginWith("blockchain",{account:{eos:t.eosWallet?t.eosWallet.auth:null,bsc:t.bscWallet?t.bscWallet[0]:null}});case 5:path=t.$auth.$storage.getUniversal("redirect")||"/",t.$auth.$storage.setUniversal("redirect",null),t.$router.push(path),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(2),console.error("ERR",e.t0),e.t0.response&&e.t0.response.data?e.t0.response.data.error?t.error=e.t0.response.data.error:t.error=e.t0.response.data:e.t0.message?t.error=e.t0.message:t.error=e.t0;case 14:case"end":return e.stop()}}),e,null,[[2,10]])})))()}}}),c=l(24),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("h2",{staticClass:"subtitle has-text-centered"},[t._v("\n    Login to your Effect Account\n  ")]),t._v(" "),n("div",{staticClass:"container"},[t.bscWallet?n("div",{staticClass:"has-text-centered"},[n("a",{staticClass:"blockchain-address",attrs:{href:t.$bsc.explorer+"/address/"+t.bscWallet[0],target:"_blank"}},[t._v(t._s(t.bscWallet[0]))])]):t.eosWallet?n("div",{staticClass:"has-text-centered subtitle"},[n("a",{staticClass:"blockchain-address",attrs:{href:t.$eos.explorer+"/address/"+t.eosWallet.auth.accountName,target:"_blank"}},[t._v(t._s(t.eosWallet.auth.accountName))])]):n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-half has-text-centered"},[n("div",{staticClass:"button",staticStyle:{height:"auto",display:"block"},on:{click:function(e){t.$eos.loginModal=!0}}},[t._m(0),t._v(" "),n("img",{attrs:{src:l(1220),height:"100"}})])]),t._v(" "),n("div",{staticClass:"column is-half"},[n("div",{staticClass:"button",staticStyle:{height:"auto",display:"block"},on:{click:function(e){t.$bsc.loginModal=!0}}},[t._m(1),t._v(" "),n("img",{attrs:{src:l(1221),height:"100"}})])])]),t._v(" "),n("div",{staticClass:"columns is-flex-direction-row-reverse is-vcentered mt-5"},[n("div",{staticClass:"column is-4"},[n("div",{staticClass:"button is-secondary is-fullwidth",attrs:{disabled:!t.bscWallet&&!t.eosWallet},on:{click:t.login}},[t._v("\n          Login\n        ")])]),t._v(" "),n("div",{staticClass:"column is-8"},[t.eosWallet||t.bscWallet?n("a",{staticClass:"is-size-6  has-text-danger-dark",on:{click:function(e){t.$bsc.logout(),t.$eos.logout()}}},[t._v("switch wallet")]):n("small",[t._v("\n          No Account?\n          "),n("nuxt-link",{attrs:{to:"/register"}},[t._v("\n            Create Effect Account\n          ")])],1)])])])])}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"subtitle has-text-weight-semibold mb-2"},[l("small",{staticClass:"is-size-7"},[t._v("connect with ")]),l("br"),t._v("EOS\n          ")])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"subtitle has-text-weight-semibold mb-2"},[l("small",{staticClass:"is-size-7"},[t._v("connect with ")]),l("br"),t._v("BSC\n          ")])}],!1,null,null,null);e.default=component.exports}}]);