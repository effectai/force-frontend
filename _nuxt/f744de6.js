(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1061:function(t,e,n){var content=n(1064);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("9005a8ce",content,!0,{sourceMap:!1})},1063:function(t,e,n){"use strict";n(1061)},1064:function(t,e,n){var r=n(59)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".watermark[data-v-61f6e5ec]{background-color:rgba(0,0,0,.15);position:absolute;top:15em;left:0;height:-webkit-fill-available;width:60%;vertical-align:middle}.watermark>p[data-v-61f6e5ec]{transform:rotate(-45deg);font-size:9vw;color:rgba(0,0,0,.3)}.template-wrapper[data-v-61f6e5ec]{width:100%}#mediaFrame[data-v-61f6e5ec]{width:100%;border:none}@media(max-width:768px){.watermark[data-v-61f6e5ec]{width:-webkit-fill-available;top:20em;height:50%}.watermark>p[data-v-61f6e5ec]{transform:rotate(-45deg) translate(-22vh,42vw);font-size:17vw;color:rgba(0,0,0,.3)}}@media(max-width:540px){.watermark>p[data-v-61f6e5ec]{transform:rotate(-45deg) translate(-24vh,57vw);font-size:17vw;color:rgba(0,0,0,.3)}}@media(max-width:419px){.watermark[data-v-61f6e5ec]{top:21em}}",""]),t.exports=r},1066:function(t,e,n){"use strict";n(14),n(61);var r={props:{html:{type:String,default:null}},data:function(){return{alternativeFrontendUrl:"https://effectai.github.io/force-frontend",loading:!0,iframeLoaded:!1}},watch:{html:function(t){document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:t},"*")}},mounted:function(){document.getElementById("mediaFrame").addEventListener("load",this.frameIsLoaded),document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{frameIsLoaded:function(){this.iframeLoaded=!0},mediaFrameLoaded:function(){this.loading=!1,document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:this.html},"*"),this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},o=(n(1063),n(22)),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"template-wrapper"},[t.loading?e("div",{staticClass:"loading-text subtitle"},[t._v("\n    Loading\n  ")]):t._e(),t._v(" "),e("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",src:t.alternativeFrontendUrl+"/template",name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}}),t._v(" "),t.iframeLoaded?e("div",{staticClass:"watermark columns is-centered is-vcentered"},[e("p",[t._v("PREVIEW")])]):t._e()])}),[],!1,null,"61f6e5ec",null);e.a=component.exports},1075:function(t,e,n){"use strict";n(54),n(69),n(53),n(45),n(34),n(55),n(36),n(56),n(82),n(62),n(47),n(81),n(83),n(61);var r=n(19),o=(n(43),n(14),n(46)),c=n(1089),l=n.n(c);function d(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"InstructionsModal",props:{info:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1},functional:{type:Boolean,required:!1,default:!0},readonly:{type:Boolean,required:!1,default:!1},inclusiveQualifications:{type:Array,required:!1,default:function(){return[]}},exclusiveQualifications:{type:Array,required:!1,default:function(){return[]}}},data:function(){return{tac:!1,id:parseInt(this.$route.params.id),campaign:null,userQuali:[],accountId:this.$auth.user.vAccountRows[0].id}},computed:h(h(h({},Object(o.c)({campaignById:"campaign/campaignById",qualificationById:"qualification/qualificationById"})),Object(o.d)({allQualificationsLoaded:function(t){return t.qualification.allQualificationsLoaded}})),{},{exclQualis:function(){return this.exclusiveQualifications.filter((function(q){return!q.ishidden}))},showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}}),created:function(){this.campaign=this.campaignById(this.id)},methods:{userAssignedQuali:function(t){var e=this,n=[];if(0===this.assignedQuali.length)return[];var r,o=d(this.campaign.qualis);try{var c=function(){var o,c=r.value,l=e.qualificationById(c.key),d=e.assignedQuali.some((function(t){return console.log("checking in some",t,c.key),t.quali_id===c.key}));(console.log("UserHasQualiInclusive: ".concat(c)),c.value===t)&&n.push({name:null===(o=l.info)||void 0===o?void 0:o.name,code:c.key,userHasQuali:d})};for(o.s();!(r=o.n()).done;)c()}catch(t){o.e(t)}finally{o.f()}return n},onCancel:function(){this.functional&&(this.showModal=!1)},onClick:function(){this.functional&&this.$parent.reserveTask()},sanitizeHtmlCustom:function(t){return l()(t,{allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","iframe","img","span","label"],allowedAttributes:{a:["href","name","target","class"],img:["src","alt"],iframe:["src"],"*":["style"]}})}}},w=n(22),component=Object(w.a)(v,(function(){var t=this,e=t._self._c;return t.info?e("div",{staticClass:"modal",class:{"is-active":t.showModal},style:{position:t.functional?"fixed":"relative",padding:t.functional?"initial":"10px",zIndex:t.functional?"40":"1"}},[e("div",{staticClass:"modal-background"}),t._v(" "),e("div",{staticClass:"modal-card"},[e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[t._v("\n        "+t._s(t.info.title)+"\n      ")]),t._v(" "),e("button",{staticClass:"delete",attrs:{"aria-label":"close",disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),e("section",{staticClass:"modal-card-body"},[t.info?e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.sanitizeHtmlCustom(t.$md.render(t.info.instructions)))}}):e("p",[t._v("\n        ...\n      ")]),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"block is-vcentered"},[e("div",{staticClass:"is-size-4 has-text-centered"},[t._v("\n          Qualifications\n        ")]),t._v(" "),t.allQualificationsLoaded?e("div",[t._m(0),t._v(" "),t.inclusiveQualifications.length>0?e("div",{staticClass:"tags"},t._l(t.inclusiveQualifications,(function(n){var r;return e("span",{key:n.id,staticClass:"tag p-3 m-3",class:n.userHasQuali?"is-light is-success":"is-danger is-light",attrs:{"data-tooltip":n.userHasQuali?"Found: Ok":"Not Found: Required"}},[n.userHasQuali?e("span",[t._v("✅")]):e("span",[t._v("❌")]),t._v("\n               \n              "),e("nuxt-link",{attrs:{to:"/qualifications/".concat(n.id)}},[t._v(t._s(null===(r=n.info)||void 0===r?void 0:r.name))])],1)})),0):e("div",[t._v("\n            None\n          ")]),t._v(" "),e("br"),t._v(" "),t._m(1),t._v(" "),t.exclQualis.length>0?e("div",{staticClass:"tags"},t._l(t.exclQualis,(function(n){var r;return e("span",{key:n.code,staticClass:"tag p-3 m-3",class:n.userHasQuali?"is-light is-danger":"is-warning is-light",attrs:{"data-tooltip":n.userHasQuali?"Found: Excluded":"Not found: Ok"}},[n.userHasQuali?e("span",[t._v("❌")]):e("span",[t._v("✅")]),t._v("\n               \n              "),e("nuxt-link",{attrs:{to:"/qualifications/".concat(n.id)}},[t._v(t._s(null===(r=n.info)||void 0===r?void 0:r.name))])],1)})),0):e("div",[t._v("\n            None\n          ")])]):e("div",{staticClass:"loading-text has-text-centered"},[t._v("Loading")]),t._v(" "),e("br")]),t._v(" "),e("hr"),t._v(" "),e("label",{staticClass:"checkbox"},[t.readonly?e("input",{attrs:{checked:"",type:"checkbox",disabled:""}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.tac,expression:"tac"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tac)?t._i(t.tac,null)>-1:t.tac},on:{change:function(e){var n=t.tac,r=e.target,o=!!r.checked;if(Array.isArray(n)){var c=t._i(n,null);r.checked?c<0&&(t.tac=n.concat([null])):c>-1&&(t.tac=n.slice(0,c).concat(n.slice(c+1)))}else t.tac=o}}}),t._v("\n        I agree to the "),e("a",{attrs:{href:"/download/tac.pdf",target:"_blank"}},[t._v("terms and conditions")])])]),t._v(" "),e("footer",{staticClass:"modal-card-foot has-text-centered"},[t.readonly?e("button",{staticClass:"button is-primary",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        OK\n      ")]):[e("button",{staticClass:"button is-primary has-tooltip has-tooltip-arrow",attrs:{"data-tooltip":t.tac?"No additional\nqualifications needed":"Agree to the terms andconditions to enter the task.",disabled:!t.tac||!t.info||!t.functional},on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n          Enter Task\n        ")]),t._v(" "),e("button",{staticClass:"button",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n          Cancel\n        ")])]],2)])]):t._e()}),[function(){var t=this,e=t._self._c;return e("div",[t._v("Task Requirements "),e("i",[t._v("(You must have this qualification in order to enter the task.)")])])},function(){var t=this,e=t._self._c;return e("div",[t._v("Blocked Qualifications"),e("i",[t._v("(Having these qualifications will exclude you from this task.)")])])}],!1,null,"4182c04a",null);e.a=component.exports},1080:function(t,e){},1081:function(t,e){},1085:function(t,e){},1086:function(t,e){},1091:function(t,e){},1160:function(t,e,n){var content=n(1290);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("e9eb0a98",content,!0,{sourceMap:!1})},1288:function(t,e,n){t.exports=n.p+"img/instruction-icon.f0fc0a2.svg"},1289:function(t,e,n){"use strict";n(1160)},1290:function(t,e,n){var r=n(59)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".wrapper[data-v-004dc63b]{min-height:calc(100vh - 110px);display:flex;flex-direction:column}.wrapper section.template-section[data-v-004dc63b]{flex:1}",""]),t.exports=r},1303:function(t,e,n){"use strict";n.r(e);var r=[function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("img",{attrs:{src:n(1288)}})])}],o=(n(45),n(34),n(43),n(55),n(36),n(56),n(53),n(54),n(82),n(62),n(47),n(81),n(83),n(61),n(2)),c=n(19),l=(n(144),n(14),n(27),n(46)),d=n(71),m=n(1066),f=n(1075),h={name:"SubmittedTaskModal",props:{campaign:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1}},data:function(){return{}},computed:{showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}},methods:{onCancel:function(){this.showModal=!1,this.$router.push("/campaigns/"+this.campaign.id)},onClick:function(){this.$parent.reserveTask()}}},v=n(22),w=Object(v.a)(h,(function(){var t=this,e=t._self._c;return t.campaign?e("div",{staticClass:"modal",class:{"is-active":t.showModal}},[e("div",{staticClass:"modal-background"}),t._v(" "),e("div",{staticClass:"modal-card"},[t._m(0),t._v(" "),e("section",{staticClass:"modal-card-body"},[t._v("\n      Congratulations! You've earned "),e("b",[t._v(t._s(t.campaign.reward.quantity))]),t._v(" by submitting this task!"),e("br"),t._v("\n      Keep earning EFX by completing more tasks.\n    ")]),t._v(" "),e("footer",{staticClass:"modal-card-foot is-justify-content-space-between"},[e("button",{staticClass:"button",on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        Cancel\n      ")]),t._v(" "),e("button",{staticClass:"button is-primary is-pulled-right",on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n        Next Task ->\n      ")])])])]):t._e()}),[function(){var t=this._self._c;return t("header",{staticClass:"modal-card-head"},[t("p",{staticClass:"modal-card-title"},[this._v("\n        Task Submitted\n      ")])])}],!1,null,"4777a78e",null).exports;function y(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return k(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return k(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function k(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var I={components:{TemplateMedia:m.a,InstructionsModal:f.a,SubmittedTaskModal:w},middleware:["auth"],data:function(){return{campaignId:parseInt(this.$route.params.id),batchId:parseInt(this.$route.params.batch),submissionId:parseInt(this.$route.params.task),campaign:void 0,batch:void 0,task:void 0,loading:!1,loadingReservation:!1,showInstructionsModal:!1,showSubmittedTaskModal:!1,reserveInBatch:null,reservation:null,taskIndex:null}},computed:x(x(x({},Object(l.c)({submissionById:"campaign/submissionById",batchesByCampaignId:"campaign/batchesByCampaignId"})),Object(l.d)({batches:function(t){return t.campaign.batches},campaigns:function(t){return t.campaign.campaigns},campaignLoading:function(t){return t.campaign.loading},batchLoading:function(t){return t.campaign.loadingBatch}})),{},{campaignBatches:function(){return this.batchesByCampaignId(this.campaignId)}}),created:function(){this.getBatch(),this.getCampaign()},methods:{reserveNextTask:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loadingReservation=!0,n=[],e.next=4,t.$store.dispatch("campaign/getBatches");case 4:r=y(t.campaignBatches);try{for(r.s();!(o=r.n()).done;)(c=o.value).num_tasks*c.repetitions>c.tasks_done&&n.push(c)}catch(t){r.e(t)}finally{r.f()}return e.prev=6,e.next=9,t.$blockchain.makeReservation(n);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(6),t.$blockchain.handleError(e.t0);case 14:t.loadingReservation=!1;case 15:case"end":return e.stop()}}),e,null,[[6,11]])})))()},showInstructions:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.showInstructionsModal=t},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new d.Template(template,t,e,{accountId:this.$auth.user.vAccountRows[0].id,campaignId:this.campaignId,batchId:this.batchId,submissionId:this.submissionId}).render()},getBatch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatch",{batchId:t.batchId});case 2:return t.batch=t.batches.find((function(b){return b.batch_id===t.batchId})),e.next=5,t.getTask();case 5:case"end":return e.stop()}}),e)})))()},getTask:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getSubmission",t.submissionId);case 2:if(t.reservation=t.submissionById(t.submissionId),t.reservation&&t.reservation.account_id===t.$auth.user.vAccountRows[0].id){e.next=8;break}console.error("Reservation not found ⚠⚠⚠"),t.$router.push("/campaigns/"+t.campaignId),e.next=12;break;case 8:if(!t.reservation.data){e.next=12;break}return t.$blockchain.handleError("Task already submitted by you"),t.showSubmittedTaskModal=!0,e.abrupt("return");case 12:return e.next=14,t.$blockchain.getTaskIndexFromLeaf(t.batch.campaign_id,t.batch.id,t.reservation.leaf_hash,t.batch.tasks);case 14:t.taskIndex=e.sent,t.task=t.batch.tasks[t.taskIndex];case 16:case"end":return e.stop()}}),e)})))()},getCampaign:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.campaignId);case 2:t.campaign=t.campaigns.find((function(e){return e.id===t.campaignId}));case 3:case"end":return e.stop()}}),e)})))()},releaseTask:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$blockchain.releaseTask(t);case 3:data=n.sent,e.$store.dispatch("transaction/addTransaction",data),e.$router.push("/campaigns/"+e.batch.campaign_id+"/"+e.batch.batch_id),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),console.error(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()},reserveTask:function(){try{this.showSubmittedTaskModal=!1,this.reserveNextTask()}catch(t){throw this.loading=!1,new Error(t)}},submitTask:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e.loading=!0,n.next=4,e.$blockchain.submitTask(e.batch.batch_id,e.submissionId,JSON.stringify(t));case 4:return r=n.sent,n.next=7,e.$blockchain.waitForTransaction(r);case 7:try{e.campaign&&e.campaign.info&&e.campaign.info.webhook&&e.campaign.info.webhook.length>0&&fetch(e.campaign.info.webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({campaignId:e.campaign.id,batchId:e.batch.batch_id,batchNumber:e.batch.id,submissionId:e.submissionId,userId:e.$auth.user.vAccountRows[0].id,submission:t})}).then((function(t){return t.json()})).then((function(data){console.log("webhook success:",data)})).catch((function(t){console.error("webhook fail",t)}))}catch(t){console.error("webhook fail",t)}e.$store.dispatch("transaction/addTransaction",r),e.loading=!1,e.showSubmittedTaskModal=!0,n.next=16;break;case 13:throw n.prev=13,n.t0=n.catch(0),new Error(n.t0);case 16:case"end":return n.stop()}}),n,null,[[0,13]])})))()}}},C=I,O=(n(1289),Object(v.a)(C,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"wrapper"},[t.campaign&&t.campaign.info?e("instructions-modal",{attrs:{readonly:!0,campaign:t.campaign,info:t.campaign.info,show:t.showInstructionsModal},on:{clicked:t.showInstructions}}):t._e(),t._v(" "),t.campaign&&t.campaign.reward?e("submitted-task-modal",{attrs:{campaign:t.campaign,show:t.showSubmittedTaskModal}}):t._e(),t._v(" "),e("section",{staticClass:"section has-background-secondary py-1 has-text-white"},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns is-vcentered"},[e("div",{staticClass:"column is-narrow is-flex is-align-items-center is-justify-content-space-between"},[e("button",{staticClass:"button is-secondary",on:{click:function(e){return e.preventDefault(),t.showInstructions.apply(null,arguments)}}},[t._m(0),t._v(" "),e("span",[t._v("Instructions")])]),t._v(" "),e("span",{staticClass:"is-hidden-desktop"},[t._v("\n            Reward:\n            "),t.campaign?e("b",[t._v(t._s(t.campaign.reward.quantity))]):e("b",[t._v("...... EFX")])])]),t._v(" "),e("div",{staticClass:"column has-text-centered"},[t.campaign&&t.campaign.info?e("b",[t._v(t._s(t.campaign.info.title))]):e("b",[t._v("......")]),t._v(" "),e("span",{staticClass:"px-2 is-hidden-touch"},[t._v(" | ")]),t._v(" "),e("span",[e("span",{staticClass:"is-hidden-touch"},[t._v("Task ")]),e("b",[t._v("#"+t._s(t.taskIndex))])])]),t._v(" "),e("div",{staticClass:"column is-narrow is-hidden-touch"},[t._v("\n          Reward:\n          "),t.campaign?e("b",[t._v(t._s(t.campaign.reward.quantity))]):e("b",[t._v("...... EFX")])])])])]),t._v(" "),e("section",{staticClass:"section template-section"},[e("div",{staticClass:"container"},[t.loading?e("div",{staticClass:"loader-wrapper is-active"},[e("img",{attrs:{src:n(340)}}),t._v(" "),e("br"),e("span",{staticClass:"loading-text"},[t._v("Waiting for the transaction to complete")])]):t._e(),t._v(" "),t.campaign&&t.campaign.info&&t.task?e("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.task)},on:{submit:t.submitTask}}):e("div",{staticClass:"loading-text"},[t._v("\n        Loading\n      ")]),t._v(" "),t.loadingReservation?e("div",{staticClass:"loader-wrapper is-active"},[e("img",{attrs:{src:n(340)}}),t._v(" "),e("br"),e("span",{staticClass:"loading-text"},[t._v("Making reservation")])]):t._e()],1)]),t._v(" "),e("section",{staticClass:"py-3 has-background-light"},[e("div",{staticClass:"container has-text-centered"},[e("button",{staticClass:"button is-danger is-small",on:{click:function(e){return e.preventDefault(),t.releaseTask(t.submissionId)}}},[t._v("\n        Stop Task\n      ")])])])],1)}),r,!1,null,"004dc63b",null));e.default=O.exports}}]);