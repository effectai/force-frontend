(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1306:function(t,e,n){"use strict";var o={props:["page","perPage","items"],computed:{maxPage:function(){return Math.ceil(this.items/this.perPage)}},watch:{items:function(){this.$emit("setPage",1)}}},r=n(25),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return t.items&&t.items>t.perPage?e("nav",{staticClass:"pagination",attrs:{role:"navigation","aria-label":"pagination"}},[e("span",{staticStyle:{"padding-left":"0.5em"}},[t._v(t._s((t.page-1)*t.perPage+1)+"-"+t._s(Math.min(t.page*t.perPage,t.items))+" of\n    "+t._s(t.items))]),t._v(" "),e("a",{staticClass:"pagination-previous",attrs:{disabled:1===t.page},on:{click:function(e){return t.$emit("setPage",t.page-1)}}},[t._v("Previous")]),t._v(" "),e("a",{staticClass:"pagination-next",attrs:{disabled:!t.maxPage||t.page===t.maxPage},on:{click:function(e){return t.$emit("setPage",t.page+1)}}},[t._v("Next page")]),t._v(" "),e("ul",{staticClass:"pagination-list has-margin-top-mobile"},[t.page>2?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",1)}}},[t._v("1")])]):t._e(),t._v(" "),t.page>3?e("li",[e("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.page>1?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.page-1)}}},[t._v(t._s(t.page-1))])]):t._e(),t._v(" "),e("li",[e("a",{staticClass:"pagination-link is-current",attrs:{"aria-current":"page"}},[t._v(t._s(t.page))])]),t._v(" "),t.page<t.maxPage?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.page+1)}}},[t._v("\n        "+t._s(t.page+1))])]):t._e(),t._v(" "),t.maxPage>t.page+2?e("li",[e("span",{staticClass:"pagination-ellipsis"},[t._v("…")])]):t._e(),t._v(" "),t.maxPage>t.page+1?e("li",[e("a",{staticClass:"pagination-link",on:{click:function(e){return t.$emit("setPage",t.maxPage)}}},[t._v(t._s(t.maxPage))])]):t._e()])]):t._e()}),[],!1,null,null,null);e.a=component.exports},1311:function(t,e,n){var map={"./effect-captions-icon.png":1312,"./effect-dao-icon.png":1313,"./effect-force-icon.png":628,"./effect-socials-icon.png":1314,"./effect-translate-icon.png":1315};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=1311},1312:function(t,e,n){t.exports=n.p+"img/effect-captions-icon.d32e1fd.png"},1313:function(t,e,n){t.exports=n.p+"img/effect-dao-icon.8a49264.png"},1314:function(t,e,n){t.exports=n.p+"img/effect-socials-icon.113948d.png"},1315:function(t,e,n){t.exports=n.p+"img/effect-translate-icon.a76baca.png"},1316:function(t,e,n){var content=n(1323);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("362702e3",content,!0,{sourceMap:!1})},1317:function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),"string"!=typeof(t=t&&t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},1318:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0iIzg0OEE5QSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMi40MjMiIGN5PSIyLjQyMzA2IiByPSIxLjYxNTM4IiBmaWxsPSIjODQ4QTlBIi8+CjxyZWN0IHg9IjUuNjUzMzIiIHk9IjEuNjE1MzYiIHdpZHRoPSIxNC41Mzg1IiBoZWlnaHQ9IjEuNjE1MzgiIHJ4PSIwLjgwNzY5MiIgZmlsbD0iIzg0OEE5QSIvPgo8ZWxsaXBzZSBjeD0iMi40MjMiIGN5PSI4LjA3NjkzIiByeD0iMS42MTUzOCIgcnk9IjEuNjE1MzgiIGZpbGw9IiM4NDhBOUEiLz4KPHJlY3QgeD0iNS42NTMzMiIgeT0iNy4yNjkyMyIgd2lkdGg9IjE0LjUzODUiIGhlaWdodD0iMS42MTUzOSIgcng9IjAuODA3NjkzIiBmaWxsPSIjODQ4QTlBIi8+CjxlbGxpcHNlIGN4PSIyLjQyMyIgY3k9IjEzLjczMDgiIHJ4PSIxLjYxNTM4IiByeT0iMS42MTUzOCIgZmlsbD0iIzg0OEE5QSIvPgo8cmVjdCB4PSI1LjY1MzMyIiB5PSIxMi45MjMxIiB3aWR0aD0iMTQuNTM4NSIgaGVpZ2h0PSIxLjYxNTM4IiByeD0iMC44MDc2OTIiIGZpbGw9IiMjODQ4QTlBIi8+CjxlbGxpcHNlIGN4PSIyLjQyMyIgY3k9IjE5LjM4NDYiIHJ4PSIxLjYxNTM4IiByeT0iMS42MTUzOCIgZmlsbD0iIzg0OEE5QSIvPgo8cmVjdCB4PSI1LjY1MzMyIiB5PSIxOC41NzY5IiB3aWR0aD0iMTQuNTM4NSIgaGVpZ2h0PSIxLjYxNTM4IiByeD0iMC44MDc2OTIiIGZpbGw9IiM4NDhBOUEiLz4KPC9zdmc+Cg=="},1321:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjkuNjkyMzEiIGhlaWdodD0iOS42OTIzMSIgcng9IjIiIGZpbGw9IiM4NDhBOUEiLz4KPHJlY3QgeT0iMTEuMzA3NyIgd2lkdGg9IjkuNjkyMzEiIGhlaWdodD0iOS42OTIzMSIgcng9IjIiIGZpbGw9IiM4NDhBOUEiLz4KPHJlY3QgeD0iMTEuMzA3NiIgd2lkdGg9IjkuNjkyMzEiIGhlaWdodD0iOS42OTIzMSIgcng9IjIiIGZpbGw9IiM4NDhBOUEiLz4KPHJlY3QgeD0iMTEuMzA3NiIgeT0iMTEuMzA3NyIgd2lkdGg9IjkuNjkyMzEiIGhlaWdodD0iOS42OTIzMSIgcng9IjIiIGZpbGw9IiM4NDhBOUEiLz4KPC9zdmc+Cg=="},1322:function(t,e,n){"use strict";n(1316)},1323:function(t,e,n){var o=n(67),r=n(1317),c=n(1318),l=o(!1);l.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]);var d=r(c);l.push([t.i,".title-section[data-v-6e22e427]{height:100%}.column[data-v-6e22e427]{flex-wrap:wrap;align-items:stretch}.box.is-disabled[data-v-6e22e427]{background-color:rgba(222,224,230,.5)}.box.is-disabled .column[data-v-6e22e427]:not(:last-child){opacity:.5}.box.has-reservation[data-v-6e22e427]{box-shadow:0 0 14px 5px rgba(17,72,235,.3)}.box .image img[data-v-6e22e427]{border:1px solid #d2d9eb}.card .card-image[data-v-6e22e427],.card .card-image figure[data-v-6e22e427],.card .card-image img[data-v-6e22e427],.card .card-image p[data-v-6e22e427]{height:75px!important}.card .card-image img[data-v-6e22e427]{width:100%;-o-object-fit:contain;object-fit:contain;border-radius:6px!important}.switch-button[data-v-6e22e427]{background:#d7dcee;border-radius:6px;overflow:hidden;width:80px;text-align:center;font-size:18px;letter-spacing:1px;color:#155fff;padding:4px 40px 4px 4px;position:relative}.switch-button[data-v-6e22e427]:before{content:url("+d+');position:absolute;top:9px;bottom:0;right:1px;width:40px;align-items:center;justify-content:center;z-index:3;pointer-events:none}.switch-button-checkbox[data-v-6e22e427]{cursor:pointer;position:absolute;top:0;left:0;bottom:0;width:100%;height:100%;opacity:0;z-index:2}.switch-button-checkbox:checked+.switch-button-label[data-v-6e22e427]:before{transform:translateX(36px);transition:transform .3s linear}.switch-button-checkbox+.switch-button-label[data-v-6e22e427]{position:relative;padding:1px 0;display:block;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}.switch-button-checkbox+.switch-button-label[data-v-6e22e427]:before{content:"";padding:1px 0;background:#f6f7ff;height:100%;width:100%;position:absolute;left:0;top:0;border-radius:6px;transform:translateX(0);transition:transform .3s}.switch-button-checkbox+.switch-button-label .switch-button-label-span[data-v-6e22e427]{position:relative;top:5px}.image[data-v-6e22e427]{max-height:90px}@media screen and (min-width:1024px){.column.is-1-desktop[data-v-6e22e427]{flex:none;width:8.33333337%;max-width:76px}}.grid[data-v-6e22e427]{text-align:center}@media screen and (max-width:1023px){.columns[data-v-6e22e427]{text-align:center}}',""]),t.exports=l},1328:function(t,e,n){"use strict";var o=n(26),r=(n(84),n(66),n(115),n(126),n(43),n(93),[function(){var t=this._self._c;return t("label",{staticClass:"switch-button-label",attrs:{for:""}},[t("span",{staticClass:"switch-button-label-span"},[t("img",{attrs:{height:"28px",src:n(1321)}})])])}]),c=(n(61),n(53),n(19),n(69),n(48),n(70),n(71));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"CampaignList",components:{Pagination:n(1306).a},props:["gridToggle","campaigns"],data:function(){return{page:this.$route.query.page||1,perPage:30,ipfsExplorer:this.$blockchain.sdk.config.ipfsNode,categories:["translate","captions","socials","dao"]}},computed:d(d(d({},Object(c.c)({batchesByCampaignId:"campaign/batchesByCampaignId"})),Object(c.d)({campaignsLoading:function(t){return t.campaign.loading},allCampaignsLoaded:function(t){return t.campaign.allCampaignsLoaded},allBatchesLoaded:function(t){return t.campaign.allBatchesLoaded},allSubmissionsLoaded:function(t){return t.campaign.allSubmissionsLoaded},advanced:function(t){return t.view.advanced}})),{},{list:{get:function(){return this.$store.state.view.grid},set:function(t){this.$store.commit("view/SET_GRID_LIST",t)}},grid:function(){return!this.list&&this.gridToggle},paginatedCampaigns:function(){var t=(this.page-1)*this.perPage;return this.campaigns?this.campaigns.slice(t,t+this.perPage):[]}}),created:function(){this.getForceInfo()},methods:{setPage:function(t){this.page=t},getForceInfo:function(){this.campaigns&&this.allCampaignsLoaded||this.$store.dispatch("campaign/getCampaigns"),this.allBatchesLoaded||this.$store.dispatch("campaign/getBatches"),this.allSubmissionsLoaded||this.$store.dispatch("campaign/getSubmissions")}}},v=(n(1322),n(25)),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"is-flex is-justify-content-space-between"},[e("div"),t._v(" "),t.gridToggle?e("div",{staticClass:"is-hidden-touch"},[e("div",{staticClass:"switch-button mb-1"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.list,expression:"list"}],staticClass:"switch-button-checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.list)?t._i(t.list,null)>-1:t.list},on:{change:function(e){var n=t.list,o=e.target,r=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&(t.list=n.concat([null])):c>-1&&(t.list=n.slice(0,c).concat(n.slice(c+1)))}else t.list=r}}}),t._v(" "),t._m(0)])]):t._e()]),t._v(" "),e("hr",{staticClass:"mt-1"}),t._v(" "),e("div",{staticClass:"columns is-multiline",class:{grid:t.grid}},t._l(t.paginatedCampaigns,(function(r){return e("div",{key:r.id,staticClass:"column is-one-third-tablet",class:{"is-one-fifth-desktop":t.grid,"is-12-desktop":!t.grid}},[e("nuxt-link",{staticClass:"box p-4",class:Object(o.a)({"is-disabled":null===r.info,"has-reservation":r.userHasReservation},"is-disabled",!1===r.joinable),attrs:{to:"/campaigns/"+r.id}},[e("div",{staticClass:"columns is-vcentered is-multiline"},[e("div",{staticClass:"column is-12-touch",class:{"is-1-desktop":!t.grid,"is-12-desktop":t.grid}},[e("p",{staticClass:"image has-radius is-vcentered has-background-image"},[r.info&&r.info.image?e("img",{attrs:{src:r.info.image.Hash?t.ipfsExplorer+"/ipfs/"+r.info.image.Hash:r.info.image}}):r.info&&r.info.category&&t.categories.includes(r.info.category)?e("img",{attrs:{src:n(1311)("./effect-".concat(r.info.category,"-icon.png"))}}):e("img",{attrs:{src:n(628),alt:"campaign title"}})])]),t._v(" "),e("div",{staticClass:"column",class:{"is-12":t.grid,"is-4-desktop is-4-widescreen is-12-touch":!t.grid}},[e("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[e("div",[r.info&&r.info.category?e("nuxt-link",{staticClass:"tag is-light mb-2 has-border is-capitalized",class:["is-"+r.info.category],attrs:{to:{path:"/",query:{category:r.info.category}}}},[t._v("\n                  "+t._s(r.info.category)+"\n                ")]):null!==r.info?e("span",{staticClass:"tag is-light mb-2"},[e("span",{staticClass:"loading-text"},[t._v("Loading")])]):t._e()],1),t._v(" "),r.info?e("span",[r.info.title?e("span",[t._v(t._s(r.info.title))]):e("i",[t._v("- Untitled -")])]):null!==r.info?e("span",{staticClass:"loading-text"},[t._v("Loading")]):e("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")])]),t._v(" "),e("div",{staticClass:"has-text-grey is-size-7"},[r.info?e("div",[r.info.description?e("div",{staticClass:"is-ellipsis"},[t._v("\n                  "+t._s(r.info.description)+"\n                ")]):e("i",[t._v("- no description -")])]):null!==r.info?e("div",[t._v("\n                ........\n              ")]):t._e()])]),t._v(" "),e("div",{staticClass:"column is-12",class:{"is-2-desktop":!t.grid}},[e("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n              Requester:\n            ")]),t._v(" "),e("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[e("nuxt-link",{attrs:{to:"/profile/"+r.owner[1]}},[e("span",{staticClass:"is-ellipsis"},[t._v(t._s(r.owner[1]))])])],1)]),t._v(" "),e("div",{staticClass:"column"},[e("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n              Reward:\n            ")]),t._v(" "),e("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n              "+t._s(r.reward.quantity)+"\n            ")])]),t._v(" "),r.num_tasks||r.tasks_done?e("div",{staticClass:"column"},[e("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n              Tasks:\n            ")]),t._v(" "),e("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[e("span",[t._v("\n                "+t._s(r.num_tasks-r.tasks_done)),t.advanced?e("span",[t._v("/"+t._s(r.num_tasks))]):t._e(),t._v(" left\n              ")])])]):t._e(),t._v(" "),e("div",{staticClass:"column has-text-right",class:{"is-12":t.grid}},[e("button",{staticClass:"button is-primary has-text-weight-semibold is-fullwidth",class:{"is-loading":void 0===r.info,"is-accent":null===r.info||r.userHasReservation,"is-outlined":null===r.info||!1===r.joinable,"is-wide":!t.grid},attrs:{disabled:!r||null===r.info}},[r.userHasReservation?e("span",[t._v("Go to Task")]):r.joinable?e("span",[t._v("Start")]):e("span",[t._v("View")])])])])])],1)})),0),t._v(" "),t.campaigns?e("pagination",{staticClass:"mt-2",attrs:{items:t.campaigns.length,page:t.page,"per-page":t.perPage},on:{setPage:t.setPage}}):t._e(),t._v(" "),t.campaignsLoading?e("div",{staticClass:"subtitle loading-text"},[t._v("\n    Campaigns loading\n  ")]):t.allBatchesLoaded?t.campaigns&&!t.campaigns.length?e("div",{staticClass:"subtitle"},[t._v("\n    No tasks\n  ")]):t.campaigns?t._e():e("div",{staticClass:"subtitle has-text-danger"},[t._v("\n    Could not retrieve campaigns\n  ")]):e("div",{staticClass:"loading-text"},[t._v("\n    Batches loading\n  ")])],1)}),r,!1,null,"6e22e427",null);e.a=component.exports},1364:function(t,e,n){var content=n(1422);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("b6b163f8",content,!0,{sourceMap:!1})},1365:function(t,e,n){var content=n(1424);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("2e4a3af0",content,!0,{sourceMap:!1})},1420:function(t,e,n){"use strict";var o=n(11),r=n(9),c=n(104),l=n(54),d=n(55),m=n(404),v=n(41),f=n(10),h=n(403),_=n(303),y=n(641),I=n(642),x=n(197),C=n(643),k=[],w=r(k.sort),j=r(k.push),M=f((function(){k.sort(void 0)})),S=f((function(){k.sort(null)})),P=_("sort"),O=!f((function(){if(x)return x<70;if(!(y&&y>3)){if(I)return!0;if(C)return C<603;var code,t,e,n,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)k.push({k:t+n,v:e})}for(k.sort((function(a,b){return b.v-a.v})),n=0;n<k.length;n++)t=k[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:M||!S||!P||!O},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(O)return void 0===t?w(e):w(e,t);var n,o,r=[],f=d(e);for(o=0;o<f;o++)o in e&&j(r,e[o]);for(h(r,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:v(e)>v(n)?1:-1}}(t)),n=d(r),o=0;o<n;)e[o]=r[o++];for(;o<f;)m(e,o++);return e}})},1421:function(t,e,n){"use strict";n(1364)},1422:function(t,e,n){var o=n(67)(!1);o.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),o.push([t.i,".select[data-v-72c60b26],.select select[data-v-72c60b26]{width:100%}",""]),t.exports=o},1423:function(t,e,n){"use strict";n(1365)},1424:function(t,e,n){var o=n(67)(!1);o.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),o.push([t.i,"@media screen and (max-width:769px){.is-pulled-right[data-v-fc3d6e3a]{float:none!important;margin-bottom:25px}}",""]),t.exports=o},1572:function(t,e,n){"use strict";n.r(e);n(84),n(66),n(61),n(69),n(48),n(70);var o=n(26),r=(n(53),n(19),n(103),n(51),n(400),n(115),n(126),n(43),n(93),n(1420),n(1337)),c=n.n(r),l=n(71),d=n(1328),m=(n(60),{name:"SortAndFilters",data:function(){return{selectSort:null,search:null,status:null,category:null,effect_dapps:{dao:{value:"dao",name:"DAO"},socials:{value:"socials",name:"Socials"},translate:{value:"translate",name:"Translate"},captions:{value:"captions",name:"Image Labeling"}},sort_options:{tasks_desc:{value:"num_tasks",name:"Number of Tasks (descending)",order:"desc"},tasks_asc:{value:"num_tasks",name:"Number of Tasks (ascending)",order:"asc"},reward:{value:"reward.quantity",name:"EFX Reward",order:"desc"},title_asc:{value:"info.title",name:"Title (ascending)",order:"asc"},title_desc:{value:"info.title",name:"Title (descending)",order:"desc"},id_asc:{value:"id",name:"ID (ascending)",order:"asc"},id_desc:{value:"id",name:"ID (descending)",order:"desc"}},statuses:{active:{value:"active",name:"Active"},ended:{value:"ended",name:"Ended"},notstarted:{value:"notstarted",name:"Not Started"}}}},methods:{onStatusFilter:function(t){this.$emit("status",t)},onCategoryFilter:function(t){this.$emit("category",t)},onSort:function(t){this.$emit("sorted",t)},onSearch:function(t){this.$emit("search",t.target.value)}}}),v=(n(1421),n(25)),f=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"columns is-align-items-center is-justify-content-space-between mt-3"},[e("div",{staticClass:"column"},[t._v("\n    Search\n    "),e("input",{staticClass:"input",attrs:{type:"text",placeholder:"Search campaign..."},on:{keyup:t.onSearch}})]),t._v(" "),e("div",{staticClass:"column"},[e("span",[t._v("Category")]),e("br"),t._v(" "),e("div",{staticClass:"select is-normal"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.category=e.target.multiple?n:n[0]},function(e){return t.onCategoryFilter(t.category.value)}]}},[e("option",{attrs:{value:"",selected:""}},[t._v("\n          -\n        ")]),t._v(" "),t._l(t.effect_dapps,(function(n){return e("option",{key:n.value,staticClass:"column",domProps:{value:n}},[t._v("\n          "+t._s(n.name)+"\n        ")])}))],2)])]),t._v(" "),e("div",{staticClass:"column"},[e("span",[t._v("Status")]),e("br"),t._v(" "),e("div",{staticClass:"select is-normal"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.status,expression:"status"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.status=e.target.multiple?n:n[0]},function(e){return t.onStatusFilter(t.status.value)}]}},[e("option",{attrs:{value:"",selected:""}},[t._v("\n          -\n        ")]),t._v(" "),t._l(t.statuses,(function(n){return e("option",{key:n.value,staticClass:"column",domProps:{value:n}},[t._v("\n          "+t._s(n.name)+"\n        ")])}))],2)])]),t._v(" "),e("div",{staticClass:"column"},[e("span",[t._v("Sort")]),e("br"),t._v(" "),e("div",{staticClass:"select is-normal"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.selectSort,expression:"selectSort"}],on:{change:[function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.selectSort=e.target.multiple?n:n[0]},function(e){return t.onSort(t.selectSort)}]}},[e("option",{attrs:{value:"",selected:""}},[t._v("\n          -\n        ")]),t._v(" "),t._l(t.sort_options,(function(n){return e("option",{key:n.name,staticClass:"column",domProps:{value:n}},[t._v("\n          "+t._s(n.name)+"\n        ")])}))],2)])])])}),[],!1,null,"72c60b26",null).exports;function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y={components:{CampaignList:d.a,SortFilters:f},middleware:["auth"],data:function(){return{filter:null,sort:null,myCampaigns:!1,search:null,status:null}},computed:_(_({},Object(l.c)({activeBatchesByCampaignId:"campaign/activeBatchesByCampaignId",campaignsByCategory:"campaign/campaignsByCategory",reservationsByAccountId:"campaign/reservationsByAccountId",getGridListState:"view/getGridListState"})),{},{filteredCampaigns:function(){var t,e=this,n=this.campaignsByCategory(this.filter);if(n){for(var i in t=n.map((function(t){return _({},t)})),t){var o=this.activeBatchesByCampaignId(t[i].id);t[i].batches=o,o&&(t[i].num_tasks=o.reduce((function(a,b){return a+b.num_tasks}),0),t[i].tasks_done=o.reduce((function(a,b){return a+b.real_tasks_done}),0))}if(t.reverse(),this.myCampaigns&&(t=t.filter((function(t){return t.owner[1]===e.$auth.user.accountName}))),null!==this.search&&(t=t.filter((function(t){return!(!t||!t.info)&&(t.info.title.toLowerCase().includes(e.search.toLowerCase())||t.info.description.toLowerCase().includes(e.search.toLowerCase()))}))),this.status)switch(this.status){case"active":t=t.filter((function(t){return t.num_tasks-t.real_tasks_done>0}));break;case"ended":t=t.filter((function(t){return t.num_tasks-t.real_tasks_done==0&&0!==t.num_tasks}));break;case"notstarted":t=t.filter((function(t){return t.num_tasks-t.real_tasks_done===t.num_tasks}))}this.sort&&(t=c.a.orderBy(t,[function(t){return"string"==typeof c.a.get(t,"".concat(e.sort.value))?c.a.get(t,"".concat(e.sort.value)).toLowerCase():c.a.get(t,"".concat(e.sort.value))}],[this.sort.order,"desc"]))}return t}}),created:function(){},methods:{onFilter:function(t){this.filter=t},onStatusFilter:function(t){this.status=t},onSort:function(t){this.sort=t},onSearch:function(input){this.search=input}}},I=(n(1423),Object(v.a)(y,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"section"},[e("div",{staticClass:"container"},[e("nuxt-link",{staticClass:"button is-primary is-pulled-right",attrs:{to:"/campaigns/templates"}},[e("span",{staticClass:"icon"},[t._v("\n        +\n      ")]),t._v(" "),e("span",[t._v("Create Task")])]),t._v(" "),e("nuxt-link",{staticClass:"button is-ghost is-pulled-right is-paddingless-mobile",attrs:{to:"/"}},[e("span",[t._v("Active Tasks")])]),t._v(" "),e("h1",{staticClass:"title has-text-weight-bold"},[t.myCampaigns?e("span",[t._v("My")]):e("span",[t._v("All")]),t._v(" Tasks\n    ")]),t._v(" "),e("label",{staticClass:"checkbox"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.myCampaigns,expression:"myCampaigns"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.myCampaigns)?t._i(t.myCampaigns,null)>-1:t.myCampaigns},on:{change:function(e){var n=t.myCampaigns,o=e.target,r=!!o.checked;if(Array.isArray(n)){var c=t._i(n,null);o.checked?c<0&&(t.myCampaigns=n.concat([null])):c>-1&&(t.myCampaigns=n.slice(0,c).concat(n.slice(c+1)))}else t.myCampaigns=r}}}),t._v("\n      Show only my tasks\n    ")]),t._v(" "),e("sort-filters",{on:{sorted:t.onSort,search:t.onSearch,category:t.onFilter,status:t.onStatusFilter}}),t._v(" "),e("campaign-list",{attrs:{campaigns:t.filteredCampaigns}})],1)])}),[],!1,null,"fc3d6e3a",null));e.default=I.exports}}]);