(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1255:function(t,e,n){"use strict";n(104),n(114),n(74),n(115);var r=n(3),o=n(379),c=n(44),l=(n(37),n(75),n(24),n(51),n(376),n(105),n(117),n(50),n(86),n(1308),n(85),n(1265)),d=n.n(l),f=n(184),v=n(1309),m={name:"CategoryFilters",components:{Carousel:v.Carousel,Slide:v.Slide},data:function(){return{filter:null,selectSort:null,effect_dapps:{dao:{hover:!1,value:"dao",normalUrl:"https://effect.network/_nuxt/img/effect-dao_h100.62b6528.png",whiteUrl:"https://effect.network/_nuxt/img/effect-dao_white_h100.8128b59.png"},socials:{hover:!1,value:"socials",normalUrl:"https://effect.network/_nuxt/img/effect-socials_h100.4f0f9f8.png",whiteUrl:"https://effect.network/_nuxt/img/effect-socials_white_h100.aaa70fd.png"},translate:{hover:!1,value:"translate",normalUrl:"https://effect.network/_nuxt/img/effect-translate_h100.61861ae.png",whiteUrl:"https://effect.network/_nuxt/img/effect-translate_white_h100.d698b51.png"},captions:{hover:!1,value:"captions",normalUrl:"https://effect.network/_nuxt/img/effect-captions_h100.2b22d0c.png",whiteUrl:"https://effect.network/_nuxt/img/effect-captions_white_h100.d746459.png"}}}},methods:{onClick:function(t){this.filter=t,this.$emit("clicked",this.filter)}}},_=(n(1310),n(32)),h=Object(_.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("carousel",{staticClass:"columns",attrs:{"pagination-enabled":!1,"per-page-custom":[[768,3],[1024,5]]}},[t._l(t.effect_dapps,(function(e,r){return n("slide",{key:e.value,staticClass:"column"},[n("a",{staticClass:"card is-flat",class:["dapp-"+r,t.filter===e.value?"is-active":null],attrs:{href:"#"},on:{mouseover:function(t){e.hover=!0},mouseleave:function(t){e.hover=!1},click:function(n){return n.preventDefault(),t.onClick(e.value)}}},[n("div",{staticClass:"card-image has-text-centered"},[n("img",{staticClass:"dapp-logo block",attrs:{src:e.hover||t.filter===e.value?e.whiteUrl:e.normalUrl,alt:"Image"}})])])])})),t._v(" "),n("slide",{staticClass:"column is-2"},[n("a",{staticClass:"card is-flat dapp-null",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.onClick(null)}}},[n("div",{staticClass:"card-image has-text-centered"},[n("h4",{staticClass:"is-size-5"},[n("b",[t._v("Show All")])])])])])],2)],1)}),[],!1,null,"7a42cdf3",null).exports,C={name:"SortAndFilters",data:function(){return{selectSort:null,search:null,status:null,category:null,effect_dapps:{dao:{value:"dao",name:"DAO"},socials:{value:"socials",name:"Socials"},translate:{value:"translate",name:"Translate"},captions:{value:"captions",name:"Captions"}},sort_options:{tasks_desc:{value:"num_tasks",name:"Number of Tasks (descending)",order:"desc"},tasks_asc:{value:"num_tasks",name:"Number of Tasks (ascending)",order:"asc"},reward:{value:"reward.quantity",name:"EFX Reward",order:"desc"},title_asc:{value:"info.title",name:"Title (ascending)",order:"asc"},title_desc:{value:"info.title",name:"Title (descending)",order:"desc"},id_asc:{value:"id",name:"ID (ascending)",order:"asc"},id_desc:{value:"id",name:"ID (descending)",order:"desc"}},statuses:{active:{value:"active",name:"Active"},ended:{value:"ended",name:"Ended"},notstarted:{value:"notstarted",name:"Not Started"}}}},methods:{onStatusFilter:function(t){this.$emit("status",t)},onCategoryFilter:function(t){this.$emit("category",t)},onSort:function(t){this.$emit("sorted",t)},onSearch:function(t){this.$emit("search",t.target.value)}}},y=(n(1312),{props:["page","perPage","items"],computed:{maxPage:function(){return Math.ceil(this.items/this.perPage)}},watch:{items:function(){this.$emit("setPage",1)}}});function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function w(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var x={name:"CampaignList",components:{CategoryFilters:h,SortFilters:Object(_.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"columns is-align-items-center is-justify-content-space-between mt-3"},[n("div",{staticClass:"column"},[t._v("\n    Search\n    "),n("input",{staticClass:"input",attrs:{type:"text",placeholder:"Search campaign..."},on:{keyup:t.onSearch}})]),t._v(" "),n("div",{staticClass:"column"},[n("span",[t._v("Category")]),n("br"),t._v(" "),n("div",{staticClass:"select is-normal"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.category=e.target.multiple?n:n[0]},function(e){return t.onCategoryFilter(t.category.value)}]}},[n("option",{attrs:{value:"",selected:""}},[t._v("-")]),t._v(" "),t._l(t.effect_dapps,(function(e){return n("option",{key:e.value,staticClass:"column",domProps:{value:e}},[t._v("\n          "+t._s(e.name)+"\n        ")])}))],2)])]),t._v(" "),n("div",{staticClass:"column"},[n("span",[t._v("Status")]),n("br"),t._v(" "),n("div",{staticClass:"select is-normal"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.status=e.target.multiple?n:n[0]},function(e){return t.onStatusFilter(t.status.value)}]}},[n("option",{attrs:{value:"",selected:""}},[t._v("-")]),t._v(" "),t._l(t.statuses,(function(e){return n("option",{key:e.value,staticClass:"column",domProps:{value:e}},[t._v("\n          "+t._s(e.name)+"\n        ")])}))],2)])]),t._v(" "),n("div",{staticClass:"column"},[n("span",[t._v("Sort")]),n("br"),t._v(" "),n("div",{staticClass:"select is-normal"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.selectSort,expression:"selectSort"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.selectSort=e.target.multiple?n:n[0]},function(e){return t.onSort(t.selectSort)}]}},[n("option",{attrs:{value:"",selected:""}},[t._v("-")]),t._v(" "),t._l(t.sort_options,(function(e){return n("option",{key:e.name,staticClass:"column",domProps:{value:e}},[t._v("\n          "+t._s(e.name)+"\n        ")])}))],2)])])])}),[],!1,null,"7054fbed",null).exports,Pagination:Object(_.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.items?n("nav",{staticClass:"pagination",attrs:{role:"navigation","aria-label":"pagination"}},[n("span",[t._v(t._s((t.page-1)*t.perPage+1)+"-"+t._s(Math.min(t.page*t.perPage,t.items))+" of\n    "+t._s(t.items))]),t._v(" "),n("a",{staticClass:"pagination-previous",attrs:{disabled:1===t.page},on:{click:function(e){return t.$emit("setPage",t.page-1)}}},[t._v("Previous")]),t._v(" "),n("a",{staticClass:"pagination-next",attrs:{disabled:!t.maxPage||t.page===t.maxPage},on:{click:function(e){return t.$emit("setPage",t.page+1)}}},[t._v("Next page")]),t._v(" "),n("ul",{staticClass:"pagination-list"},[t.page>2?n("li",[n("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",1)}}},[t._v("1")])]):t._e(),t._v(" "),t.page>3?n("li",[n("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.page>1?n("li",[n("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.page-1)}}},[t._v(t._s(t.page-1))])]):t._e(),t._v(" "),n("li",[n("a",{staticClass:"pagination-link is-current",attrs:{"aria-current":"page"}},[t._v(t._s(t.page))])]),t._v(" "),t.page<t.maxPage?n("li",[n("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.page+1)}}},[t._v(t._s(t.page+1))])]):t._e(),t._v(" "),t.maxPage>t.page+2?n("li",[n("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.maxPage>t.page+1?n("li",[n("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.maxPage)}}},[t._v(t._s(t.maxPage))])]):t._e()])]):t._e()}),[],!1,null,null,null).exports},props:["active","owner","categoryFilter","sortCampaigns"],data:function(){return{filter:null,sort:null,page:1,perPage:30,search:null,status:null,ipfsExplorer:"https://ipfs.effect.ai",categories:["translate","captions","socials","dao"]}},computed:w(w(w({},Object(f.b)({batchByCampaignId:"campaign/batchByCampaignId",campaignsByCategory:"campaign/campaignsByCategory",reservationsByAccountId:"campaign/reservationsByAccountId"})),Object(f.c)({campaigns:function(t){return t.campaign.campaigns},campaignsLoading:function(t){return t.campaign.loading},allCampaignsLoaded:function(t){return t.campaign.allCampaignsLoaded},allBatchesLoaded:function(t){return t.campaign.allBatchesLoaded},allSubmissionsLoaded:function(t){return t.campaign.allCampaignsLoaded}})),{},{reservations:function(){return this.reservationsByAccountId(this.$auth.user.vAccountRows[0].id)},filteredCampaigns:function(){var t,e=this,n=this.campaignsByCategory(this.filter);for(var i in n){var r=this.batchByCampaignId(n[i].id),c=d.a.intersectionBy(r,this.reservations,"batch_id");n[i].userHasReservation=c.length,r&&(n[i].num_tasks=r.reduce((function(a,b){return a+b.num_tasks}),0),n[i].tasks_done=r.reduce((function(a,b){return a+b.tasks_done}),0))}if(n&&(t=Object(o.a)(n),this.active?(t=t.filter((function(t){return t.num_tasks-t.tasks_done>0||t.userHasReservation})),t=d.a.orderBy(t,["userHasReservation","id"],["desc","asc"])):t.reverse(),this.owner&&(t=t.filter((function(t){return t.owner[1]===e.owner})))),null!==this.search&&(t=t.filter((function(t){return!(!t||!t.info)&&(t.info.title.toLowerCase().includes(e.search.toLowerCase())||t.info.description.toLowerCase().includes(e.search.toLowerCase()))}))),this.status)switch(this.status){case"active":t=t.filter((function(t){return t.num_tasks-t.tasks_done>0}));break;case"ended":t=t.filter((function(t){return t.num_tasks-t.tasks_done==0&&0!==t.num_tasks}));break;case"notstarted":t=t.filter((function(t){return t.num_tasks-t.tasks_done===t.num_tasks}))}return this.sort&&(t=d.a.orderBy(t,[function(t){return"string"==typeof d.a.get(t,"".concat(e.sort.value))?d.a.get(t,"".concat(e.sort.value)).toLowerCase():d.a.get(t,"".concat(e.sort.value))},"userHasReservation"],[this.sort.order,"desc"])),t},paginatedCampaigns:function(){var t=(this.page-1)*this.perPage;return this.filteredCampaigns?this.filteredCampaigns.slice(t,t+this.perPage):[]}}),created:function(){this.getForceInfo()},methods:{setPage:function(t){this.page=t},onFilter:function(t){this.filter=t},onStatusFilter:function(t){this.status=t},onSort:function(t){this.sort=t},onSearch:function(input){this.search=input},getForceInfo:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.campaigns&&t.allCampaignsLoaded){e.next=3;break}return e.next=3,t.$store.dispatch("campaign/getCampaigns");case 3:if(t.allBatchesLoaded){e.next=6;break}return e.next=6,t.$store.dispatch("campaign/getBatches");case 6:if(t.allSubmissionsLoaded){e.next=9;break}return e.next=9,t.$store.dispatch("campaign/getSubmissions");case 9:case"end":return e.stop()}}),e)})))()}}},P=(n(1314),Object(_.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("client-only",[t.categoryFilter?r("category-filters",{on:{clicked:t.onFilter}}):t._e(),t._v(" "),t.sortCampaigns?r("sort-filters",{on:{sorted:t.onSort,search:t.onSearch,category:t.onFilter,status:t.onStatusFilter}}):t._e(),t._v(" "),r("hr")],1),t._v(" "),t._l(t.paginatedCampaigns,(function(e){return[r("nuxt-link",{key:e.id,staticClass:"box p-4",class:{"is-disabled":null===e.info,"has-reservation":e.userHasReservation},attrs:{to:"/campaigns/"+e.id}},[r("div",{staticClass:"columns is-vcentered is-multiline is-mobile"},[r("div",{staticClass:"column is-narrow is-mobile-1"},[r("p",{staticClass:"image has-radius",staticStyle:{width:"52px",height:"52px"}},[e.info&&e.info.image?r("img",{attrs:{src:e.info.image.Hash?t.ipfsExplorer+"/ipfs/"+e.info.image.Hash:e.info.image}}):e.info&&e.info.category&&t.categories.includes(e.info.category)?r("img",{attrs:{src:n(1303)("./effect-"+e.info.category+"-icon.png")}}):r("img",{attrs:{src:n(1264),alt:"campaign title"}})])]),t._v(" "),r("div",{staticClass:"column is-4-desktop is-5-widescreen is-12-touch"},[r("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[r("div",[r("small",{staticClass:"blockchain-address"},[t._v("#"+t._s(e.id))]),t._v(" "),e.info&&e.info.category?r("span",{staticClass:"tag is-light",class:{"is-dao":"dao"===e.info.category,"is-dao":"dao"===e.info.category,"is-socials":"socials"===e.info.category,"is-translate":"translate"===e.info.category,"is-captions":"captions"===e.info.category}},[t._v(t._s(e.info.category))]):t._e()]),t._v(" "),e.info?r("span",[e.info.title?r("span",[t._v(t._s(e.info.title))]):r("i",[t._v("- Untitled -")])]):null!==e.info?r("span",[t._v("Loading..")]):r("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")])]),t._v(" "),r("div",{staticClass:"has-text-grey is-size-7"},[e.info?r("div",[e.info.description?r("div",{staticClass:"is-ellipsis"},[t._v("\n                "+t._s(e.info.description)+"\n              ")]):r("i",[t._v("- no description -")])]):null!==e.info?r("div",[t._v("\n              ........\n            ")]):t._e()])]),t._v(" "),r("div",{staticClass:"column"},[r("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Requester\n          ")]),t._v(" "),r("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[r("nuxt-link",{attrs:{to:"/profile/"+e.owner[1]}},[r("span",{class:{"is-size-7":"address"===e.owner[0]}},[t._v(t._s(e.owner[1]))])])],1)]),t._v(" "),r("div",{staticClass:"column"},[r("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Reward\n          ")]),t._v(" "),r("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n            "+t._s(e.reward.quantity)+"\n          ")])]),t._v(" "),r("div",{staticClass:"column"},[r("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n            Tasks\n          ")]),t._v(" "),r("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[null===t.batchByCampaignId(e.id)?r("span",[t._v("\n              Loading..\n            ")]):r("span",[t._v("\n              "+t._s(t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.num_tasks}),0)-t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.tasks_done}),0))+"/"+t._s(t.batchByCampaignId(e.id).reduce((function(a,b){return a+b.num_tasks}),0))+" left\n              "),r("br"),t._v(" "),r("small",{staticClass:"is-size-7"},[t._v("("+t._s(t.batchByCampaignId(e.id).length)+" batch"),1!==t.batchByCampaignId(e.id).length?[t._v("es")]:t._e(),t._v(")")],2)])])]),t._v(" "),r("div",{staticClass:"column has-text-right is-12-mobile"},[r("button",{staticClass:"button is-wide is-secondary has-text-weight-semibold is-fullwidth-mobile",class:{"is-loading":void 0===e.info,"is-accent":null===e.info||e.userHasReservation,"is-outlined":null===e.info},attrs:{disabled:!e||null===e.info}},[e.userHasReservation?r("span",[t._v("Go to Task")]):r("span",[t._v("View")])])])])])]})),t._v(" "),t.filteredCampaigns?r("pagination",{attrs:{items:t.filteredCampaigns.length,page:t.page,"per-page":t.perPage},on:{setPage:t.setPage}}):t._e(),t._v(" "),t.campaignsLoading?r("div",{staticClass:"subtitle"},[t._v("\n    Campaigns loading..\n  ")]):t.allBatchesLoaded?t.filteredCampaigns&&!t.filteredCampaigns.length?r("div",{staticClass:"subtitle"},[t._v("\n    No "),t.active?r("span",[t._v("active")]):t._e(),t._v(" campaigns\n  ")]):t.filteredCampaigns?t._e():r("div",{staticClass:"subtitle has-text-danger"},[t._v("\n    Could not retrieve campaigns\n  ")]):r("div",[t._v("\n    Batches loading..\n  ")])],2)}),[],!1,null,"00fa95be",null));e.a=P.exports},1264:function(t,e,n){t.exports=n.p+"img/effect-force-icon.828a6c5.png"},1266:function(t,e,n){var content=n(1311);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("324fe8a9",content,!0,{sourceMap:!1})},1267:function(t,e,n){var content=n(1313);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("57275182",content,!0,{sourceMap:!1})},1268:function(t,e,n){var content=n(1315);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("3a364cb3",content,!0,{sourceMap:!1})},1303:function(t,e,n){var map={"./effect-captions-icon.png":1304,"./effect-dao-icon.png":1305,"./effect-force-icon.png":1264,"./effect-socials-icon.png":1306,"./effect-translate-icon.png":1307};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=1303},1304:function(t,e,n){t.exports=n.p+"img/effect-captions-icon.d32e1fd.png"},1305:function(t,e,n){t.exports=n.p+"img/effect-dao-icon.8a49264.png"},1306:function(t,e,n){t.exports=n.p+"img/effect-socials-icon.113948d.png"},1307:function(t,e,n){t.exports=n.p+"img/effect-translate-icon.a76baca.png"},1310:function(t,e,n){"use strict";n(1266)},1311:function(t,e,n){var r=n(102)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,"a.card.is-active.dapp-dao[data-v-7a42cdf3],a.card:hover.dapp-dao[data-v-7a42cdf3]{background:#d7ac00}a.card.is-active.dapp-socials[data-v-7a42cdf3],a.card:hover.dapp-socials[data-v-7a42cdf3]{background:#06c6c6}a.card.is-active.dapp-captions[data-v-7a42cdf3],a.card:hover.dapp-captions[data-v-7a42cdf3]{background:#e06375}a.card.is-active.dapp-translate[data-v-7a42cdf3],a.card:hover.dapp-translate[data-v-7a42cdf3]{background:#00c165}a.card[data-v-7a42cdf3]{display:flex;justify-content:center;align-items:center}a.card.dapp-null[data-v-7a42cdf3]{min-height:70px}a.card .card-image[data-v-7a42cdf3]{padding:5px}a.card .card-image .dapp-logo[data-v-7a42cdf3]{max-height:50px}",""]),t.exports=r},1312:function(t,e,n){"use strict";n(1267)},1313:function(t,e,n){var r=n(102)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".select[data-v-7054fbed],.select select[data-v-7054fbed]{width:100%}",""]),t.exports=r},1314:function(t,e,n){"use strict";n(1268)},1315:function(t,e,n){var r=n(102)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".box.is-disabled[data-v-00fa95be]{background-color:rgba(222,224,230,.5)}.box.is-disabled .column[data-v-00fa95be]:not(:last-child){opacity:.5}.box.has-reservation[data-v-00fa95be]{box-shadow:0 0 14px 5px rgba(17,72,235,.5)}",""]),t.exports=r}}]);