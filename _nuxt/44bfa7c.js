(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1012:function(t,n,e){"use strict";e.r(n);e(74),e(45),e(64),e(87),e(55),e(88);var c=e(38),r=e(110);function o(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}var l={middleware:["auth"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(n){Object(c.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({},Object(r.b)({campaigns:function(t){return t.campaign.campaigns},campaignsLoading:function(t){return t.campaign.loading}})),created:function(){this.$store.dispatch("campaign/getCampaigns")},methods:{transaction:function(){this.$bsc.testTx()}}},v=e(26),component=Object(v.a)(l,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("section",{staticClass:"section"},[e("div",{staticClass:"container"},[e("div",{staticClass:"text-center"},[e("h4",{staticClass:"title"},[t._v("\n        Welcome\n      ")]),t._v(" "),e("div",{staticClass:"subtitle"},[t._v("\n        "+t._s(t.$auth.user.address)+"\n      ")]),t._v(" "),e("br"),t._v(" "),e("a",{staticClass:"button is-primary",on:{click:t.transaction}},[t._v("test transaction")]),t._v(" "),e("br"),e("br")]),t._v(" "),e("div",[t.campaignsLoading?e("div",[t._v("\n        Campaigns loading..\n      ")]):t.campaigns&&t.campaigns.length?t._l(t.campaigns,(function(n){return e("div",{key:n.id},[t._v("\n        "+t._s(n.name)+"\n      ")])})):t.campaigns&&!t.campaigns.length?e("div",[t._v("\n        No campaigns :(\n      ")]):e("div",[t._v("\n        Could not retrieve campaigns\n      ")])],2)])])}),[],!1,null,null,null);n.default=component.exports}}]);