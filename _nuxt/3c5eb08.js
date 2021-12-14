(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1234:function(t,e,n){var content=n(1246);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(102).default)("cba8df8e",content,!0,{sourceMap:!1})},1235:function(t,e,n){"use strict";var r=n(1253),c=n.n(r),o={name:"InstructionsModal",props:{campaign:{type:Object,required:!0,default:function(){return{}}},info:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1},functional:{type:Boolean,required:!1,default:!0},readonly:{type:Boolean,required:!1,default:!1}},data:function(){return{tac:!1}},computed:{showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}},methods:{onCancel:function(){this.functional&&(this.showModal=!1)},onClick:function(){this.functional&&this.$parent.joinCampaign()},sanitizeHtmlCustom:function(t){return c()(t,{allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","iframe","img","span","label"],allowedAttributes:{a:["href","name","target","class"],img:["src","alt"],iframe:["src"],"*":["style"]}})}}},l=n(32),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.campaign&&t.info?n("div",{staticClass:"modal",class:{"is-active":t.showModal},style:{position:t.functional?"fixed":"relative",padding:t.functional?"initial":"10px"}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n        "+t._s(t.info.title)+"\n      ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close",disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.campaign&&t.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.sanitizeHtmlCustom(t.$md.render(t.info.instructions)))}}):n("p",[t._v("\n        ...\n      ")]),t._v(" "),n("label",{staticClass:"checkbox"},[t.readonly?n("input",{attrs:{checked:"",type:"checkbox",disabled:""}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.tac,expression:"tac"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tac)?t._i(t.tac,null)>-1:t.tac},on:{change:function(e){var n=t.tac,r=e.target,c=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.tac=n.concat([null])):o>-1&&(t.tac=n.slice(0,o).concat(n.slice(o+1)))}else t.tac=c}}}),t._v("\n        I agree to the "),n("a",{attrs:{href:"#"}},[t._v("terms and conditions")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[t.readonly?n("button",{staticClass:"button is-primary",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        OK\n      ")]):[n("button",{staticClass:"button is-primary",attrs:{disabled:!(t.tac&&t.campaign&&t.info&&t.functional)},on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n          Join Campaign\n        ")]),t._v(" "),n("button",{staticClass:"button",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n          Cancel\n        ")])]],2)])]):t._e()}),[],!1,null,"5257eca7",null);e.a=component.exports},1242:function(t,e){},1243:function(t,e){},1245:function(t,e,n){"use strict";n(1234)},1246:function(t,e,n){var r=n(101)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".template-wrapper[data-v-2bb6d93f]{width:100%;padding:5px}#mediaFrame[data-v-2bb6d93f]{width:100%;border:none;border-radius:14px}",""]),t.exports=r},1249:function(t,e,n){"use strict";n(24),n(66);var r={props:{html:{type:String,default:null}},data:function(){return{loading:!0}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},c=(n(1245),n(32)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"template-wrapper"},[t.loading?n("div",[t._v("\n    Loading..\n  ")]):t._e(),t._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",srcdoc:t.html,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}})])}),[],!1,null,"2bb6d93f",null);e.a=component.exports},1250:function(t,e){},1251:function(t,e){},1256:function(t,e){},1258:function(t,e,n){"use strict";n(85),n(24),n(77),n(88),n(67),n(51),n(50),n(86),n(89),n(66);var r=n(3);n(40);function c(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){d=!0,c=t},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw c}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var l=n(371),d={props:{batch:{type:Object,default:null}},data:function(){return{loading:!1,error:null}},mounted:function(){this.makeReservation()},methods:{makeReservation:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,c,o,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,e.next=4,t.$blockchain.getReservations();case 4:return n=e.sent,e.next=7,t.getReservationForUser(n);case 7:if(c=e.sent){e.next=15;break}return e.next=11,t.$blockchain.reserveTask(t.batch.id,t.batch.campaign_id,t.batch.tasks_done,t.batch.tasks);case 11:return o=e.sent,t.$store.dispatch("transaction/addTransaction",o),e.next=15,l(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$blockchain.getReservations();case 2:return n=e.sent,e.next=5,t.getReservationForUser(n);case 5:if(c=e.sent){e.next=8;break}throw new Error("Reservation not found");case 8:case"end":return e.stop()}}),e)}))),{retries:5,onRetry:function(t,e){console.log("attempt",e,t)}});case 15:if(!c){e.next=22;break}return e.next=18,t.$blockchain.getTaskIndexFromLeaf(t.batch.campaign_id,t.batch.id,c.leaf_hash,t.batch.tasks);case 18:d=e.sent,t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id+"/"+d+"?submissionId="+c.id),e.next=23;break;case 22:t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id);case 23:t.loading=!1,e.next=30;break;case 26:e.prev=26,e.t0=e.catch(0),t.loading=!1,t.$blockchain.handleError(e.t0);case 30:case"end":return e.stop()}}),e,null,[[0,26]])})))()},getReservationForUser:function(t){var e,n,r=c(t.rows);try{for(r.s();!(n=r.n()).done;){var o=n.value;if(!(o.account_id!==this.$auth.user.vAccountRows[0].id||parseInt(this.batch.batch_id)!==parseInt(o.batch_id)||o.data&&o.data.length)){e=o;break}}}catch(t){r.e(t)}finally{r.f()}return e}}},m=n(32),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),t._v(" "),n("br"),t._v("Making reservation...\n  ")]):t._e()])}),[],!1,null,null,null);e.a=component.exports},1298:function(t,e,n){var content=n(1352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(102).default)("dfc241e4",content,!0,{sourceMap:!1})},1351:function(t,e,n){"use strict";n(1298)},1352:function(t,e,n){var r=n(101)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".box-title[data-v-57c3a2f1]{text-align:center;border-bottom:2px solid #cdd4e6;padding-bottom:31px;margin:10px 0 15px}.progress[data-v-57c3a2f1]::-webkit-progress-value{-webkit-transition:width .5s ease;transition:width .5s ease}",""]),t.exports=r},1396:function(t,e,n){"use strict";n.r(e);n(104),n(50),n(74),n(114),n(75),n(115),n(85),n(77),n(88),n(67),n(51),n(86),n(89),n(66);var r=n(3),c=n(43),o=(n(40),n(216),n(24),n(183)),l=n(157),d=n(1249),m=n(1258),v=n(1235);function f(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return o=t.done,t},e:function(t){l=!0,c=t},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw c}}}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function k(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y={components:{TemplateMedia:d.a,ReserveTask:m.a,InstructionsModal:v.a},middleware:["auth"],data:function(){return{ipfsExplorer:"https://ipfs.effect.ai",id:parseInt(this.$route.params.id),campaign:void 0,accountId:this.$auth.user.vAccountRows[0].id,body:"description",userJoined:null,loading:!1,joinCampaignPopup:!1,showReserveTask:!1,reserveInBatch:null,userReservation:null}},computed:k(k(k({},Object(o.b)({batchByCampaignId:"campaign/batchByCampaignId"})),Object(o.c)({batches:function(t){return t.campaign.batches},campaigns:function(t){return t.campaign.campaigns},campaignLoading:function(t){return t.campaign.loading},batchesLoading:function(t){return!t.campaign.batches||t.campaign.batches.loading}})),{},{campaignBatches:function(){return this.batchByCampaignId(this.id)}}),mounted:function(){},created:function(){this.checkUserCampaign(),this.getCampaign(),this.getBatches()},methods:{reserveTask:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.campaignBatches.find((function(b){return b.num_tasks-b.tasks_done>0})),e.next=3,t.$store.dispatch("campaign/getBatchTasks",n);case 3:if(n){e.next=6;break}return alert("Could not find batch with active tasks"),e.abrupt("return");case 6:t.reserveInBatch=n,t.showReserveTask=!0;case 8:case"end":return e.stop()}}),e)})))()},goToTask:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.campaignBatches.find((function(b){return parseInt(b.batch_id)===parseInt(t.userReservation.batch_id)})),e.next=3,t.$store.dispatch("campaign/getBatchTasks",n);case 3:t.reserveInBatch=n,t.showReserveTask=!0;case 5:case"end":return e.stop()}}),e)})))()},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new l.Template(template,t,e).render()},campaignModalChange:function(t){this.joinCampaignPopup=t},joinCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$blockchain.joinCampaign(t.id);case 3:if(data=e.sent,t.$store.dispatch("transaction/addTransaction",data),!data){e.next=13;break}return t.loading=!0,t.joinCampaignPopup=!1,e.next=10,t.$blockchain.waitForTransaction(data.transaction_id);case 10:return e.next=12,t.checkUserCampaign();case 12:t.userJoined&&t.reserveTask();case 13:t.joinCampaignPopup=!1,e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),t.$blockchain.handleError(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))()},getBatches:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,c,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatches");case 2:n=f(t.campaignBatches),e.prev=3,n.s();case 5:if((r=n.n()).done){e.next=13;break}return c=r.value,e.next=9,t.$blockchain.getTaskReservationsForBatch(c.batch_id);case 9:o=e.sent,t.userReservation=o.find((function(e){return e.account_id===t.$auth.user.vAccountRows[0].id}));case 11:e.next=5;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(3),n.e(e.t0);case 18:return e.prev=18,n.f(),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[3,15,18,21]])})))()},checkUserCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$blockchain.getCampaignJoins(t.id);case 4:data=e.sent,t.userJoined=data.rows.length>0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$blockchain.handleError(e.t0);case 11:t.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},submitTask:function(t){console.log("Task submitted!",t)},getCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.id);case 2:t.campaign=t.campaigns.find((function(e){return e.id===t.id}));case 3:case"end":return e.stop()}}),e)})))()}}},C=y,w=(n(1351),n(32)),component=Object(w.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-max-widescreen"},[t.campaign&&t.campaign.info?n("instructions-modal",{attrs:{show:t.joinCampaignPopup,campaign:t.campaign,info:t.campaign.info},on:{clicked:t.campaignModalChange}}):t._e(),t._v(" "),t.showReserveTask?n("reserve-task",{attrs:{batch:t.reserveInBatch}}):t._e(),t._v(" "),n("div",{staticClass:"container"},[n("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[n("ul",[n("li",[n("nuxt-link",{attrs:{to:"/"}},[t._v("\n            Campaigns\n          ")])],1),t._v(" "),n("li",{staticClass:"is-active"},[n("nuxt-link",{attrs:{to:"/campaigns/"+t.id,"aria-current":"page"}},[t._v("\n            Campaign "+t._s(t.id)+"\n          ")])],1)])]),t._v(" "),t.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),t._v(" "),n("br"),t._v("Waiting for the transaction to complete...\n    ")]):t._e(),t._v(" "),t.campaignLoading?n("div",[t._v("\n      Campaign loading..\n    ")]):t.campaign?n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-two-thirds"},[n("div",{staticClass:"title"},[n("span",[t._v("#"+t._s(t.id)+": ")]),t._v(" "),t.campaign.info?n("span",[t._v(t._s(t.campaign.info.title))]):null!==t.campaign.info?n("span",[t._v("Loading..")]):n("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")])]),t._v(" "),n("div",{staticClass:"tabs"},[n("ul",[n("li",{class:{"is-active":"description"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="description"}}},[t._v("Batches")])]),t._v(" "),n("li",{class:{"is-active":"instruction"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="instruction"}}},[t._v("Instructions")])])])]),t._v(" "),"description"===t.body?n("div",{staticClass:"block"},[t.campaign.info?n("p",[t._v("\n            "+t._s(t.campaign.info.description)+"\n          ")]):n("p",[t._v("\n            ...\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle mt-5"},[t._v("\n            Task Preview\n          ")]),t._v(" "),t.campaign&&t.campaign.info?n("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.campaign.info.example_task||{})},on:{submit:t.submitTask}}):t._e(),t._v(" "),n("div",{staticClass:"mt-5"},[t.$auth.user.accountName===t.campaign.owner[1]?n("nuxt-link",{staticClass:"button is-primary is-pulled-right",attrs:{to:"/campaigns/"+t.id+"/new"}},[n("span",{staticClass:"icon"},[t._v("\n                +\n              ")]),t._v(" "),n("span",[t._v("Create Batch")])]):t._e(),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"block mt-5"},[t._l(t.campaignBatches,(function(e){return n("nuxt-link",{key:e.id,staticClass:"box p-4",class:{"is-disabled":!1},attrs:{to:"/campaigns/"+e.campaign_id+"/"+e.batch_id}},[n("div",{staticClass:"columns is-vcentered is-multiline is-mobile"},[n("div",{staticClass:"column"},[n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                      Batch\n                    ")]),t._v(" "),n("h2",{staticClass:"subtitle is-6 has-text-weight-semibold mb-0"},[t._v("\n                      #"),t.campaign?n("span",[t._v(t._s(t.campaign.id)+".")]):t._e(),t._v(t._s(e.id)+"\n                    ")])]),t._v(" "),n("div",{staticClass:"column"},[e.num_tasks-e.tasks_done!=0||e.reservations.length?n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                      Tasks "),n("small",[t._v("("),n("b",[t._v(t._s(e.num_tasks-e.tasks_done)+" / "+t._s(e.num_tasks))]),t._v(" left)")])]):n("p",{staticClass:"has-text-grey is-size-7"},[t._v("\n                      Tasks "),n("small",[t._v("("),n("b",{staticClass:"has-text-success"},[t._v("Done")]),t._v(")")])]),t._v(" "),n("progress",{staticClass:"progress is-small mt-2",class:{"is-success":!!e&&(e.tasks_done===e.num_tasks&&!e.reservations.length)},attrs:{max:e.num_tasks},domProps:{value:e.tasks_done}})])])])})),t._v(" "),t.batchesLoading?n("div",[t._v("\n                Batches loading..\n              ")]):t.batches&&!t.batches.length?n("div",[t._v("\n                No batches\n              ")]):t.batches?t._e():n("div",[t._v("\n                Could not retrieve batches\n              ")])],2)],1)],1):t._e(),t._v(" "),"instruction"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.$md.render(t.campaign.info.instructions))}}):n("p",[t._v("\n            ...\n          ")])]):t._e()]),t._v(" "),n("div",{staticClass:"column is-one-third"},[n("div",{staticClass:"box"},[t._m(1),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Requester")]),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"blockchain-address"},[n("nuxt-link",{attrs:{to:"/profile/"+t.campaign.owner[1]}},[t._v("\n                "+t._s(t.campaign.owner[1])+"\n              ")])],1)]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Reward")]),t._v(" "),n("br"),t._v(" "),n("span",[t._v(t._s(t.campaign.reward.quantity))])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Batches")]),t._v(" "),n("br"),t._v(" "),null===t.campaignBatches?n("span",[t._v("Loading..")]):n("span",[t._v(t._s(t.campaignBatches.length))])]),t._v(" "),t.campaign.info?n("div",{staticClass:"block"},[n("b",[t._v("Category")]),t._v(" "),n("br"),t._v(" "),t.campaign.info&&t.campaign.info.category?n("span",{staticClass:"tag is-light is-medium",class:{"is-secondary":"translation"===t.campaign.info.category,"is-info":"image_classification"===t.campaign.info.category,"is-warning":"text_classification"===t.campaign.info.category,"is-danger":"video_classification"===t.campaign.info.category}},[t._v(t._s(t.campaign.info.category))]):n("span",{staticClass:"tag is-info is-light is-medium"},[t._v("...")])]):t._e(),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("IPFS")]),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"blockchain-address"},[n("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.campaign.content.field_1}},[t._v(t._s(t.campaign.content.field_1))])])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Blockchain")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{target:"_blank",href:t.$blockchain.eos.explorer+"/account/"+t.$blockchain.sdk.force.config.force_contract+"?loadContract=true&tab=Tables&table=campaign&account="+t.$blockchain.sdk.force.config.force_contract+"&scope="+t.$blockchain.sdk.force.config.force_contract+"&limit=1&lower_bound="+t.id+"&upper_bound="+t.id}},[t._v("View Campaign on Explorer")])]),t._v(" "),n("div",{staticClass:"block"},[t.$auth.user.accountName===t.campaign.owner[1]?n("nuxt-link",{staticClass:"button is-primary is-light",attrs:{to:"/campaigns/"+t.id+"/edit"}},[t._v("\n              Edit Campaign\n            ")]):t._e(),t._v(" "),t.loading||null===t.userReservation||null===t.campaignBatches?n("button",{staticClass:"button is-primary is-loading"},[t._v("\n              Loading\n            ")]):!1===t.userJoined?n("button",{staticClass:"button is-primary",on:{click:function(e){e.preventDefault(),t.joinCampaignPopup=!0}}},[t._v("\n              Join Campaign\n            ")]):t.campaignBatches.reduce((function(a,b){return a+b.num_tasks}),0)-t.campaignBatches.reduce((function(a,b){return a+b.tasks_done}),0)>0&&!t.userReservation?n("button",{staticClass:"button is-primary",on:{click:function(e){return e.preventDefault(),t.reserveTask.apply(null,arguments)}}},[t._v("\n              Make Task Reservation\n            ")]):t.userReservation?n("button",{staticClass:"button is-accent has-text-weight-semibold",on:{click:function(e){return e.preventDefault(),t.goToTask.apply(null,arguments)}}},[t._v("\n              Go To Task\n            ")]):[t.userJoined?n("button",{staticClass:"button is-primary",attrs:{disabled:!0}},[t._v("\n                Joined Campaign\n              ")]):t._e(),t._v(" "),n("p",[t._v("No active tasks currently")])]],2)])])]):n("div",[t._v("\n      Could not retrieve campaign\n    ")])])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",{staticClass:"is-size-4"},[n("b",[t._v("Batches")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",{staticClass:"box-title is-size-4"},[n("b",[t._v("Information")])])}],!1,null,"57c3a2f1",null);e.default=component.exports}}]);