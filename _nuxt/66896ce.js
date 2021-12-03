(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1234:function(e,t,n){var content=n(1242);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(98).default)("49463a7a",content,!0,{sourceMap:!1})},1241:function(e,t,n){"use strict";n(1234)},1242:function(e,t,n){var r=n(97)(!1);r.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([e.i,".template-wrapper[data-v-225947fa]{width:100%;padding:5px}#mediaFrame[data-v-225947fa]{width:100%;border:none;border-radius:14px}",""]),e.exports=r},1246:function(e,t,n){"use strict";n(24),n(74);var r={props:{html:{type:String,default:null}},data:function(){return{loading:!0}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,this.$emit("templateLoaded")},sendKeyEvents:function(e){var t=document.getElementById("mediaFrame");t&&t.contentWindow.postMessage({task:"key",key:e.key},"*")},communicateWithIframe:function(e){var data=e.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values)}}}},o=(n(1241),n(32)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"template-wrapper"},[e.loading?n("div",[e._v("\n    Loading..\n  ")]):e._e(),e._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",srcdoc:e.html,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:e.mediaFrameLoaded}})])}),[],!1,null,"225947fa",null);t.a=component.exports},1254:function(e,t,n){"use strict";n(101),n(24),n(84),n(103),n(76),n(56),n(55),n(102),n(104),n(74);var r=n(4);n(40);function o(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,d=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return d=e.done,e},e:function(e){l=!0,o=e},f:function(){try{d||null==n.return||n.return()}finally{if(l)throw o}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d=n(590),l={props:{batch:{type:Object,default:null}},data:function(){return{loading:!1,error:null}},mounted:function(){this.makeReservation()},methods:{makeReservation:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,o,c,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,e.$blockchain.getReservations();case 4:return n=t.sent,t.next=7,e.getReservationForUser(n);case 7:if(o=t.sent){t.next=15;break}return t.next=11,e.$blockchain.reserveTask(e.batch.id,e.batch.campaign_id,e.batch.tasks_done,e.batch.tasks);case 11:return c=t.sent,e.$store.dispatch("transaction/addTransaction",c),t.next=15,d(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$blockchain.getReservations();case 2:return n=t.sent,t.next=5,e.getReservationForUser(n);case 5:if(o=t.sent){t.next=8;break}throw new Error("Reservation not found");case 8:case"end":return t.stop()}}),t)}))),{retries:5,onRetry:function(e,t){console.log("attempt",t,e)}});case 15:if(!o){t.next=22;break}return t.next=18,e.$blockchain.getTaskIndexFromLeaf(e.batch.campaign_id,e.batch.id,o.leaf_hash,e.batch.tasks);case 18:l=t.sent,e.$router.push("/campaigns/"+e.batch.campaign_id+"/"+e.batch.batch_id+"/"+l+"?submissionId="+o.id),t.next=23;break;case 22:e.$router.push("/campaigns/"+e.batch.campaign_id+"/"+e.batch.batch_id);case 23:e.loading=!1,t.next=30;break;case 26:t.prev=26,t.t0=t.catch(0),e.loading=!1,e.$blockchain.handleError(t.t0);case 30:case"end":return t.stop()}}),t,null,[[0,26]])})))()},getReservationForUser:function(e){var t,n,r=o(e.rows);try{for(r.s();!(n=r.n()).done;){var c=n.value;if(!(c.account_id!==this.$auth.user.vAccountRows[0].id||parseInt(this.batch.batch_id)!==parseInt(c.batch_id)||c.data&&c.data.length)){t=c;break}}}catch(e){r.e(e)}finally{r.f()}return t}}},m=n(32),component=Object(m.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[e.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),e._v(" "),n("br"),e._v("Making reservation...\n  ")]):e._e()])}),[],!1,null,null,null);t.a=component.exports},1391:function(e,t,n){"use strict";n.r(t);n(100),n(55),n(72),n(114),n(73),n(115);var r=n(4),o=n(43),c=(n(40),n(216),n(24),n(183)),d=n(156),l=n(1246),m=n(1254);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var f={components:{"template-media":l.a,"reserve-task":m.a},middleware:["auth"],data:function(){return{campaignId:parseInt(this.$route.params.id),batchId:parseInt(this.$route.params.batch),taskIndex:parseInt(this.$route.params.task),submissionId:parseInt(this.$route.query.submissionId),campaign:void 0,batch:void 0,task:void 0,reserveNextTask:!1,loading:!1}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.c)({batches:function(e){return e.campaign.batches},campaigns:function(e){return e.campaign.campaigns},campaignLoading:function(e){return e.campaign.loading},batchLoading:function(e){return e.campaign.loadingBatch}})),created:function(){this.getBatch(),this.getCampaign()},methods:{renderTemplate:function(template){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new d.Template(template,e,t).render()},getBatch:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("campaign/getBatch",{batchId:e.batchId});case 2:e.batch=e.batches.find((function(b){return b.batch_id===e.batchId})),e.task=e.batch.tasks[e.taskIndex];case 4:case"end":return t.stop()}}),t)})))()},getCampaign:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("campaign/getCampaign",e.campaignId);case 2:e.campaign=e.campaigns.find((function(t){return t.id===e.campaignId}));case 3:case"end":return t.stop()}}),t)})))()},submitTask:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,t.reserveNextTask=!1,n.next=4,t.$blockchain.submitTask(t.batch.batch_id,t.submissionId,JSON.stringify(e));case 4:return r=n.sent,n.next=7,t.$blockchain.waitForTransaction(r.transaction_id);case 7:return t.$store.dispatch("transaction/addTransaction",r),t.loading=!1,n.next=11,t.getBatch();case 11:t.batch.tasks_done===t.batch.num_tasks?t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id):t.reserveNextTask=!0;case 12:case"end":return n.stop()}}),n)})))()}}},v=f,w=n(32),component=Object(w.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section is-max-widescreen"},[n("div",{staticClass:"container"},[e.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),e._v(" "),n("br"),e._v("Waiting for the transaction to complete...\n    ")]):e._e(),e._v(" "),n("h2",{staticClass:"subtitle mt-5"},[e._v("\n      Task\n    ")]),e._v(" "),e.campaign&&e.campaign.info?n("template-media",{attrs:{html:e.renderTemplate(e.campaign.info.template||"No template found..",e.task)},on:{submit:e.submitTask}}):e._e(),e._v(" "),e.reserveNextTask?n("reserve-task",{attrs:{batch:e.batch}}):e._e()],1)])}),[],!1,null,null,null);t.default=component.exports}}]);