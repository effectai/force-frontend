(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1234:function(t,e,n){var content=n(1240);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(100).default)("3a8bdb0e",content,!0,{sourceMap:!1})},1239:function(t,e,n){"use strict";n(1234)},1240:function(t,e,n){var r=n(99)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".template-wrapper[data-v-1488eba8]{width:100%;padding:5px}#mediaFrame[data-v-1488eba8]{width:100%;border:none;border-radius:14px}",""]),t.exports=r},1242:function(t,e,n){"use strict";var r=n(1253),c=n.n(r),o={name:"InstructionsModal",props:{campaign:{type:Object,required:!0,default:function(){return{}}},info:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1},functional:{type:Boolean,required:!1,default:!0}},data:function(){return{tac:!1}},computed:{showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}},methods:{onCancel:function(){this.functional&&(this.showModal=!1)},onClick:function(){this.functional&&this.$parent.joinCampaign()},sanitizeHtmlCustom:function(t){return c()(t,{allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","iframe","img","span","label"],allowedAttributes:{a:["href","name","target","class"],img:["src","alt"],iframe:["src"],"*":["style"]}})}}},l=n(30),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.campaign&&t.info?n("div",{staticClass:"modal",class:{"is-active":t.showModal},style:{position:t.functional?"fixed":"relative",padding:t.functional?"initial":"10px"}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n        "+t._s(t.info.title)+"\n      ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close",disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.campaign&&t.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.sanitizeHtmlCustom(t.$md.render(t.info.instructions)))}}):n("p",[t._v("\n        ...\n      ")]),t._v(" "),n("label",{staticClass:"checkbox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.tac,expression:"tac"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tac)?t._i(t.tac,null)>-1:t.tac},on:{change:function(e){var n=t.tac,r=e.target,c=!!r.checked;if(Array.isArray(n)){var o=t._i(n,null);r.checked?o<0&&(t.tac=n.concat([null])):o>-1&&(t.tac=n.slice(0,o).concat(n.slice(o+1)))}else t.tac=c}}}),t._v("\n        I agree to the "),n("a",{attrs:{href:"#"}},[t._v("terms and conditions")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[n("button",{staticClass:"button is-primary",attrs:{disabled:!(t.tac&&t.campaign&&t.info&&t.functional)},on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n        Join Campaign\n      ")]),t._v(" "),n("button",{staticClass:"button",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        Cancel\n      ")])])])]):t._e()}),[],!1,null,"2c60a330",null);e.a=component.exports},1243:function(t,e,n){"use strict";n(24),n(72);var r={props:{html:{type:String,default:null}},data:function(){return{loading:!0}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values)}}}},c=(n(1239),n(30)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"template-wrapper"},[t.loading?n("div",[t._v("\n    Loading..\n  ")]):t._e(),t._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",srcdoc:t.html,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}})])}),[],!1,null,"1488eba8",null);e.a=component.exports},1244:function(t,e){},1245:function(t,e){},1249:function(t,e){},1250:function(t,e){},1252:function(t,e,n){"use strict";n(102),n(24),n(84),n(104),n(74),n(56),n(55),n(103),n(105),n(72);var r=n(4);n(37);function c(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){d=!0,c=t},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw c}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var l=n(591),d={props:{batch:{type:Object,default:null}},data:function(){return{loading:!1,error:null}},created:function(){this.makeReservation()},methods:{makeReservation:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,c,o,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,e.next=4,t.$blockchain.getReservations();case 4:if(n=e.sent,c=t.getReservationForUser(n)){e.next=15;break}return console.log("lets go"),e.next=10,t.$blockchain.reserveTask(t.batch.id,t.batch.campaign_id,t.batch.tasks_done,t.batch.tasks);case 10:return o=e.sent,console.log("resukt!!",o),t.$store.dispatch("transaction/addTransaction",o),e.next=15,l(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$blockchain.getReservations();case 2:if(n=e.sent,c=t.getReservationForUser(n)){e.next=6;break}throw new Error("Reservation not found");case 6:case"end":return e.stop()}}),e)}))),{retries:5,onRetry:function(t,e){console.log("attempt",e,t)}});case 15:if(!c){e.next=22;break}return e.next=18,t.$blockchain.getTaskIndexFromLeaf(c.leaf_hash,t.batch.tasks);case 18:d=e.sent,t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id+"/"+d+"?submissionId="+c.id),e.next=23;break;case 22:t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id);case 23:t.loading=!1,e.next=30;break;case 26:e.prev=26,e.t0=e.catch(0),t.loading=!1,t.$blockchain.handleError(e.t0);case 30:case"end":return e.stop()}}),e,null,[[0,26]])})))()},getReservationForUser:function(t){var e,n,r=c(t.rows);try{for(r.s();!(n=r.n()).done;){var o=n.value;if(!(o.account_id!==this.$auth.user.vAccountRows[0].id||parseInt(this.batch.batch_id)!==parseInt(o.batch_id)||o.data&&o.data.length)){e=o;break}}}catch(t){r.e(t)}finally{r.f()}return e}}},m=n(30),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),t._v(" "),n("br"),t._v("Making reservation...\n  ")]):t._e()])}),[],!1,null,null,null);e.a=component.exports},1257:function(t,e){},1300:function(t,e,n){var content=n(1378);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(100).default)("1413dd7e",content,!0,{sourceMap:!1})},1377:function(t,e,n){"use strict";n(1300)},1378:function(t,e,n){var r=n(99)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".box-title[data-v-39c6aa9a]{text-align:center;border-bottom:2px solid #cdd4e6;padding-bottom:31px;margin:10px 0 15px}.progress[data-v-39c6aa9a]::-webkit-progress-value{-webkit-transition:width .5s ease;transition:width .5s ease}",""]),t.exports=r},1391:function(t,e,n){"use strict";n.r(e);n(101),n(55),n(70),n(114),n(71),n(115);var r=n(4),c=n(43),o=(n(37),n(153),n(214),n(24),n(184)),l=n(156),d=n(1243),m=n(1252),v=n(1242);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h={components:{TemplateMedia:d.a,ReserveTask:m.a,InstructionsModal:v.a},middleware:["auth"],data:function(){return{ipfsExplorer:"https://ipfs.effect.ai",campaignId:parseInt(this.$route.params.id),batchId:parseInt(this.$route.params.batch),campaign:void 0,batch:void 0,body:"description",accountId:this.$auth.user.vAccountRows[0].id,userJoined:null,loading:!1,joinCampaignPopup:!1,reserveTask:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)({batches:function(t){return t.campaign.batches},campaigns:function(t){return t.campaign.campaigns},campaignLoading:function(t){return t.campaign.loading},batchLoading:function(t){return t.campaign.loadingBatch}})),mounted:function(){},created:function(){this.checkUserCampaign(),this.getBatch(),this.getCampaign()},methods:{campaignModalChange:function(t){this.joinCampaignPopup=t},joinCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$blockchain.joinCampaign(t.campaignId);case 3:data=e.sent,t.$store.dispatch("transaction/addTransaction",data),data&&(t.loading=!0,setTimeout(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.checkUserCampaign;case 2:t.userJoined&&(t.reserveTask=!0);case 3:case"end":return e.stop()}}),e)}))),1500)),t.joinCampaignPopup=!1,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$blockchain.handleError(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},checkUserCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$blockchain.getCampaignJoins(t.campaignId);case 4:data=e.sent,t.userJoined=data.rows.length>0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$blockchain.handleError(e.t0);case 11:t.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},submitTask:function(t){console.log("Task submitted!",t)},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new l.Template(template,t,e).render()},getBatch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatch",{batchId:t.batchId});case 2:t.batch=t.batches.find((function(b){return b.batch_id===t.batchId})),n=t.$blockchain.getTaskSubmissionsForBatch(t.batchId),console.log("batch submissions:",n);case 5:case"end":return e.stop()}}),e)})))()},getCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.campaignId);case 2:t.campaign=t.campaigns.find((function(e){return e.id===t.campaignId}));case 3:case"end":return e.stop()}}),e)})))()}}},_=h,k=(n(1377),n(30)),component=Object(k.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-max-widescreen"},[n("div",{staticClass:"container"},[n("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[n("ul",[n("li",[n("nuxt-link",{attrs:{to:"/"}},[t._v("\n            All Campaigns\n          ")])],1),t._v(" "),n("li",[n("nuxt-link",{attrs:{to:"/campaigns/"+t.campaignId}},[t._v("\n            Campaign "+t._s(t.campaignId)+"\n          ")])],1),t._v(" "),n("li",{staticClass:"is-active"},[t.batch?n("nuxt-link",{attrs:{to:"/campaigns/"+t.campaignId+"/"+t.batchId,"aria-current":"page"}},[t._v("\n            Batch "+t._s(t.batch.id)+"\n          ")]):t._e()],1)])]),t._v(" "),t.campaignLoading||t.batchLoading?n("div",[t._v("\n      Campaign loading..\n    ")]):t.campaign&&t.batch?t._e():n("div",[t._v("\n      Could not retrieve campaign\n    ")]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-two-thirds"},[n("div",{staticClass:"title"},[t.batch?n("span",[t._v("#"+t._s(t.campaignId)+"."+t._s(t.batch.id)+": ")]):t._e(),t._v(" "),t.campaign&&t.campaign.info?n("span",[t._v(t._s(t.campaign.info.title))]):t.campaign&&null===t.campaign.info?n("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")]):n("span",[t._v("Loading..")])]),t._v(" "),n("div",{staticClass:"tabs"},[n("ul",[n("li",{class:{"is-active":"description"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="description"}}},[t._v("Description")])]),t._v(" "),n("li",{class:{"is-active":"instruction"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="instruction"}}},[t._v("Instructions")])])])]),t._v(" "),"description"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("p",[t._v("\n            "+t._s(t.campaign.info.description)+"\n          ")]):n("p",[t._v("\n            ...\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle mt-5"},[t._v("\n            Task Preview\n          ")]),t._v(" "),t.campaign&&t.campaign.info?n("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.campaign.info.example_task||{})},on:{submit:t.submitTask}}):t._e()],1):t._e(),t._v(" "),"instruction"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.$md.render(t.campaign.info.instructions))}}):n("p",[t._v("\n            ...\n          ")])]):t._e()]),t._v(" "),n("div",{staticClass:"column is-one-third"},[n("div",{staticClass:"box"},[t._m(0),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Requester")]),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"blockchain-address"},[t.campaign?n("nuxt-link",{attrs:{to:"/profile/"+t.campaign.owner[1]}},[t._v("\n                "+t._s(t.campaign.owner[1])+"\n              ")]):n("span",[t._v(".....")])],1)]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Reward")]),t._v(" "),n("br"),t._v(" "),t.campaign?n("span",[t._v(t._s(t.campaign.reward.quantity))]):n("span",[t._v(".....")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Tasks")]),t._v(" "),n("br"),t._v(" "),t.batch&&t.batch.num_tasks-t.batch.tasks_done==0?[n("span",[t._v("Done.")])]:t.batch&&t.batch.num_tasks-t.batch.tasks_done>0?[n("span",[t._v(t._s(t.batch.num_tasks-t.batch.tasks_done))]),t._v(" "),n("span",[t._v("/ "+t._s(t.batch.num_tasks)+" left")])]:n("span",[t._v("...")]),t._v(" "),n("progress",{staticClass:"progress",class:{"is-success":!!t.batch&&t.batch.tasks_done===t.batch.num_tasks,"is-secondary":!!t.batch&&t.batch.tasks_done<t.batch.num_tasks},attrs:{max:t.batch?t.batch.num_tasks:void 0},domProps:{value:t.batch?t.batch.tasks_done:void 0}},[t._v("\n              Left\n            ")])],2),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Category")]),t._v(" "),n("br"),t._v(" "),t.campaign&&t.campaign.info?n("span",{staticClass:"tag is-info is-light is-medium"},[t._v(t._s(t.campaign.info.category))]):n("span",{staticClass:"tag is-info is-light is-medium"},[t._v("...")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("IPFS")]),t._v(" "),n("br"),t._v(" "),t.batch?n("div",{staticClass:"blockchain-address"},[n("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.batch.content.field_1}},[t._v(t._s(t.batch.content.field_1))])]):n("span",[t._v(".....")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Blockchain")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{target:"_blank",href:t.$blockchain.eos.explorer+"/account/"+t.$blockchain.sdk.force.config.force_contract+"?loadContract=true&tab=Tables&table=batch&account="+t.$blockchain.sdk.force.config.force_contract+"&scope="+t.$blockchain.sdk.force.config.force_contract+"&limit=1&lower_bound="+t.batchId+"&upper_bound="+t.batchId}},[t._v("View Batch on Explorer")])]),t._v(" "),n("div",{staticClass:"block"},[t.userJoined?t.batch?n("button",{staticClass:"button is-primary",on:{click:function(e){e.preventDefault(),t.reserveTask=!0}}},[t._v("\n              Make Task Reservation\n            ")]):t._e():n("button",{staticClass:"button is-primary",class:{"is-loading":!0===t.loading},on:{click:function(e){e.preventDefault(),t.joinCampaignPopup=!0}}},[t._v("\n              Join Campaign\n            ")])])])])]),t._v(" "),t.reserveTask?n("reserve-task",{attrs:{batch:t.batch}}):t._e(),t._v(" "),t.campaign&&t.campaign.info?n("instructions-modal",{attrs:{campaign:t.campaign,info:t.campaign.info,show:t.joinCampaignPopup},on:{clicked:t.campaignModalChange}}):t._e()],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",{staticClass:"box-title is-size-4"},[n("b",[t._v("Information")])])}],!1,null,"39c6aa9a",null);e.default=component.exports}}]);