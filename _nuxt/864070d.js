(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1255:function(t,e,n){var content=n(1258);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("2ac9a1b4",content,!0,{sourceMap:!1})},1257:function(t,e,n){"use strict";n(1255)},1258:function(t,e,n){var r=n(57)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".template-wrapper[data-v-502fba47]{width:100%}#mediaFrame[data-v-502fba47]{width:100%;border:none}",""]),t.exports=r},1260:function(t,e,n){"use strict";n(25),n(69);var r={props:{html:{type:String,default:null}},data:function(){return{alternativeFrontendUrl:"https://effectai.github.io/force-frontend-new",loading:!0}},watch:{html:function(t){document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:t},"*")}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:this.html},"*"),this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},o=(n(1257),n(23)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"template-wrapper"},[t.loading?n("div",{staticClass:"loading-text subtitle"},[t._v("\n    Loading\n  ")]):t._e(),t._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",src:t.alternativeFrontendUrl+"/template",name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}})])}),[],!1,null,"502fba47",null);e.a=component.exports},1336:function(t,e,n){var content=n(1464);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(58).default)("3336d597",content,!0,{sourceMap:!1})},1463:function(t,e,n){"use strict";n(1336)},1464:function(t,e,n){var r=n(57)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".is-boxed .file-cta[data-v-f1b29d50]{background:#fff;border:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23A9B1BD' stroke-width='4' stroke-dasharray='6,14' stroke-dashoffset='10' stroke-linecap='square'/%3E%3C/svg%3E\")}.dragover[data-v-f1b29d50]{background-color:#e7f3ff!important}table[data-v-f1b29d50]{background:transparent;border-spacing:10px;width:100%;text-align:center;border-radius:8px}table td[data-v-f1b29d50]{border-top:1px solid #e8eeff}table th[data-v-f1b29d50]{border:none}div.box[data-v-f1b29d50]{background:#f7f9fb;padding:2rem;border-radius:8px;box-shadow:none}.button.is-wide[data-v-f1b29d50]{min-width:220px}.batch-info[data-v-f1b29d50]{padding-right:0}.batch-info .box[data-v-f1b29d50]{width:100%;height:auto;padding:1rem;background:#fff}.batch-info .box button[data-v-f1b29d50]{font-size:.9rem}",""]),t.exports=r},1492:function(t,e,n){"use strict";n.r(e);n(88),n(50),n(106),n(107);var r=n(3),o=n(574),l=n(39),c=(n(33),n(51),n(137),n(280),n(613),n(118),n(25),n(59),n(1437),n(70),n(1443),n(1445),n(1447),n(1448),n(1449),n(1450),n(1451),n(1452),n(1453),n(1454),n(1455),n(1456),n(1457),n(1458),n(1459),n(1460),n(69),n(186),n(71),n(383),n(159),n(109),n(79),n(1461),n(281),n(612),n(614),n(185)),d=n(136);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={components:{TemplateMedia:n(1260).a},middleware:["auth"],data:function(){return{campaignId:parseInt(this.$route.params.id),repetitions:1,newTask:{},tasks:[],tempCounter:0,taskModal:!1,previewTask:!1,placeholders:null,campaign:null,file:{name:null,content:null},error:null,loading:!1}},computed:v(v(v({},Object(c.c)({campaigns:function(t){return t.campaign.campaigns},campaignLoading:function(t){return t.campaign.loading}})),Object(c.b)({batchByCampaignId:"campaign/batchByCampaignId"})),{},{efxAvailable:function(){return this.$blockchain.efxAvailable+this.$blockchain.vefxAvailable},maxAmountTask:function(){return Math.floor((this.$blockchain.efxAvailable+this.$blockchain.vefxAvailable)/this.campaign.info.reward/this.repetitions)}}),mounted:function(){this.getCampaign()},methods:{dragover:function(t){t.preventDefault(),t.currentTarget.classList.add("dragover")},dragleave:function(t){t.currentTarget.classList.remove("dragover")},onChange:function(){this.filelist=Object(o.a)(this.$refs.file.files)},drop:function(t){t.preventDefault(),this.uploadFile(t.dataTransfer.files?t.dataTransfer.files:null,!0),t.currentTarget.classList.remove("dragover")},generateCsvData:function(t){var link=this.$refs.csvfiledownload,e="data:text/csv;charset=utf-8,";e+=[Object.values(t).join(","),t.map((function(t){return t+"-value-task-1"})),t.map((function(t){return t+"-value-task-2"})),t.map((function(t){return t+"-value-task-3"}))].join("\n").replace(/(^\[)|(\]$)/gm,""),console.log("TEST",e),link.href=encodeURI(e)},createTask:function(){var t=this;this.newTask.id=this.tempCounter++,this.tasks.push(this.newTask),this.newTask=this.getEmptyTask(this.placeholders),this.$nextTick((function(){t.$refs["placeholder-0"][0].focus()}))},previewModal:function(t){this.previewTask=!0,this.previewTask=this.tasks[t]},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new d.Template(template,t,e).render()},postResults:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"results",value:t},"*")},getEmptyTask:function(t){var e={};return t.forEach((function(t){e[t]=""})),e},getPlaceholders:function(template){var t=function(t,e,n){n||(n=1);for(var r,o=[];r=e.exec(t);)o.push(r[n]);return o}(template,/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g),e=Object(o.a)(new Set(t));this.placeholders=e},getCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.campaignId);case 2:t.campaign=t.campaigns.find((function(e){return e.id===t.campaignId})),t.getPlaceholders(t.campaign.info.template),t.$nextTick((function(){t.generateCsvData(t.placeholders)})),t.newTask=t.getEmptyTask(t.placeholders);case 6:case"end":return e.stop()}}),e)})))()},uploadBatch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var content,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,content={tasks:t.tasks},e.next=5,t.$blockchain.createBatch(t.campaignId,content,t.repetitions);case 5:n=e.sent,t.$store.dispatch("transaction/addTransaction",n),t.$router.push("/campaigns/"+t.campaignId),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),t.$blockchain.handleError(e.t0);case 13:t.loading=!1;case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},cancel:function(){this.$router.push("/campaigns/"+this.campaignId)},uploadFile:function(t,e){var n=this;this.file={name:null,content:null},this.error=null;var r=e?t[0]:t.target.files[0];if(r){this.file.name=r.name;var o=new FileReader;o.onload=function(t){n.file.content=n.csvToJson(t.target.result),n.file.content.forEach((function(element){n.newTask=element,n.createTask();var t=!1;n.placeholders.forEach((function(e){element[e]&&(t=!0)})),t||(n.error="Placeholder not found in CSV")}))},o.readAsText(r)}else this.error="Could not find file",this.file=null},csvToJson:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"',r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",",c=new RegExp("\\s*(".concat(n,")?(.*?)\\1\\s*(?:").concat(r,"|$)"),"gs"),d=function(t){return Object(o.a)(t.matchAll(c)).map((function(t){return t[2]})).filter((function(t,i,a){return i<a.length-1}))},f=t.split("\n"),m=e||d(f.splice(0,1)[0]);return f.map((function(line){return d(line).reduce((function(t,e,i){return v(v({},t),{},Object(l.a)({},m[i]||"extra_".concat(i),e.length>0?Number(e)||e:null))}),{})}))}}},h=m,k=(n(1463),n(23)),component=Object(k.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section is-max-widescreen"},[r("div",{staticClass:"container"},[t.loading?r("div",{staticClass:"loader-wrapper is-active"},[r("img",{attrs:{src:n(374)}})]):t._e(),t._v(" "),r("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[r("ul",[r("li",[r("nuxt-link",{attrs:{to:"/"}},[t._v("\n            All Tasks\n          ")])],1),t._v(" "),r("li",[r("nuxt-link",{attrs:{to:"/campaigns/"+t.campaignId}},[t._v("\n            Task "+t._s(t.campaignId)+"\n          ")])],1),t._v(" "),t._m(0)])]),t._v(" "),r("div",[t._m(1),t._v(" "),t._m(2),t._v(" "),r("form",[r("div",{staticClass:"field"},[r("div",{staticClass:"box"},[t.tasks.length?t._e():r("div",{staticClass:"has-text-centered mb-4"},[r("h1",[t._v("\n                No tasks added in batch yet\n              ")])]),t._v(" "),r("div",{staticClass:"p-2",staticStyle:{background:"#fff","border-radius":"8px"}},[r("table",{staticClass:"table mx-auto"},[r("thead",[r("tr",[t.tasks.length?r("th",[t._v("\n                      Index\n                    ")]):t._e(),t._v(" "),t._l(t.placeholders,(function(e){return r("th",{key:e,staticClass:"task-placeholder-value"},[t._v("\n                      "+t._s(e)+"\n                    ")])})),t._v(" "),t.tasks.length?r("th",[t._v("\n                      Preview\n                    ")]):t._e(),t._v(" "),t.tasks.length?r("th",[t._v("\n                      Remove\n                    ")]):t._e()],2)]),t._v(" "),r("tbody",[t._l(t.tasks,(function(e,n){return r("tr",{key:e.id},[r("td",[t._v(t._s(n+1))]),t._v(" "),t._l(t.placeholders,(function(n){return r("td",{key:n,staticClass:"task-placeholder-value"},[t._v("\n                      "+t._s(e[n])+"\n                    ")])})),t._v(" "),r("td",[r("button",{staticClass:"button is-info is-outlined is-small is-rounded",on:{click:function(e){return e.preventDefault(),t.previewModal(n)}}},[r("font-awesome-icon",{attrs:{icon:"fa-solid fa-magnifying-glass"}})],1)]),t._v(" "),r("td",[r("button",{staticClass:"button is-danger is-outlined is-small is-rounded",on:{click:function(e){return e.preventDefault(),t.tasks.splice(n,1)}}},[r("font-awesome-icon",{attrs:{icon:"fa-solid fa-trash-can"}})],1)])],2)})),t._v(" "),r("tr",[t.tasks.length?r("td"):t._e(),t._v(" "),t._l(t.placeholders,(function(e,n){return r("td",{key:e,staticClass:"task-placeholder-value"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask[e],expression:"newTask[placeholder]"}],ref:"placeholder-"+n,refInFor:!0,staticClass:"input is-info task-placeholder-value",attrs:{type:"text",placeholder:"Type here"},domProps:{value:t.newTask[e]},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.createTask.apply(null,arguments))},input:function(n){n.target.composing||t.$set(t.newTask,e,n.target.value)}}})])})),t._v(" "),t.tasks.length?r("td"):t._e()],2)],2)])]),t._v(" "),r("div",{staticClass:"control has-text-centered mt-5"},[r("button",{staticClass:"button is-primary is-wide",on:{click:function(e){return e.preventDefault(),t.createTask.apply(null,arguments)}}},[t._v("\n                Add Task\n              ")])])]),t._v(" "),r("div",{staticClass:"box"},[r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-3 has-text-centered py-0"},[r("h2",{staticClass:"subtitle is-6 has-text-weight-bold mb-3"},[t._v("\n                  Upload tasks\n                ")]),t._v(" "),r("div",{staticClass:"file is-boxed mt-3"},[r("label",{staticClass:"file-label"},[r("input",{staticClass:"file-input",attrs:{type:"file",name:"csvtasks"},on:{change:t.uploadFile}}),t._v(" "),r("span",{staticClass:"file-cta",on:{dragover:t.dragover,dragleave:t.dragleave,drop:t.drop}},[r("span",{staticClass:"file-label has-text-grey is-size-7"},[t._v("\n                        Drag and drop or browse to choose a CSV file\n                      ")]),t._v(" "),r("button",{staticClass:"button is-light mt-2 "},[t._v("\n                        Choose a .csv file\n                      ")])])])]),t._v(" "),r("div",[r("a",{ref:"csvfiledownload",staticClass:"is-size-7",attrs:{href:"",download:"tasks_example"+t.campaignId+".csv"}},[t._v("Download example CSV")])]),t._v(" "),t.file.name?r("p",{staticClass:"has-text-success mt-2"},[t._v("\n                  Imported file: "+t._s(t.file.name)+"\n                ")]):t._e(),t._v(" "),t.error?r("p",{staticClass:"has-text-danger"},[t._v("\n                  "+t._s(t.error)+"\n                ")]):t._e()]),t._v(" "),r("div",{staticClass:"column is-3 py-0"},[r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("Repetitions")]),t._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.repetitions,expression:"repetitions"}],staticClass:"input",attrs:{type:"number",min:"0",required:""},domProps:{value:t.repetitions},on:{input:function(e){e.target.composing||(t.repetitions=e.target.value)}}})])])]),t._v(" "),t.campaign&&t.campaign.info?r("div",{staticClass:"column is-6 py-0 columns batch-info"},[r("div",{staticClass:"column is-one-third"},[r("div",{staticClass:"box"},[r("h2",[t._v("Total Cost")]),t._v(" "),r("strong",{class:{"has-text-danger":t.campaign.info.reward*t.tasks.length*t.repetitions>t.efxAvailable}},[t._v(t._s(t.campaign.info.reward*t.tasks.length*t.repetitions)+" EFX")])])]),t._v(" "),r("div",{staticClass:"column is-one-third"},[r("div",{staticClass:"box"},[r("h2",[t._v("Available Balance")]),t._v(" "),r("p",[r("strong",[t._v(t._s(t.efxAvailable)+" | ")]),t._v(" "),r("nuxt-link",{attrs:{to:"/deposit"}},[t._v("\n                        Deposit EFX\n                      ")])],1)])]),t._v(" "),r("div",{staticClass:"column is-one-third"},[r("div",{staticClass:"box"},[r("h2",[t._v("Max Tasks Possible")]),t._v(" "),r("strong",[t._v(t._s(t.maxAmountTask>t.efxAvailable?t.efxAvailable:t.maxAmountTask))])])])]):t._e()])])])]),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.uploadBatch.apply(null,arguments)}}},[r("div",{staticClass:"field is-grouped is-justify-content-center mt-6"},[r("div",{staticClass:"control"},[r("button",{staticClass:"button button is-primary is-wide mr-4",class:{"is-loading":t.loading},attrs:{type:"submit",disabled:!t.tasks.length||t.tasks.length>t.maxAmountTask}},[t._v("\n              Add Tasks\n            ")]),t._v(" "),r("button",{staticClass:"button is-outlined is-primary is-wide",on:{click:function(e){return e.preventDefault(),t.cancel.apply(null,arguments)}}},[t._v("\n              Cancel\n            ")])])])])]),t._v(" "),r("div",{staticClass:"modal",class:{"is-active":t.previewTask}},[r("div",{staticClass:"modal-background",on:{click:function(e){t.previewTask=!1}}}),t._v(" "),r("div",{staticClass:"modal-content",staticStyle:{"background-color":"#fff",padding:"10px"}},[t.campaign&&t.campaign.info&&t.previewTask?r("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.previewTask)},on:{templateLoaded:function(e){return t.postResults(t.previewTask.results)}}}):t._e()],1),t._v(" "),r("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(e){t.previewTask=!1}}})])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"is-active"},[n("a",{attrs:{"aria-current":"page"}},[t._v("\n            New Batch\n          ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-half"},[n("div",{staticClass:"title has-text-weight-bold"},[t._v("\n              Tasks\n            ")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tabs campaign-tabs"},[n("ul",[n("li",{staticClass:"is-active"},[n("a",{attrs:{href:"#"}},[t._v("Batches")])])])])}],!1,null,"f1b29d50",null);e.default=component.exports}}]);