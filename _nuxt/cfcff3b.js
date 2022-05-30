(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1254:function(t,e,n){var content=n(1258);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("2ac9a1b4",content,!0,{sourceMap:!1})},1257:function(t,e,n){"use strict";n(1254)},1258:function(t,e,n){var r=n(58)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".template-wrapper[data-v-502fba47]{width:100%}#mediaFrame[data-v-502fba47]{width:100%;border:none}",""]),t.exports=r},1260:function(t,e,n){"use strict";n(23),n(70);var r={props:{html:{type:String,default:null}},data:function(){return{alternativeFrontendUrl:"https://effectai.github.io/force-frontend-new",loading:!0}},watch:{html:function(t){document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:t},"*")}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,document.getElementById("mediaFrame").contentWindow.postMessage({task:"template",value:this.html},"*"),this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},o=(n(1257),n(22)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"template-wrapper"},[t.loading?n("div",{staticClass:"loading-text subtitle"},[t._v("\n    Loading\n  ")]):t._e(),t._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",src:t.alternativeFrontendUrl+"/template",name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}})])}),[],!1,null,"502fba47",null);e.a=component.exports},1271:function(t,e,n){"use strict";var r=n(1284),o=n.n(r),l={name:"InstructionsModal",props:{info:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1},functional:{type:Boolean,required:!1,default:!0},readonly:{type:Boolean,required:!1,default:!1}},data:function(){return{tac:!1}},computed:{showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}},methods:{onCancel:function(){this.functional&&(this.showModal=!1)},onClick:function(){this.functional&&this.$parent.reserveTask()},sanitizeHtmlCustom:function(t){return o()(t,{allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","iframe","img","span","label"],allowedAttributes:{a:["href","name","target","class"],img:["src","alt"],iframe:["src"],"*":["style"]}})}}},c=n(22),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.info?n("div",{staticClass:"modal",class:{"is-active":t.showModal},style:{position:t.functional?"fixed":"relative",padding:t.functional?"initial":"10px",zIndex:t.functional?"40":"1"}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n        "+t._s(t.info.title)+"\n      ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close",disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.sanitizeHtmlCustom(t.$md.render(t.info.instructions)))}}):n("p",[t._v("\n        ...\n      ")]),t._v(" "),n("label",{staticClass:"checkbox"},[t.readonly?n("input",{attrs:{checked:"",type:"checkbox",disabled:""}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.tac,expression:"tac"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tac)?t._i(t.tac,null)>-1:t.tac},on:{change:function(e){var n=t.tac,r=e.target,o=!!r.checked;if(Array.isArray(n)){var l=t._i(n,null);r.checked?l<0&&(t.tac=n.concat([null])):l>-1&&(t.tac=n.slice(0,l).concat(n.slice(l+1)))}else t.tac=o}}}),t._v("\n        I agree to the "),n("a",{attrs:{href:"/download/tac.pdf",target:"_blank"}},[t._v("terms and conditions")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[t.readonly?n("button",{staticClass:"button is-primary",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        OK\n      ")]):[n("button",{staticClass:"button is-primary has-tooltip has-tooltip-arrow",attrs:{"data-tooltip":t.tac?"No additional\nqualifications needed":"agree to the terms and\nconditions to qualify",disabled:!t.tac||!t.info||!t.functional},on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n          Qualify\n        ")]),t._v(" "),n("button",{staticClass:"button",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n          Cancel\n        ")])]],2)])]):t._e()}),[],!1,null,"26d1f6b6",null);e.a=component.exports},1275:function(t,e){},1276:function(t,e){},1280:function(t,e){},1281:function(t,e){},1287:function(t,e){},1289:function(t,e){},1343:function(t,e,n){var content=n(1436);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("6c384903",content,!0,{sourceMap:!1})},1344:function(t,e,n){var content=n(1438);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("6035694e",content,!0,{sourceMap:!1})},1435:function(t,e,n){"use strict";n(1343)},1436:function(t,e,n){var r=n(58)(!1);r.push([t.i,".CodeMirror{height:100%}",""]),t.exports=r},1437:function(t,e,n){"use strict";n(1344)},1438:function(t,e,n){var r=n(58)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,"#template[data-v-44e7b533]{height:500px}div.instructions-group .textarea[data-v-44e7b533]{overflow-y:scroll}@media screen and (max-width:769px){.splitpanes.default-theme[data-v-44e7b533]{display:block!important}}.splitpanes.default-theme .splitpanes__pane[data-v-44e7b533]{background:transparent!important}@media screen and (max-width:769px){.splitpanes.default-theme .splitpanes__pane[data-v-44e7b533]{width:100%!important}}",""]),t.exports=r},1506:function(t,e,n){"use strict";n.r(e);n(81),n(69),n(90),n(91),n(92),n(96),n(97);var r=n(3),o=n(34),l=(n(31),n(46),n(71),n(23),n(52),n(136),n(1383),n(120),n(135),n(72),n(70),n(1298),n(603),n(45),n(94),n(184)),c=n(1294),d=n(73),m=n(1300),f=n.n(m),v=n(1398),h=n(1399),_=n(1271),w=n(1260),C=n(375);n(1428),n(1430),n(1432);function y(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return k(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return k(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){c=!0,o=t},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw o}}}}function k(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function I(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?I(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):I(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var E={components:{codemirror:v.codemirror,VueSimplemde:c.a,TemplateMedia:w.a,InstructionsModal:_.a,SuccessModal:C.a,Splitpanes:h.b,Pane:h.a,Multiselect:f.a},beforeRouteLeave:function(t,e,n){this.checkClose()&&n()},middleware:["auth"],data:function(){return{cmOptions:{tabSize:4,mode:"htmlmixed",theme:"default",lineNumbers:!0,line:!0},success:!1,loading:!1,preview:!1,campaignIpfs:{title:"",description:"",instructions:"",template:"",image:"",category:"",example_task:{},version:1,reward:null,estimated_time:null},formGroup:"tasks",cachedFormData:null,uploadingFile:!1,selectedFile:null,submitted:!1,errors:[],successMessage:null,successTitle:null,answer:null,windowWidth:0,inclusiveQualis:[],exclusiveQualis:[],options:[]}},computed:x(x({},Object(l.c)({allQualificationsLoaded:function(t){return t.qualification.allQualificationsLoaded}})),{},{hasChanged:function(){return this.cachedFormData!==this.formDataForComparison()},estimatedEarnings:function(){if(this.campaignIpfs&&this.campaignIpfs.estimated_time&&this.campaignIpfs.reward){var t=3600/this.campaignIpfs.estimated_time*this.campaignIpfs.reward;return{efxPerHour:t,dollarPerHour:t*this.$blockchain.efxPrice}}return{efxPerHour:0,dollarPerHour:0}},qualificationsDropdownData:function(){var t,e=[],n=y(this.$store.state.qualification.qualifications);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.info.name&&e.push({name:r.info.name,code:r.id})}}catch(t){n.e(t)}finally{n.f()}return e}}),watch:{"campaignIpfs.template":function(template){var t=this,e=function(t,e,n){n||(n=1);for(var r,o=[];r=e.exec(t);)o.push(r[n]);return o}(template,/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g),n={};e.forEach((function(e){n[e]=t.campaignIpfs.example_task[e]||""})),this.campaignIpfs.example_task=n},campaignIpfs:{deep:!0,handler:function(t){window.localStorage.setItem("cached_campaignIpfs",JSON.stringify(t))}}},created:function(){this.getQualifications(),this.cacheFormData(),window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},beforeDestroy:function(){window.removeEventListener("beforeunload",this.checkClose)},methods:{getQualifications:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.allQualificationsLoaded){e.next=3;break}return e.next=3,t.$store.dispatch("qualification/getQualifications");case 3:case"end":return e.stop()}}),e)})))()},addExclusiveQuali:function(t,e){var n={name:t,code:e};this.exclusiveQualis.push(n)},addInclusiveQuali:function(t,e){var n={name:t,code:e};this.inclusiveQualis.push(n)},handleResize:function(){this.windowWidth=window.innerWidth},retrieveTemplate:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.templateUrl){n.next=8;break}return e.campaignIpfs.template="Retrieving campaign template..",n.next=4,e.$axios.get(t.templateUrl);case 4:r=n.sent,e.campaignIpfs.template=r.data,n.next=9;break;case 8:t.template&&(e.campaignIpfs.template=decodeURI(t.template));case 9:if(!t.placeholders){n.next=14;break}return n.next=12,e.$axios.get(t.placeholders.replaceAll('"',""));case 12:o=n.sent,e.campaignIpfs.example_task=o.data;case 14:case"end":return n.stop()}}),n)})))()},showSubmission:function(t){this.answer=t},importCampaign:function(t){var e=this,n=t.target.files[0],r=new FileReader;n.name.includes(".json")&&(r.onload=function(t){e.campaignIpfs=JSON.parse(t.target.result)},r.onerror=function(t){return console.error(t)},r.readAsText(n))},exportCampaign:function(){var t=new Blob([JSON.stringify(this.campaignIpfs)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(t),link.download=0===this.campaignIpfs.length?"effect_".concat(this.campaignIpfs.title,".json"):"effect_untitled_campaign.json",link.click(),URL.revokeObjectURL(link.href)},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new d.Template(template,t,e).render()},checkForm:function(){return this.errors=[],!!(this.campaignIpfs.title&&this.campaignIpfs.description&&this.campaignIpfs.reward&&this.campaignIpfs.category&&this.campaignIpfs.instructions&&this.campaignIpfs.template&&this.campaignIpfs.estimated_time)||(this.campaignIpfs.title||this.errors.push("Title is required."),this.campaignIpfs.description||this.errors.push("Description is required."),this.campaignIpfs.reward||this.errors.push("Reward per task is required."),this.campaignIpfs.category||this.errors.push("Category is required."),this.campaignIpfs.instructions||this.errors.push("Instructions is required."),this.campaignIpfs.template||this.errors.push("Template is required."),this.campaignIpfs.estimated_time||this.errors.push("Estimated time is required."),!1)},cacheFormData:function(){var t=window.localStorage.getItem("cached_campaignIpfs");t&&(this.campaignIpfs=JSON.parse(t)),this.retrieveTemplate(this.$route.query),this.cachedFormData=this.formDataForComparison(),window.addEventListener("beforeunload",this.checkClose)},createCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,i,l,c,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.checkForm()){e.next=27;break}for(t.loading=!0,r=x({},t.campaignIpfs),o=[],i=0;i<t.exclusiveQualis.length;i++)o.push({key:t.exclusiveQualis[i].code,value:1});for(l=0;l<t.inclusiveQualis.length;l++)o.push({key:t.inclusiveQualis[l].code,value:0});return e.next=9,t.$blockchain.uploadCampaign(r);case 9:return c=e.sent,e.next=12,t.$blockchain.createCampaign(c,t.campaignIpfs.reward,o);case 12:return d=e.sent,t.successTitle="Campaign submitted successfully",t.successMessage="Waiting for transaction to complete before continuing",e.next=17,t.$blockchain.waitForTransaction(d);case 17:return e.next=19,t.$store.dispatch("campaign/getCampaigns");case 19:return e.next=21,t.$blockchain.getMyLastCampaign();case 21:n=e.sent,t.$store.dispatch("transaction/addTransaction",d),t.campaignIpfs={title:"",description:"",instructions:"",template:"",image:"",category:"",example_task:{},version:1,reward:null,estimated_time:null},t.loading=!1,t.submitted=!0,t.$router.push("/campaigns/".concat(n.id));case 27:e.next=34;break;case 29:e.prev=29,e.t0=e.catch(0),console.error(e.t0),t.loading=!1,t.errors.push(e.t0);case 34:case"end":return e.stop()}}),e,null,[[0,29]])})))()},formDataForComparison:function(){return JSON.stringify({campaign:this.campaign,campaignIpfs:this.campaignIpfs})},checkClose:function(t){if(this.hasChanged&&!this.loading&&!this.submitted){var e="You have unsaved changes. Are you sure you wish to leave?";return!!confirm(e)||(t.preventDefault(),t.returnValue=e,!1)}return!0}}},$=E,O=(n(1435),n(1437),n(22)),component=Object(O.a)($,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"section"},[r("div",{staticClass:"container"},[t.loading?r("div",{staticClass:"loader-wrapper is-active"},[r("img",{attrs:{src:n(374)}}),t._v(" "),r("br"),r("span",{staticClass:"loading-text"},[t._v("Waiting for the transaction to complete")])]):t._e(),t._v(" "),t._m(0),t._v(" "),r("h1",{staticClass:"title mt-5"},[t._v("\n      New Task\n    ")]),t._v(" "),t.errors.length?r("div",t._l(t.errors,(function(e){return r("div",{key:t.toString(e),staticClass:"notification is-danger is-light"},[t._v("\n        "+t._s(e)+"\n      ")])})),0):t._e(),t._v(" "),r("div",{staticClass:"tabs"},[r("ul",[r("li",{class:{"is-active":"tasks"===t.formGroup}},[r("a",{on:{click:function(e){e.preventDefault(),t.formGroup="tasks"}}},[t._v("Design Tasks")])]),t._v(" "),r("li",{class:{"is-active":"basic-info"===t.formGroup}},[r("a",{on:{click:function(e){e.preventDefault(),t.formGroup="basic-info"}}},[t._v("Basic Information")])]),t._v(" "),r("li",{class:{"is-active":"instructions"===t.formGroup}},[r("a",{on:{click:function(e){e.preventDefault(),t.formGroup="instructions"}}},[t._v("Instructions")])])])]),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.createCampaign.apply(null,arguments)}}},[r("div",{directives:[{name:"show",rawName:"v-show",value:"basic-info"===t.formGroup,expression:"formGroup === 'basic-info'"}],staticClass:"block basic-info-group"},[r("div",{staticClass:"field"},[t._m(1),t._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.title,expression:"campaignIpfs.title"}],staticClass:"input",attrs:{type:"text",placeholder:"My Campaign Title"},domProps:{value:t.campaignIpfs.title},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs,"title",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"field"},[t._m(2),t._v(" "),r("div",{staticClass:"control"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.description,expression:"campaignIpfs.description"}],staticClass:"textarea",domProps:{value:t.campaignIpfs.description},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs,"description",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("Image")]),t._v(" "),r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.image,expression:"campaignIpfs.image"}],staticClass:"input",attrs:{type:"text",placeholder:"Image URL"},domProps:{value:t.campaignIpfs.image},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs,"image",e.target.value)}}})])]),t._v(" "),r("div",{staticClass:"field"},[t._m(3),t._v(" "),r("div",{staticClass:"select"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.category,expression:"campaignIpfs.category"}],attrs:{required:""},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.campaignIpfs,"category",e.target.multiple?n:n[0])}}},[r("option",[t._v("---")]),t._v(" "),r("option",{attrs:{value:"qualifier"}},[t._v("\n                Qualifier\n              ")]),t._v(" "),r("option",{attrs:{value:"annotations"}},[t._v("\n                Annotations\n              ")]),t._v(" "),r("option",{attrs:{value:"socials"}},[t._v("\n                Socials\n              ")])])])]),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("\n            Worker must have qualifications\n          ")]),t._v(" "),t.allQualificationsLoaded?r("multiselect",{attrs:{"tag-placeholder":"Add",placeholder:"Select Qualifications",label:"name","track-by":"code",options:t.qualificationsDropdownData,multiple:!0,taggable:!0,"show-labels":!1},on:{tag:t.addInclusiveQuali},model:{value:t.inclusiveQualis,callback:function(e){t.inclusiveQualis=e},expression:"inclusiveQualis"}}):t._e()],1),t._v(" "),r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("\n            Deny workers with qualification\n          ")]),t._v(" "),t.allQualificationsLoaded?r("multiselect",{attrs:{"tag-placeholder":"Add",placeholder:"Select Qualifications",label:"name","track-by":"code",options:t.qualificationsDropdownData,multiple:!0,taggable:!0,"show-labels":!1},on:{tag:t.addExclusiveQuali},model:{value:t.exclusiveQualis,callback:function(e){t.exclusiveQualis=e},expression:"exclusiveQualis"}}):t._e()],1),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"field"},[t._m(4),t._v(" "),r("div",{staticClass:"field has-addons"},[r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.reward,expression:"campaignIpfs.reward"}],staticClass:"input",attrs:{type:"number",placeholder:"Reward per task",step:"0.0001"},domProps:{value:t.campaignIpfs.reward},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs,"reward",e.target.value)}}})]),t._v(" "),t._m(5)])]),t._v(" "),r("div",{staticClass:"field"},[t._m(6),t._v(" "),r("div",{staticClass:"field has-addons"},[r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.estimated_time,expression:"campaignIpfs.estimated_time"}],staticClass:"input",attrs:{type:"number",placeholder:"1",step:"1",min:"1"},domProps:{value:t.campaignIpfs.estimated_time},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs,"estimated_time",e.target.value)}}})]),t._v(" "),t._m(7)])]),t._v(" "),r("div",{staticClass:"field"},[t._m(8),t._v(" "),r("div",{staticClass:"field"},[t.campaignIpfs&&t.campaignIpfs.estimated_time&&t.campaignIpfs.reward?r("div",[r("b",[r("span",[t._v(t._s(parseFloat(t.estimatedEarnings.efxPerHour).toFixed(4))+" EFX")]),t._v(" "),r("span",[t._v("($"+t._s(parseFloat(t.estimatedEarnings.dollarPerHour).toFixed(2))+")")])])]):r("div",[t._m(9)])])])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:"instructions"===t.formGroup,expression:"formGroup === 'instructions'"}],staticClass:"block instructions-group"},[r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-two-fifths"},[r("div",{staticClass:"field"},[t._m(10),t._v(" "),t.campaignIpfs?r("div",{staticClass:"control"},[r("vue-simplemde",{ref:"markdownEditor",attrs:{required:"",configs:{promptURLs:!0,spellChecker:!1}},model:{value:t.campaignIpfs.instructions,callback:function(e){t.$set(t.campaignIpfs,"instructions",e)},expression:"campaignIpfs.instructions"}})],1):t._e()])]),t._v(" "),r("div",{staticClass:"column is-three-fifths"},[r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("Preview")]),t._v(" "),r("div",{staticClass:"control"},[t.campaignIpfs?r("instructions-modal",{attrs:{show:!0,functional:!1,info:t.campaignIpfs}}):t._e()],1)])])])]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:"tasks"===t.formGroup,expression:"formGroup === 'tasks'"}],staticClass:"block task-group"},[r("div",{staticClass:"columns is-variable is-2 is-multiline"},[r("splitpanes",{staticClass:"default-theme",attrs:{horizontal:t.windowWidth<767}},[r("pane",{staticClass:"column is-6-widescreen is-12"},[r("label",{staticClass:"label"},[t._v("Template "),r("span",{staticClass:"has-text-info"},[r("b",[t._v("*")])])]),t._v(" "),r("codemirror",{ref:"template",attrs:{id:"template",options:t.cmOptions,name:"template"},model:{value:t.campaignIpfs.template,callback:function(e){t.$set(t.campaignIpfs,"template",e)},expression:"campaignIpfs.template"}}),t._v(" "),Object.keys(t.campaignIpfs.example_task).length?r("div",{staticClass:"field"},[r("label",{staticClass:"label"},[t._v("Example Task")])]):r("div",[t._v("\n                Add placeholders to your template. For example:\n                "),r("pre",[t._v("${placeholder}")])]),t._v(" "),r("div",[t._v("\n                To learn more about templates and placeholders, visit the "),r("a",{attrs:{href:"https://effectai.github.io/developer-docs/effect_network/template.html",target:"_blank"}},[t._v("documentation")]),t._v(".\n              ")]),t._v(" "),t._l(t.campaignIpfs.example_task,(function(e,n){return r("div",{key:n,staticClass:"field is-horizontal"},[r("div",{staticClass:"field-label is-small"},[r("label",{staticClass:"label"},[t._v(t._s(n))])]),t._v(" "),r("div",{staticClass:"field-body is-small"},[r("div",{staticClass:"field"},[r("div",{staticClass:"control"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.campaignIpfs.example_task[n],expression:"campaignIpfs.example_task[key]"}],staticClass:"input is-small",attrs:{type:"text"},domProps:{value:t.campaignIpfs.example_task[n]},on:{input:function(e){e.target.composing||t.$set(t.campaignIpfs.example_task,n,e.target.value)}}})])])])])}))],2),t._v(" "),r("pane",{staticClass:"column is-6-widescreen is-12"},[r("h2",{staticClass:"subtitle"},[t._v("\n                Task Preview\n              ")]),t._v(" "),r("template-media",{attrs:{html:t.renderTemplate(t.campaignIpfs.template||"No template found..",t.campaignIpfs.example_task||{})},on:{submit:t.showSubmission}}),t._v(" "),r("div",{staticClass:"mt-5"},[r("h2",{staticClass:"subtitle"},[t._v("\n                  Submission Answer\n                ")]),t._v(" "),t.answer?r("pre",[t._v(t._s(t.answer))]):r("p",[t._v("\n                  Make sure your template has a submit button so that users can submit their answers. Test your template by submitting and view your submission here\n                ")])])],1)],1)],1)]),t._v(" "),r("div",{staticClass:"field is-grouped is-grouped-right mt-4"},[r("div",{staticClass:"control has-margin-bottom-mobile"},[r("button",{staticClass:"button is-secondary is-outlined is-small",on:{click:function(e){return e.preventDefault(),t.$refs.fileInput.click()}}},[t._v("\n            Import\n          ")]),t._v(" "),r("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"application/json"},on:{change:function(e){return t.importCampaign(e)}}})]),t._v(" "),r("div",{staticClass:"control"},[r("button",{staticClass:"button is-secondary is-outlined is-small",on:{click:function(e){return e.preventDefault(),t.exportCampaign.apply(null,arguments)}}},[t._v("\n            Export\n          ")])])]),t._v(" "),r("div",{staticClass:"field is-grouped is-grouped-right"},[r("div",{staticClass:"control"},[r("nuxt-link",{staticClass:"button is-light",attrs:{to:"/campaigns"}},[t._v("\n            Cancel\n          ")])],1),t._v(" "),r("div",{staticClass:"control",class:{"has-tooltip-arrow":!t.answer},attrs:{"data-tooltip":t.answer?null:"submit your template in the task\npreview to test your template"}},[r("button",{staticClass:"button is-primary is-wide",class:{"is-loading":t.loading},attrs:{type:"submit",disabled:!t.answer}},[t._v("\n            Create Task\n          ")])])])])]),t._v(" "),t.successMessage?r("success-modal",{attrs:{message:t.successMessage,title:t.successTitle}}):t._e()],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"is-pulled-right"},[n("span",{staticClass:"has-text-info"},[n("b",[t._v("*")])]),t._v(" "),n("i",[t._v(" is required")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label"},[t._v("\n            Title\n            "),n("span",{staticClass:"has-text-info"},[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label"},[t._v("\n            Description\n            "),n("span",{staticClass:"has-text-info"},[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label"},[t._v("\n            Category\n            "),n("span",{staticClass:"has-text-info"},[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label"},[t._v("\n            EFX "),n("strong",[t._v("/")]),t._v(" Task\n            "),n("span",{staticClass:"has-text-info"},[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"control"},[n("a",{staticClass:"button is-primary"},[t._v("\n                EFX\n              ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label",attrs:{for:""}},[t._v("\n            Time "),n("strong",[t._v("/")]),t._v(" Task\n            "),n("span",{staticClass:"has-text-info"},[t._v("*")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"control"},[n("a",{staticClass:"button is-primary",attrs:{href:""}},[t._v("Seconds")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label",attrs:{for:""}},[t._v("\n            EFX "),n("strong",[t._v("/")]),t._v(" Hour\n          ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b",[n("span",[t._v("...")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"label"},[t._v("\n                Raw Markdown\n                "),n("span",{staticClass:"has-text-info"},[t._v("*")])])}],!1,null,"44e7b533",null);e.default=component.exports}}]);