(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{941:function(t,e,n){"use strict";n.r(e);var r=n(7),c=(n(24),n(80),{data:function(){return{error:null}},computed:{bscWallet:function(){return this.$bsc?this.$bsc.wallet:null}},methods:{login:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("".concat("https://auth.effect.ai","/user/login/").concat(t.bscWallet[0]));case 3:return n=e.sent,r=n.data,e.next=7,t.$bsc.sign(r);case 7:return c=e.sent,e.next=10,t.$auth.loginWith("local",{data:{address:t.bscWallet[0],nonce:r,signature:c}});case 10:o=e.sent,console.log(o),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.error("ERR",e.t0),e.t0.response&&e.t0.response.data?e.t0.response.data.error?t.error=e.t0.response.data.error:t.error=e.t0.response.data:e.t0.message?t.error=e.t0.message:t.error=e.t0;case 18:case"end":return e.stop()}}),e,null,[[0,14]])})))()}}}),o=n(23),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.bscWallet?n("div",[n("b",[t._v("Selected account")]),t._v(" "),n("a",{staticClass:"blockchain-address",attrs:{href:t.$bsc.explorer+"/address/"+t.bscWallet[0],target:"_blank"}},[t._v(t._s(t.bscWallet[0]))]),t._v(" "),n("div",{staticClass:"has-text-centered"},[n("a",{staticClass:"button is-secondary is-wide",attrs:{disabled:!t.bscWallet},on:{click:t.login}},[t._v("\n        Login\n      ")])]),t._v(" "),n("div",{staticClass:"has-text-centered mt-2"},[n("a",{staticClass:"is-size-6  has-text-danger-dark",on:{click:t.$bsc.logout}},[t._v("switch wallet")])])]):n("div",[n("button",{staticClass:"button is-primary",on:{click:function(e){t.$bsc.loginModal=!0}}},[t._v("\n      Connect BSC Wallet\n    ")])])])}),[],!1,null,null,null);e.default=component.exports}}]);