(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1231:function(t,e,n){var content=n(1237);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(102).default)("adf3554e",content,!0,{sourceMap:!1})},1232:function(t,e,n){var content=n(1239);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(102).default)("0a886742",content,!0,{sourceMap:!1})},1236:function(t,e,n){"use strict";n(1231)},1237:function(t,e,n){var r=n(101)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,"a.card.is-active.dapp-dao[data-v-2b3a999a],a.card:hover.dapp-dao[data-v-2b3a999a]{background:#d7ac00}a.card.is-active.dapp-socials[data-v-2b3a999a],a.card:hover.dapp-socials[data-v-2b3a999a]{background:#06c6c6}a.card.is-active.dapp-captions[data-v-2b3a999a],a.card:hover.dapp-captions[data-v-2b3a999a]{background:#e06375}a.card.is-active.dapp-translate[data-v-2b3a999a],a.card:hover.dapp-translate[data-v-2b3a999a]{background:#00c165}a.card[data-v-2b3a999a]{display:flex;justify-content:center;align-items:center}a.card.dapp-null[data-v-2b3a999a]{min-height:70px}a.card .card-image[data-v-2b3a999a]{padding:5px}a.card .card-image .dapp-logo[data-v-2b3a999a]{max-height:50px}",""]),t.exports=r},1238:function(t,e,n){"use strict";n(1232)},1239:function(t,e,n){var r=n(101)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".box.is-disabled[data-v-67b40e14]{background-color:rgba(222,224,230,.5)}.box.is-disabled .column[data-v-67b40e14]:not(:last-child){opacity:.5}",""]),t.exports=r},1245:function(t,e,n){"use strict";n(104),n(50),n(114),n(75),n(115);var r=n(3),c=n(43),o=(n(40),n(74),n(24),n(183)),l=n(1256),d={name:"CategoryFilters",components:{Carousel:l.Carousel,Slide:l.Slide},data:function(){return{filter:null,effect_dapps:{dao:{hover:!1,value:"dao",normalUrl:"https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png",whiteUrl:"https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png"},socials:{hover:!1,value:"socials",normalUrl:"https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png",whiteUrl:"https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png"},translate:{hover:!1,value:"translate",normalUrl:"https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png",whiteUrl:"https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png"},captions:{hover:!1,value:"captions",normalUrl:"https://effect.network/_nuxt/img/effect-captions_h100.2b22d0c.png",whiteUrl:"https://effect.network/_nuxt/img/effect-captions_white_h100.d746459.png"}}}},methods:{onClick:function(t){this.filter=t,this.$emit("clicked",this.filter)}}},f=(n(1236),n(32));function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"CampaignList",components:{CategoryFilters:Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("carousel",{staticClass:"columns",attrs:{"pagination-enabled":!1,"per-page-custom":[[768,3],[1024,5]]}},[t._l(t.effect_dapps,(function(e,r){return n("slide",{key:e.value,staticClass:"column"},[n("a",{staticClass:"card is-flat",class:["dapp-"+r,t.filter===e.value?"is-active":null],attrs:{href:"#"},on:{mouseover:function(t){e.hover=!0},mouseleave:function(t){e.hover=!1},click:function(n){return n.preventDefault(),t.onClick(e.value)}}},[n("div",{staticClass:"card-image has-text-centered"},[n("img",{staticClass:"dapp-logo block",attrs:{src:e.hover||t.filter===e.value?e.whiteUrl:e.normalUrl,alt:"Image"}})])])])})),t._v(" "),n("slide",{staticClass:"column is-2"},[n("a",{staticClass:"card is-flat dapp-null",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.onClick(null)}}},[n("div",{staticClass:"card-image has-text-centered"},[n("h4",{staticClass:"is-size-5"},[n("b",[t._v("Show All")])])])])])],2)}),[],!1,null,"2b3a999a",null).exports},props:["active","owner","categoryFilter"],data:function(){return{filter:null,ipfsExplorer:"https://ipfs.effect.ai"}},computed:v(v(v({},Object(o.b)({batchByCampaignId:"campaign/batchByCampaignId",campaignsByCategory:"campaign/campaignsByCategory"})),Object(o.c)({campaigns:function(t){return t.campaign.campaigns},campaignsLoading:function(t){return t.campaign.loading},allCampaignsLoaded:function(t){return t.campaign.allCampaignsLoaded}})),{},{filteredCampaigns:function(){var t=this,e=this.campaignsByCategory(this.filter);for(var i in e){var n=this.batchByCampaignId(e[i].id);n&&(e[i].num_tasks=n.reduce((function(a,b){return a+b.num_tasks}),0),e[i].tasks_done=n.reduce((function(a,b){return a+b.tasks_done}),0))}return e&&(this.active&&(e=e.filter((function(t){return t.num_tasks-t.tasks_done>0}))),this.owner&&(e=e.filter((function(e){return e.owner[1]===t.owner})))),e}}),created:function(){this.getCampaigns(),this.getBatches()},methods:{onFilter:function(t){this.filter=t},getCampaigns:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.campaigns&&t.allCampaignsLoaded){e.next=3;break}return e.next=3,t.$store.dispatch("campaign/getCampaigns");case 3:case"end":return e.stop()}}),e)})))()},getBatches:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatches");case 2:case"end":return e.stop()}}),e)})))()}}},_=(n(1238),Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("client-only",[t.categoryFilter?n("category-filters",{on:{clicked:t.onFilter}}):t._e()],1),t._v(" "),t._l(t.filteredCampaigns,(function(e){return[n("nuxt-link",{key:e.id,staticClass:"box p-4",class:{"is-disabled":null===e.info},attrs:{to:"/campaigns/"+e.id}},[n("div",{staticClass:"columns is-vcentered is-multiline is-mobile"},[n("div",{staticClass:"column is-narrow is-mobile-1"},[n("p",{staticClass:"image has-radius",staticStyle:{width:"52px",height:"52px"}},[e.info&&e.info.image?n("img",{attrs:{src:e.info.image.Hash?t.ipfsExplorer+"/ipfs/"+e.info.image.Hash:e.info.image}}):t._e()])]),t._v(" "),n("div",{staticClass:"column is-4-desktop is-5-widescreen is-12-touch"},[n("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[n("div",[n("small",{staticClass:"blockchain-address"},[t._v("#"+t._s(e.id))]),t._v(" "),e.info&&e.info.category?n("span",{staticClass:"tag is-light",class:{"is-dao":"dao"===e.info.category,"is-dao":"dao"===e.info.category,"is-socials":"socials"===e.info.category,"is-translate":"translate"===e.info.category,"is-captions":"captions"===e.info.category}},[t._v(t._s(e.info.category))]):t._e()]),t._v(" "),e.info?n("span",[e.info.title?n("span",[t._v(t._s(e.info.title))]):n("i",[t._v("- Untitled -")])]):null!==e.info?n("span",[t._v("Loading..")]):n("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")])]),t._v(" "),n("div",{staticClass:"has-text-grey is-size-7"},[e.info?n("div",[e.info.description?n("div",{staticClass:"is-ellipsis"},[t._v("\n                "+t._s(e.info.description)+"\n              ")]):n("i",[t._v("- no description -")])]):null!==e.info?n("div",[t._v("\n              ........\n            ")]):t._e()])]),t._v(" "),n("div",{staticClass:"column"},[n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Requester\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[n("nuxt-link",{attrs:{to:"/profile/"+e.owner[1]}},[n("span",{class:{"is-size-7":"address"===e.owner[0]}},[t._v(t._s(e.owner[1]))])])],1)]),t._v(" "),n("div",{staticClass:"column"},[n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Reward\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n            "+t._s(e.reward.quantity)+"\n          ")])]),t._v(" "),n("div",{staticClass:"column"},[n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Tasks\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[null===t.batchByCampaignId(e.id)?n("span",[t._v("\n              Loading..\n            ")]):n("span",[t._v("\n              "+t._s(t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.num_tasks}),0)-t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.tasks_done}),0))+"/"+t._s(t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.num_tasks}),0))+" left\n              "),n("br"),t._v(" "),n("small",{staticClass:"is-size-7"},[t._v("("+t._s(t.batchByCampaignId(e.id).length)+" batch"),1!==t.batchByCampaignId(e.id).length?[t._v("es")]:t._e(),t._v(")")],2)])])]),t._v(" "),n("div",{staticClass:"column has-text-right is-12-mobile"},[n("button",{staticClass:"button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile",class:{"is-loading":void 0===e.info,"is-accent":null===e.info,"is-outlined":null===e.info},attrs:{disabled:!e||null===e.info}},[n("span",{},[t._v("View")])])])])])]})),t._v(" "),t.campaignsLoading?n("div",{staticClass:"subtitle"},[t._v("\n    Campaigns loading..\n  ")]):t.filteredCampaigns&&!t.filteredCampaigns.length?n("div",{staticClass:"subtitle"},[t._v("\n    No "),t.active?n("span",[t._v("active")]):t._e(),t._v(" campaigns\n  ")]):t.filteredCampaigns?t._e():n("div",{staticClass:"subtitle has-text-danger"},[t._v("\n    Could not retrieve campaigns\n  ")])],2)}),[],!1,null,"67b40e14",null));e.a=_.exports},1390:function(t,e,n){"use strict";n.r(e);var r={components:{CampaignList:n(1245).a},middleware:["auth"],data:function(){return{myCampaigns:!0}},created:function(){},methods:{}},c=n(32),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("nuxt-link",{staticClass:"button is-primary is-pulled-right",attrs:{to:"/campaigns/new"}},[n("span",{staticClass:"icon"},[t._v("\n        +\n      ")]),t._v(" "),n("span",[t._v("Create Campaign")])]),t._v(" "),n("nuxt-link",{staticClass:"button is-ghost is-pulled-right",attrs:{to:"/"}},[n("span",[t._v("Active Campaigns")])]),t._v(" "),n("h2",{staticClass:"title"},[t.myCampaigns?n("span",[t._v("My")]):n("span",[t._v("All")]),t._v(" Campaigns\n    ")]),t._v(" "),n("label",{staticClass:"checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.myCampaigns,expression:"myCampaigns"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.myCampaigns)?t._i(t.myCampaigns,null)>-1:t.myCampaigns},on:{change:function(e){var n=t.myCampaigns,r=e.target,c=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.myCampaigns=n.concat([null])):o>-1&&(t.myCampaigns=n.slice(0,o).concat(n.slice(o+1)))}else t.myCampaigns=c}}}),t._v("\n      Show only my campaigns\n    ")]),t._v(" "),n("campaign-list",{attrs:{owner:t.myCampaigns?t.$auth.user.accountName:null,filters:!1}})],1)])}),[],!1,null,null,null);e.default=component.exports}}]);