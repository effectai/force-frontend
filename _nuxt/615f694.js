(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1406:function(t,e,n){"use strict";n.r(e);n(104),n(50),n(75),n(114),n(74),n(115);var c=n(3),o=n(44),r=(n(37),n(24),n(155),n(278),n(116),n(51),n(279),n(85),n(184)),l=n(1257),v={name:"Balances",computed:{}},_=n(32);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={components:{Balance:Object(_.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("h2",{staticClass:"has-text-weight-bold"},[t._v("\n      Total Balance\n    ")]),t._v(" "),n("span",{staticClass:"is-flex is-align-items-center"},[n("span",[n("b",[t._v(t._s(null!==t.$blockchain.efxTotal?t.$blockchain.efxTotal.toFixed(2):"..."))]),t.$blockchain.efxLoading?n("span",[t._v("..")]):t._e(),t._v(" EFX")]),t._v(" "),null!==t.$blockchain.efxTotal&&t.$blockchain.efxPrice?n("span",{staticClass:"is-size-7 pl-2"},[t._v("| $"),n("b",[t._v(t._s((t.$blockchain.efxTotal*t.$blockchain.efxPrice).toFixed(2)))])]):t._e()])]),t._v(" "),n("div",{staticClass:"column"},[n("h2",{staticClass:"has-text-weight-bold"},[t._v("\n      vAccount Contract Balance\n    ")]),t._v(" "),null!==t.$blockchain.vefxAvailable?n("span",[t._v(t._s(t.$blockchain.vefxAvailable.toFixed(2)))]):n("span",[t._v(".....")]),n("span",[t._v("  EFX")])]),t._v(" "),n("div",{staticClass:"column"},[n("h2",{staticClass:"has-text-weight-bold"},[t._v("\n      Wallet\n    ")]),t._v(" "),null!==t.$blockchain.efxAvailable?n("span",[t._v(t._s(t.$blockchain.efxAvailable.toFixed(2)))]):n("span",[t._v(".....")]),n("span",[t._v("  EFX")])]),t._v(" "),n("div",{staticClass:"column"},[n("h2",{staticClass:"has-text-weight-bold"},[t._v("\n      Pending Tasks\n    ")]),t._v(" "),null!==t.$blockchain.efxPending?n("span",[t._v(t._s(t.$blockchain.efxPending.toFixed(2)))]):n("span",[t._v(".....")]),n("span",[t._v("  EFX")])]),t._v(" "),n("div",{staticClass:"column"},[n("h2",{staticClass:"has-text-weight-bold"},[t._v("\n      Actions\n    ")]),t._v(" "),n("div",[n("nuxt-link",{staticClass:"button is-accent is-small",attrs:{to:"/deposit"}},[t._v("\n        Deposit\n      ")]),t._v(" "),n("nuxt-link",{staticClass:"button is-secondary is-small",attrs:{to:"/withdraw"}},[t._v("\n        Withdraw\n      ")])],1)])])}),[],!1,null,"39f2a0ec",null).exports,CampaignList:n(1256).a,Pagination:l.a},filters:{hide:function(t,e){return e?t:(t=t.toString()).split("").map((function(t){return"•","•"})).join("")}},middleware:["auth"],data:function(){return{page:1,perPage:10,showPK:!1,pages:[]}},computed:d(d({},Object(r.b)({transactionsByUser:"transaction/transactionsByUser"})),{},{transactions:function(){return this.transactionsByUser(this.$auth.user.vAccountRows[0].id)},paginatedTransactions:function(){var t=(this.page-1)*this.perPage;return this.transactions?this.transactions.slice(t,t+this.perPage):[]}}),methods:{logout:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$auth.logout();case 2:case"end":return e.stop()}}),e)})))()},setPage:function(t){this.page=t}}},k=Object(_.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("div",{staticClass:"text-center"},[n("h4",{staticClass:"title is-spaced"},[t._v("\n        Your Effect Account\n      ")]),t._v(" "),n("balance"),t._v(" "),n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          Effect Account Name:\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},[t._v("\n          "+t._s(t.$auth.user.accountName)+"\n        ")])]),t._v(" "),n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          "+t._s("bsc"===t.$auth.user.blockchain?"BSC Address":"EOS Account Name")+":\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},["bsc"===t.$auth.user.blockchain?n("a",{staticClass:"blockchain-address",attrs:{href:t.$blockchain.bsc.explorer+"/address/"+t.$auth.user.address,target:"_blank"}},[t._v(t._s(t.$auth.user.address))]):n("a",{staticClass:"blockchain-address",attrs:{href:t.$blockchain.eos.explorer+"/address/"+t.$auth.user.accountName,target:"_blank"}},[t._v(t._s(t.$auth.user.accountName))]),t.$auth.user.permission?n("span",[t._v("@"+t._s(t.$auth.user.permission))]):t._e()])]),t._v(" "),"burner-wallet"===t.$auth.user.provider?n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          Private key:\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},[n("span",{staticClass:"has-text-link"},[t._v(t._s(t._f("hide")(t.$auth.user.privateKey,t.showPK)))])]),t._v(" "),n("button",{staticClass:"button is-light",on:{click:function(e){t.showPK=!t.showPK}}},[t.showPK?n("span",[t._v("Hide")]):n("span",[t._v("Show")])])]):t._e(),t._v(" "),n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          Effect Account ID:\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},[t._v("\n          "+t._s(t.$auth.user.vAccountRows[0].id)+"\n        ")])]),t._v(" "),n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          Wallet Connection:\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},[t._v("\n          "+t._s(t.$auth.user.provider)+"@"+t._s(t.$auth.user.blockchain)+"\n        ")])]),t._v(" "),n("div",{staticClass:"block"},[n("div",{staticClass:"has-text-weight-bold is-size-6"},[t._v("\n          Blockchain:\n        ")]),t._v(" "),n("div",{staticClass:"subtitle"},[n("a",{attrs:{href:t.$blockchain.eos.explorer+"/account/"+t.$blockchain.sdk.account.config.account_contract+"?loadContract=true&tab=Tables&table=account&account="+t.$blockchain.sdk.account.config.account_contract+"&scope="+t.$blockchain.sdk.account.config.account_contract+"&limit=1&lower_bound="+t.$auth.user.vAccountRows[0].id+"&upper_bound="+t.$auth.user.vAccountRows[0].id,target:"_blank"}},[t._v("View on explorer")])])]),t._v(" "),n("hr"),t._v(" "),n("h2",{staticClass:"title is-4"},[t._v("\n        My Campaigns\n      ")]),t._v(" "),n("campaign-list",{staticClass:"mb-6",attrs:{owner:t.$auth.user.accountName}}),t._v(" "),n("hr"),t._v(" "),n("h4",{staticClass:"title is-4 is-spaced"},[t._v("\n        Transactions\n      ")]),t._v(" "),t.transactions?n("table",{staticClass:"table",staticStyle:{width:"100%"}},[t._m(0),t._v(" "),n("tbody",t._l(t.paginatedTransactions,(function(e){return n("tr",{key:e.transaction_id},[n("td",[n("a",{attrs:{href:t.$blockchain.eos.explorer+"/transaction/"+e.transaction_id,target:"_blank"}},[t._v(t._s(e.transaction_id))])]),t._v(" "),n("td",[e.processed&&e.processed.action_traces?n("span",[t._v(t._s(e.processed.action_traces[0].act.name))]):t._e()]),t._v(" "),n("td",[e.processed?n("span",[t._v(t._s(new Date(e.processed.block_time).toLocaleString()))]):t._e()]),t._v(" "),n("td",[e.processed&&e.processed.receipt?n("span",[t._v(t._s(e.processed.receipt.status))]):t._e()]),t._v(" "),n("th",[n("a",{attrs:{href:t.$blockchain.eos.explorer+"/transaction/"+e.transaction_id,target:"_blank"}},[t._v("View on explorer")])])])})),0)]):n("span",[t._v("No transactions found")]),t._v(" "),t.transactions?n("pagination",{attrs:{items:t.transactions.length,page:t.page,"per-page":t.perPage},on:{setPage:t.setPage}}):t._e(),t._v(" "),n("hr"),t._v(" "),n("a",{staticClass:"button is-danger",on:{click:t.logout}},[t._v("Logout")]),t._v(" "),n("br"),n("br")],1)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Transaction ID")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Date")]),t._v(" "),n("th",[t._v("Status")]),t._v(" "),n("th")])])}],!1,null,null,null);e.default=k.exports}}]);