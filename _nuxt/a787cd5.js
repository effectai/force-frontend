(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1255:function(t,e,n){t.exports=n.p+"img/effect-force-icon.828a6c5.png"},1257:function(t,e,n){"use strict";var c=n(17),r=n(6),o=n(12),l=n(90),d=n(605),m=n(604),f=n(14),v=r.RangeError,h=r.String,_=Math.floor,k=o(m),C=o("".slice),w=o(1..toFixed),x=function(t,e,n){return 0===e?n:e%2==1?x(t,e-1,n*t):x(t*t,e/2,n)},y=function(data,t,e){for(var n=-1,c=e;++n<6;)c+=t*data[n],data[n]=c%1e7,c=_(c/1e7)},T=function(data,t){for(var e=6,n=0;--e>=0;)n+=data[e],data[e]=_(n/t),n=n%t*1e7},B=function(data){for(var t=6,s="";--t>=0;)if(""!==s||0===t||0!==data[t]){var e=h(data[t]);s=""===s?e:s+k("0",7-e.length)+e}return s};c({target:"Number",proto:!0,forced:f((function(){return"0.000"!==w(8e-5,3)||"1"!==w(.9,0)||"1.25"!==w(1.255,2)||"1000000000000000128"!==w(0xde0b6b3a7640080,0)}))||!f((function(){w({})}))},{toFixed:function(t){var e,n,c,r,o=d(this),m=l(t),data=[0,0,0,0,0,0],f="",_="0";if(m<0||m>20)throw v("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return h(o);if(o<0&&(f="-",o=-o),o>1e-21)if(n=(e=function(t){for(var e=0,n=t;n>=4096;)e+=12,n/=4096;for(;n>=2;)e+=1,n/=2;return e}(o*x(2,69,1))-69)<0?o*x(2,-e,1):o/x(2,e,1),n*=4503599627370496,(e=52-e)>0){for(y(data,0,n),c=m;c>=7;)y(data,1e7,0),c-=7;for(y(data,x(10,c,1),0),c=e-1;c>=23;)T(data,1<<23),c-=23;T(data,1<<c),y(data,1,1),T(data,2),_=B(data)}else y(data,0,n),y(data,1<<-e,0),_=B(data)+k("0",m);return _=m>0?f+((r=_.length)<=m?"0."+k("0",m-r)+_:C(_,0,r-m)+"."+C(_,r-m)):f+_}})},1261:function(t,e,n){var map={"./effect-captions-icon.png":1262,"./effect-dao-icon.png":1263,"./effect-force-icon.png":1255,"./effect-socials-icon.png":1264,"./effect-translate-icon.png":1265};function c(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}c.keys=function(){return Object.keys(map)},c.resolve=r,t.exports=c,c.id=1261},1262:function(t,e,n){t.exports=n.p+"img/effect-captions-icon.d32e1fd.png"},1263:function(t,e,n){t.exports=n.p+"img/effect-dao-icon.8a49264.png"},1264:function(t,e,n){t.exports=n.p+"img/effect-socials-icon.113948d.png"},1265:function(t,e,n){t.exports=n.p+"img/effect-translate-icon.a76baca.png"},1337:function(t,e,n){var content=n(1432);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("23ffed2e",content,!0,{sourceMap:!1})},1431:function(t,e,n){"use strict";n(1337)},1432:function(t,e,n){var c=n(57)(!1);c.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),c.push([t.i,".box-title[data-v-61e71cd8]{text-align:center;border-bottom:2px solid #cdd4e6;padding-bottom:31px;margin:10px 0 15px}.progress[data-v-61e71cd8]::-webkit-progress-value{-webkit-transition:width .5s ease;transition:width .5s ease}.tabs li[data-v-61e71cd8]{font-weight:500}.tabs li a[data-v-61e71cd8]{padding-left:35px;padding-right:35px}.tabs li.is-active a[data-v-61e71cd8]{border-bottom-width:2px;border-bottom-color:#1977f3;color:#151a1f;font-weight:600}.information-block[data-v-61e71cd8]{border:1px solid #e8eeff;border-radius:8px}.information-block .block[data-v-61e71cd8]{margin-bottom:10px}.information-block .information-header[data-v-61e71cd8]{background:#f7fbff}",""]),t.exports=c},1479:function(t,e,n){"use strict";n.r(e);n(88),n(50),n(79),n(107),n(59),n(108),n(89),n(71),n(93),n(70),n(51),n(91),n(94),n(69);var c=n(3),r=n(38),o=(n(33),n(185),n(25),n(1257),n(183)),l=n(95),d=n(1259),m=n(1301),f=n(375),v=n(1278),h={name:"BatchModal",props:{show:{type:Boolean,required:!1,default:!0}},data:function(){return{id:parseInt(this.$route.params.id)}},computed:{showModal:{get:function(){return this.show},set:function(){this.$emit("cancelled")}}},methods:{onCancel:function(){this.showModal=!1}}},_=n(23),k=Object(_.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal",class:{"is-active":t.showModal}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n        Add first tasks\n      ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close"},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),t._m(0),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[n("div",{staticClass:"buttons is-centered mx-auto"},[n("nuxt-link",{staticClass:"button is-primary",attrs:{to:"/campaigns/"+t.id+"/new"}},[n("span",{staticClass:"icon"},[t._v("\n            +\n          ")]),t._v(" "),n("span",[t._v("Add Tasks")])]),t._v(" "),n("button",{staticClass:"button",on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n          Cancel\n        ")])],1)])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"modal-card-body"},[n("div",{staticClass:"content"},[t._v("\n        It looks like you haven't added any tasks yet... Let's add some!\n      ")])])}],!1,null,null,null).exports;function C(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,c=function(){};return{s:c,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){l=!0,r=t},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw r}}}}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var T={components:{TemplateMedia:d.a,ReserveTask:m.a,InstructionsModal:v.a,BatchModal:k,SuccessModal:f.a},middleware:["auth"],data:function(){return{completed:parseInt(this.$route.query.completed),ipfsExplorer:this.$blockchain.sdk.config.ipfsNode,id:parseInt(this.$route.params.id),accountId:this.$auth.user.vAccountRows[0].id,body:"description",userJoined:null,loading:!1,joinCampaignPopup:!1,showReserveTask:!1,userReservation:null,cancelledBatchesPopup:!1,showBatchesPopup:!1,waitingOnTransaction:!1,categories:["translate","captions","socials","dao"]}},computed:y(y(y({},Object(o.b)({batchesByCampaignId:"campaign/batchesByCampaignId"})),Object(o.c)({campaigns:function(t){return t.campaign.campaigns},batchesLoading:function(t){return t.campaign.loadingBatch&&!t.campaign.allBatchesLoaded}})),{},{campaignBatches:function(){return this.batchesByCampaignId(this.id)},campaign:function(){var t=this;if(this.campaigns)return this.campaigns.find((function(e){return e.id===t.id}))}}),mounted:function(){this.completed&&(this.successTitle="Campaign is completed",this.successMessage="There are no more available tasks for you in this campaign")},created:function(){this.checkUserCampaign(),this.getCampaign(),this.getBatches()},methods:{reserveTask:function(){this.showReserveTask=!0},goToTask:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.campaignBatches.find((function(b){return parseInt(b.batch_id)===parseInt(t.userReservation.batch_id)})),e.next=3,t.$store.dispatch("campaign/getBatchTasks",n);case 3:t.reserveInBatch=n,t.showReserveTask=!0;case 5:case"end":return e.stop()}}),e)})))()},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new l.Template(template,t,e).render()},campaignModalChange:function(t){this.joinCampaignPopup=t},cancelBatchModal:function(){this.cancelledBatchesPopup=!0},joinCampaign:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,t.joinCampaignPopup=!1,e.next=5,t.$blockchain.joinCampaign(t.id);case 5:if(data=e.sent,t.$store.dispatch("transaction/addTransaction",data),!data){e.next=15;break}return t.loading=!0,t.waitingOnTransaction=!0,e.next=12,t.$blockchain.waitForTransaction(data);case 12:return e.next=14,t.checkUserCampaign();case 14:t.userJoined&&t.reserveTask();case 15:t.loading=!1,t.waitingOnTransaction=!1,t.joinCampaignPopup=!1,e.next=23;break;case 20:e.prev=20,e.t0=e.catch(0),t.$blockchain.handleError(e.t0);case 23:case"end":return e.stop()}}),e,null,[[0,20]])})))()},getBatches:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,c,r,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatches");case 2:t.campaignBatches.length||(t.userReservation=!1),n=C(t.campaignBatches),e.prev=4,n.s();case 6:if((c=n.n()).done){e.next=15;break}return r=c.value,e.next=10,t.$blockchain.getTaskReservationsForBatch(r.batch_id);case 10:o=e.sent,(l=o.find((function(e){return e.account_id===t.$auth.user.vAccountRows[0].id&&parseInt(new Date(new Date(e.submitted_on)+"UTC").getTime()/1e3)+parseInt(t.$blockchain.sdk.force.config.releaseTaskDelaySec.toFixed(0))>parseInt((Date.now()/1e3).toFixed(0))})))&&(t.userReservation=l);case 13:e.next=6;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(4),n.e(e.t0);case 20:return e.prev=20,n.f(),e.finish(20);case 23:0===t.campaignBatches.length&&(t.showBatchesPopup=!0);case 24:case"end":return e.stop()}}),e,null,[[4,17,20,23]])})))()},checkUserCampaign:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$blockchain.getCampaignJoins(t.id);case 4:data=e.sent,t.userJoined=data.rows.length>0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$blockchain.handleError(e.t0);case 11:t.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},submitTask:function(t){console.log("Task submitted!",t)},getCampaign:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.id);case 2:case"end":return e.stop()}}),e)})))()},getProgressBatch:function(t){switch(null==t?void 0:t.status){case"Completed":return"is-success";case"Active":return"is-info";case"Paused":return"is-warning"}}}},B=T,O=(n(1431),Object(_.a)(B,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("section",{staticClass:"section is-max-widescreen"},[t.campaign&&t.campaign.info?c("instructions-modal",{attrs:{show:t.joinCampaignPopup,campaign:t.campaign,info:t.campaign.info},on:{clicked:t.campaignModalChange}}):t._e(),t._v(" "),t.showReserveTask?c("reserve-task",{attrs:{"campaign-id":t.campaign.id}}):t._e(),t._v(" "),t.campaign&&t.campaignBatches?c("batch-modal",{attrs:{show:t.$auth.user.accountName===t.campaign.owner[1]&&t.showBatchesPopup&&!t.cancelledBatchesPopup},on:{cancelled:t.cancelBatchModal}}):t._e(),t._v(" "),c("div",{staticClass:"container"},[c("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[c("ul",[c("li",[c("nuxt-link",{attrs:{to:"/"}},[t._v("\n            Tasks\n          ")])],1),t._v(" "),c("li",{staticClass:"is-active"},[c("nuxt-link",{attrs:{to:"/campaigns/"+t.id,"aria-current":"page"}},[t._v("\n            Task "+t._s(t.id)+"\n          ")])],1)])]),t._v(" "),t.loading?c("div",{staticClass:"loader-wrapper is-active"},[c("img",{attrs:{src:n(374)}}),t._v(" "),c("br"),t._v(" "),t.waitingOnTransaction?c("span",{staticClass:"loading-text subtitle"},[t._v("Waiting for the transaction to complete")]):c("span",{staticClass:"loading-text subtitle"},[t._v("Please sign the transaction")])]):t._e(),t._v(" "),t.campaign?c("div",{staticClass:"columns"},[c("div",{staticClass:"column is-three-fifths"},[c("div",{staticClass:"is-flex is-align-items-center mb-6"},[t.campaign?c("p",{staticClass:"image has-radius mr-4",staticStyle:{width:"52px",height:"52px"}},[t.campaign.info&&t.campaign.info.image?c("img",{attrs:{src:t.campaign.info.image.Hash?t.ipfsExplorer+"/ipfs/"+t.campaign.info.image.Hash:t.campaign.info.image}}):t.campaign.info&&t.campaign.info.category&&t.categories.includes(t.campaign.info.category)?c("img",{attrs:{src:n(1261)("./effect-"+t.campaign.info.category+"-icon.png")}}):c("img",{attrs:{src:n(1255),alt:"campaign title"}})]):t._e(),t._v(" "),c("div",{staticClass:"title has-text-weight-bold"},[c("span",[t._v("#"+t._s(t.id)+" ")]),t._v(" "),t.campaign.info?c("span",[t._v(t._s(t.campaign.info.title))]):null!==t.campaign.info?c("span",{staticClass:"loading-text"},[t._v("Loading")]):c("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")])])]),t._v(" "),c("div",{staticClass:"tabs campaign-tabs"},[c("ul",[c("li",{class:{"is-active":"description"===t.body}},[c("a",{on:{click:function(e){e.preventDefault(),t.body="description"}}},[t._v("Tasks")])]),t._v(" "),c("li",{class:{"is-active":"instruction"===t.body}},[c("a",{on:{click:function(e){e.preventDefault(),t.body="instruction"}}},[t._v("Instructions")])]),t._v(" "),c("li",{class:{"is-active":"preview"===t.body}},[c("a",{on:{click:function(e){e.preventDefault(),t.body="preview"}}},[t._v("Preview")])])])]),t._v(" "),"description"===t.body?c("div",{staticClass:"block"},[t.campaign.info?c("p",[t._v("\n            "+t._s(t.campaign.info.description)+"\n          ")]):c("p",[t._v("\n            ...\n          ")]),t._v(" "),c("div",{staticClass:"mt-5"},[c("div",{staticClass:"is-flex is-justify-content-space-between is-align-items-center"},[c("h4",{staticClass:"is-size-6 mb-0 has-text-weight-bold"},[t._v("\n                Tasks\n              ")]),t._v(" "),t.$auth.user.accountName===t.campaign.owner[1]?c("nuxt-link",{staticClass:"button is-primary is-pulled-right no-float-mobile has-margin-bottom-mobile",attrs:{to:"/campaigns/"+t.id+"/new"}},[c("span",{staticClass:"icon"},[t._v("\n                  +\n                ")]),t._v(" "),c("span",[t._v("Add Tasks")])]):t._e()],1),t._v(" "),c("hr",{staticClass:"mt-2 mb-5"}),t._v(" "),c("div",{staticClass:"block mt-5"},[t.campaignBatches?c("div",t._l(t.campaignBatches.slice().reverse(),(function(e){return c("nuxt-link",{key:e.id,staticClass:"box p-4",class:{"is-disabled":!1},attrs:{to:"/campaigns/"+e.campaign_id+"/"+e.batch_id}},[c("div",{staticClass:"columns is-vcentered is-multiline is-mobile"},[c("div",{staticClass:"column"},[c("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                        Batch\n                      ")]),t._v(" "),c("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n                        #"),t.campaign?c("span",[t._v(t._s(t.campaign.id)+".")]):t._e(),t._v(t._s(e.id)+"\n                      ")])]),t._v(" "),c("div",{staticClass:"column"},[c("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                        Status\n                      ")]),t._v(" "),e?c("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n                        "+t._s(e.status)+"\n                      ")]):t._e()]),t._v(" "),c("div",{staticClass:"column"},[e.num_tasks-e.real_tasks_done==0?c("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                        "+t._s(e.real_tasks_done)+" Task"),e.real_tasks_done>1?c("span",[t._v("s")]):t._e(),t._v(" "),c("small",[t._v("("),c("b",{staticClass:"has-text-info"},[t._v("Done")]),t._v(")")])]):"Active"===e.status&&e.num_tasks-e.real_tasks_done>0?c("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                        Tasks "),c("small",[t._v("("),c("b",[t._v(t._s(e.num_tasks-e.real_tasks_done)+" / "+t._s(e.num_tasks))]),t._v(" left)")])]):"Paused"===e.status?c("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                        "+t._s(e.real_tasks_done)+" Task "),e.real_tasks_done>1?c("span",[t._v("s")]):t._e(),c("small",[c("b",[t._v("completed")])])]):t._e(),t._v(" "),c("progress",{staticClass:"progress is-small mt-2",class:t.getProgressBatch(e),attrs:{max:e.num_tasks},domProps:{value:e.real_tasks_done}})])])])})),1):t._e(),t._v(" "),t.batchesLoading?c("div",{staticClass:"loading-text"},[t._v("\n                Tasks loading\n              ")]):t.campaignBatches&&!t.campaignBatches.length?c("div",[t._v("\n                No tasks\n              ")]):t.campaignBatches?t._e():c("div",[t._v("\n                Could not retrieve batches\n              ")])])])]):t._e(),t._v(" "),"instruction"===t.body?c("div",{staticClass:"block"},[t.campaign&&t.campaign.info?c("div",{staticClass:"content",domProps:{innerHTML:t._s(t.$md.render(t.campaign.info.instructions))}}):c("p",[t._v("\n            ...\n          ")])]):t._e(),t._v(" "),"preview"===t.body?c("div",{staticClass:"block"},[t.campaign&&t.campaign.info?c("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.campaign.info.example_task||{})},on:{submit:t.submitTask}}):t._e()],1):t._e()]),t._v(" "),c("div",{staticClass:"column is-two-fifths"},[c("div",{staticClass:"information-block"},[t._m(0),t._v(" "),c("div",{staticClass:"columns p-5"},[c("div",{staticClass:"column is-half"},[t.campaign.info?c("div",{staticClass:"block"},[t.campaign.info&&t.campaign.info.category?c("nuxt-link",{staticClass:"tag is-light is-medium mb-5",class:{"is-dao":"dao"===t.campaign.info.category,"is-dao":"dao"===t.campaign.info.category,"is-socials":"socials"===t.campaign.info.category,"is-translate":"translate"===t.campaign.info.category,"is-captions":"captions"===t.campaign.info.category},attrs:{to:"/?category="+t.campaign.info.category}},[t._v("\n                  "+t._s(t.campaign.info.category)+"\n                ")]):c("span",{staticClass:"tag is-info is-light is-medium"},[t._v("...")])],1):t._e(),t._v(" "),c("div",{staticClass:"block mb-6"},[t._v("\n                Reward\n                "),c("br"),t._v(" "),c("b",[c("span",[t._v(t._s(t.campaign.reward.quantity))])])]),t._v(" "),c("div",{staticClass:"block"},[t.$auth.user.accountName===t.campaign.owner[1]?c("div",[c("nuxt-link",{staticClass:"button is-fullwidth is-primary is-light has-margin-bottom-mobile",attrs:{to:"/campaigns/"+t.id+"/edit"}},[t._v("\n                    Edit Task\n                  ")]),t._v(" "),c("br")],1):t._e(),t._v(" "),t.loading||null===t.campaignBatches?c("button",{staticClass:"button is-fullwidth is-primary is-loading"},[t._v("\n                  Loading\n                ")]):!1===t.userJoined?c("button",{staticClass:"button is-fullwidth is-primary",on:{click:function(e){e.preventDefault(),t.joinCampaignPopup=!0}}},[t._v("\n                  Qualify\n                ")]):t.campaignBatches.reduce((function(a,b){return a+b.num_tasks}),0)-t.campaignBatches.reduce((function(a,b){return a+b.real_tasks_done}),0)>0&&!t.userReservation?c("button",{staticClass:"button is-fullwidth is-primary",on:{click:function(e){return e.preventDefault(),t.reserveTask.apply(null,arguments)}}},[t._v("\n                  Make Task Reservation\n                ")]):t.userReservation?c("button",{staticClass:"button is-fullwidth is-accent has-text-weight-semibold",on:{click:function(e){return e.preventDefault(),t.goToTask.apply(null,arguments)}}},[t._v("\n                  Go To Task\n                ")]):[t.userJoined?c("button",{staticClass:"button is-fullwidth is-primary",attrs:{disabled:!0}},[t._v("\n                    Qualified for Task\n                  ")]):t._e(),t._v(" "),t._m(1)]],2)]),t._v(" "),c("div",{staticClass:"column is-half"},[c("div",{staticClass:"block"},[t._v("\n                Requester\n                "),c("br"),t._v(" "),c("div",{staticClass:"blockchain-address"},[c("nuxt-link",{attrs:{to:"/profile/"+t.campaign.owner[1]}},[t._v("\n                    "+t._s(t.campaign.owner[1])+"\n                  ")])],1)]),t._v(" "),c("div",{staticClass:"block"},[t._v("\n                IPFS\n                "),c("br"),t._v(" "),c("div",{staticClass:"blockchain-address"},[c("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.campaign.content.field_1}},[t._v(t._s(t.campaign.content.field_1))])])]),t._v(" "),c("div",{staticClass:"block"},[t._v("\n                Blockchain\n                "),c("br"),t._v(" "),c("a",{attrs:{target:"_blank",href:t.$blockchain.eos.explorer+"/account/"+t.$blockchain.sdk.force.config.forceContract+"?loadContract=true&tab=Tables&table=campaign&account="+t.$blockchain.sdk.force.config.forceContract+"&scope="+t.$blockchain.sdk.force.config.forceContract+"&limit=1&lower_bound="+t.id+"&upper_bound="+t.id}},[t._v("View in Explorer")])]),t._v(" "),c("div",{staticClass:"block"},[t._v("\n                Tasks\n                "),c("br"),t._v(" "),null===t.batchesByCampaignId(t.campaign.id)?c("span",{staticClass:"loading-text"},[t._v("\n                  Loading\n                ")]):c("span",[t._v("\n                  "+t._s(t.batchesByCampaignId(t.campaign.id).reduce((function(a,b){return a+b.num_tasks}),0)-t.batchesByCampaignId(t.campaign.id).reduce((function(a,b){return a+b.real_tasks_done}),0))+"/"+t._s(t.batchesByCampaignId(t.campaign.id).reduce((function(a,b){return a+b.num_tasks}),0))+" left\n                  "),c("br")])])])])])])]):c("div",{staticClass:"loading-text"},[t._v("\n      Task loading\n    ")])]),t._v(" "),t.completed&&t.successMessage?c("success-modal",{attrs:{message:t.successMessage,title:t.successTitle}}):t._e()],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"information-header has-text-centered"},[n("h4",{staticClass:"p-5 is-size-4"},[n("b",[t._v("Information")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"has-text-centered"},[n("i",[t._v("No active tasks currently")])])}],!1,null,"61e71cd8",null));e.default=O.exports}}]);