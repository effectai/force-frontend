(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1271:function(t,e,n){var content=n(1321);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("cb7f7502",content,!0,{sourceMap:!1})},1318:function(t,e,n){t.exports=n.p+"img/EOS-logo.244ceb6.svg"},1319:function(t,e,n){t.exports=n.p+"img/BSC-logo.187534e.svg"},1320:function(t,e,n){"use strict";n(1271)},1321:function(t,e,n){var c=n(102)(!1);c.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),c.push([t.i,".blockchain-address[data-v-78fdc572]{white-space:unset}",""]),t.exports=c},1411:function(t,e,n){"use strict";n.r(e);var c=n(3),o=(n(37),n(24),n(155),n(278),n(116),n(51),n(279),n(371)),r={filters:{hide:function(t,e){return e?t:(t=t.toString()).split("").map((function(t){return"•","•"})).join("")}},layout:"box",middleware:["auth"],auth:"guest",data:function(){return{existingAccount:null,error:null,loadingLogin:!1,loading:!1,showPK:!1}},watch:{"$blockchain.account":function(t){this.existingAccount=null,t&&(console.log("account",t),this.accountExists())}},created:function(){this.rememberLogin()},methods:{connectToBurnerWallet:function(t){this.$root.$emit("selectBurnerWallet",t),this.$blockchain.burnerWallet=!1},rememberLogin:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$blockchain.rememberLogin();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.error("rememberLogin",e.t0);case 9:t.loading=!1;case 10:case"end":return e.stop()}}),e,null,[[1,6]])})))()},login:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,path;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.loadingLogin=!0,t.$blockchain.account){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,e.next=6,t.$blockchain.connectAccount();case 6:return e.next=8,o(Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$auth.loginWith("blockchain",{account:t.$blockchain.account,$blockchain:t.$blockchain});case 2:case"end":return e.stop()}}),e)}))),{retries:5,onRetry:function(t,e){console.log("attempt",e,t)}});case 8:n,t.$blockchain.getAccountBalance(),t.$blockchain.getPendingBalance(),t.$auth.$storage.setUniversal("rememberAccount",JSON.stringify(t.$blockchain.account)),path=t.$auth.$storage.getUniversal("redirect")||"/",t.$auth.$storage.setUniversal("redirect",null),t.$router.push(path),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),t.handleError(e.t0);case 20:t.loadingLogin=!1;case 21:case"end":return e.stop()}}),e,null,[[3,17]])})))()},handleError:function(t){console.error(t),t.response&&t.response.data?t.response.data.error?this.error=t.response.data.error:t.response.data.message?this.error=t.response.data.message:this.error=t.response.data:t.message?this.error=t.message:this.error=t},accountExists:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$blockchain.getVAccountByName();case 3:(n=e.sent)&&n.length?t.existingAccount=!0:t.existingAccount=!1,e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),t.handleError(e.t0),alert("Cannot check if account exist, assuming it does not"),t.existingAccount=!1;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))()}}},l=(n(1320),n(32)),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("section",{staticClass:"section"},[c("h2",{staticClass:"subtitle has-text-centered"},[t.$blockchain.waitForSignatureFrom?c("span",[t._v("Account Switched. Re-verify Signature")]):!1===t.existingAccount?c("span",[t._v("Create new Effect Account")]):c("span",[t._v("Login to your Effect Account")])]),t._v(" "),t.loading?c("div",{staticClass:"container"},[t._v("\n    Loading..\n  ")]):c("div",{staticClass:"container"},[t.$blockchain.account?c("div",[c("div",{staticClass:"has-text-centered mb-2",class:{subtitle:"eos"===t.$blockchain.account.blockchain}},["bsc"===t.$blockchain.account.blockchain?c("a",{staticClass:"blockchain-address",attrs:{href:t.$blockchain.bsc.explorer+"/address/"+t.$blockchain.waitForSignatureFrom?t.$blockchain.waitForSignatureFrom:t.$blockchain.account.address,target:"_blank"}},[c("p",{staticStyle:{"word-break":"break-word"}},[t._v("\n            "+t._s(t.$blockchain.waitForSignatureFrom?t.$blockchain.waitForSignatureFrom:t.$blockchain.account.address)+"\n          ")])]):c("a",{attrs:{href:t.$blockchain.eos.explorer+"/address/"+t.$blockchain.account.accountName,target:"_blank"}},[t._v(t._s(t.$blockchain.account.accountName))]),t.$blockchain.account.permission?c("span",[t._v("@"+t._s(t.$blockchain.account.permission))]):t._e(),t._v(" "),t.$blockchain.account.privateKey?c("div",[c("p",{staticClass:"mt-2",staticStyle:{"word-break":"break-word"}},[t._m(0),t._v(" "),c("span",{staticClass:"has-text-link"},[t._v(t._s(t._f("hide")(t.$blockchain.account.privateKey,t.showPK)))])]),t._v(" "),c("button",{staticClass:"button is-light",on:{click:function(e){t.showPK=!t.showPK}}},[t.showPK?c("span",[t._v("Hide")]):c("span",[t._v("Show")])])]):t._e()]),t._v(" "),c("div",{staticStyle:{"min-height":"67px"}},[t.error?c("div",{staticClass:"notification is-danger"},[c("button",{staticClass:"delete",on:{click:function(e){t.error=null}}}),t._v("\n          "+t._s(t.error)+"\n        ")]):t._e(),t._v(" "),t.loadingLogin?c("div",{staticClass:"is-size-7 has-text-centered"},[t._v("\n          ..retrieving blockchain Effect Account info..\n        ")]):t._e()])]):c("div",{staticClass:"columns"},[c("div",{staticClass:"column is-half has-text-centered"},[c("div",{staticClass:"button",staticStyle:{height:"auto",display:"block"},on:{click:function(e){t.$blockchain.loginModal="eos"}}},[t._m(1),t._v(" "),c("img",{attrs:{src:n(1318),height:"100"}})])]),t._v(" "),c("div",{staticClass:"column is-half"},[c("div",{staticClass:"button",staticStyle:{height:"auto",display:"block"},on:{click:function(e){t.$blockchain.loginModal="bsc"}}},[t._m(2),t._v(" "),c("img",{attrs:{src:n(1319),height:"100"}})])])]),t._v(" "),c("div",{staticClass:"columns is-flex-direction-row-reverse is-vcentered mt-1"},[c("div",{staticClass:"column is-4"},[t.$blockchain.waitForSignatureFrom?c("div",{staticClass:"button is-secondary is-fullwidth",class:{"is-loading":t.$blockchain.waitForSignature},on:{click:t.$blockchain.switchBscAccountBeforeLogin}},[t._v("\n          Sign\n        ")]):t.$blockchain.account?c("div",{staticClass:"button is-secondary is-fullwidth",class:{"is-loading":t.loadingLogin||null===t.existingAccount},attrs:{disabled:!t.$blockchain.account||t.loadingLogin||null===t.existingAccount},on:{click:t.login}},[t.existingAccount?c("span",[t._v("Login")]):c("span",[t._v("Register")])]):t._e()]),t._v(" "),c("div",{staticClass:"column is-8"},[t.$blockchain.account?c("a",{staticClass:"is-size-6  has-text-danger-dark",on:{click:function(e){return t.$blockchain.logout()}}},[t._v("switch wallet")]):t._e()])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("b",[t._v("Private key")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"subtitle has-text-weight-semibold mb-2"},[n("small",{staticClass:"is-size-7"},[t._v("connect with ")]),n("br"),t._v("EOS\n          ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"subtitle has-text-weight-semibold mb-2"},[n("small",{staticClass:"is-size-7"},[t._v("connect with ")]),n("br"),t._v("BSC\n          ")])}],!1,null,"78fdc572",null);e.default=component.exports}}]);