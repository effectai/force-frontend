(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1231:function(e,t,n){var content=n(1233);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(103).default)("cba8df8e",content,!0,{sourceMap:!1})},1232:function(e,t,n){"use strict";n(1231)},1233:function(e,t,n){var l=n(102)(!1);l.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),l.push([e.i,".template-wrapper[data-v-2bb6d93f]{width:100%;padding:5px}#mediaFrame[data-v-2bb6d93f]{width:100%;border:none;border-radius:14px}",""]),e.exports=l},1235:function(e,t,n){"use strict";n(24),n(66);var l={props:{html:{type:String,default:null}},data:function(){return{loading:!0}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,this.$emit("templateLoaded")},sendKeyEvents:function(e){var t=document.getElementById("mediaFrame");t&&t.contentWindow.postMessage({task:"key",key:e.key},"*")},communicateWithIframe:function(e){var data=e.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},r=(n(1232),n(32)),component=Object(r.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"template-wrapper"},[e.loading?n("div",[e._v("\n    Loading..\n  ")]):e._e(),e._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",srcdoc:e.html,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:e.mediaFrameLoaded}})])}),[],!1,null,"2bb6d93f",null);t.a=component.exports},1406:function(e,t,n){"use strict";n.r(t);var l=n(3),r=(n(37),n(51),n(24),n(74),n(156));var o={components:{TemplateMedia:n(1235).a},data:function(){return{loading:!1,campaignIpfs:{title:"",description:"",instructions:"",template:'<h2>Placeholder example: ${placeholder} </h2>\n<input type="text" required placeholder="\'name\' attribute is required on input fields" name="test" /><input type="submit" />',image:"",category:"",example_task:{},version:1,reward:null},campaign:{content_hash:null},answer:null}},watch:{"campaignIpfs.template":function(template){var e=this,t=function(e,t,n){n||(n=1);for(var l,r=[];l=t.exec(e);)r.push(l[n]);return r}(template,/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g),n={};t.forEach((function(t){n[t]=e.campaignIpfs.example_task[t]||""})),this.campaignIpfs.example_task=n}},created:function(){this.retrieveTemplate(this.$route.query)},methods:{retrieveTemplate:function(e){var t=this;return Object(l.a)(regeneratorRuntime.mark((function n(){var l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.templateUrl){n.next=8;break}return t.campaignIpfs.template="Retrieving template..",n.next=4,t.$axios.get(e.templateUrl);case 4:l=n.sent,t.campaignIpfs.template=l.data,n.next=9;break;case 8:e.template&&(t.campaignIpfs.template=decodeURI(e.template));case 9:e.placeholders&&(t.campaignIpfs.example_task=JSON.parse(e.placeholders));case 10:case"end":return n.stop()}}),n)})))()},renderTemplate:function(template){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new r.Template(template,e,t).render()},showSubmission:function(e){this.answer=e}}},m=o,c=n(32),component=Object(c.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("h2",{staticClass:"title"},[e._v("\n      Template Preview Tool\n    ")]),e._v(" "),n("div",{staticClass:"block task-group"},[n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Template")]),e._v(" "),n("div",{staticClass:"control"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.campaignIpfs.template,expression:"campaignIpfs.template"}],staticClass:"textarea",domProps:{value:e.campaignIpfs.template},on:{input:function(t){t.target.composing||e.$set(e.campaignIpfs,"template",t.target.value)}}})])]),e._v(" "),Object.keys(e.campaignIpfs.example_task).length?n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Example Task")])]):n("div",[e._v("\n        Add placeholders to your template. For example:\n        "),n("pre",[e._v("${placeholder}")])]),e._v(" "),e._m(0),e._v(" "),e._l(e.campaignIpfs.example_task,(function(t,l){return n("div",{key:l,staticClass:"field is-horizontal"},[n("div",{staticClass:"field-label is-small"},[n("label",{staticClass:"label"},[e._v(e._s(l))])]),e._v(" "),n("div",{staticClass:"field-body is-small"},[n("div",{staticClass:"field"},[n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.campaignIpfs.example_task[l],expression:"campaignIpfs.example_task[key]"}],staticClass:"input is-small",attrs:{type:"text"},domProps:{value:e.campaignIpfs.example_task[l]},on:{input:function(t){t.target.composing||e.$set(e.campaignIpfs.example_task,l,t.target.value)}}})])])])])})),e._v(" "),n("h2",{staticClass:"subtitle mt-5"},[e._v("\n        Task Preview\n      ")]),e._v(" "),n("template-media",{attrs:{html:e.renderTemplate(e.campaignIpfs.template||"No template found..",e.campaignIpfs.example_task||{})},on:{submit:e.showSubmission}}),e._v(" "),n("div",{staticClass:"mt-5"},[n("h2",{staticClass:"subtitle"},[e._v("\n          Submission Answer\n        ")]),e._v(" "),e.answer?n("pre",[e._v(e._s(e.answer))]):n("p",[e._v("\n          Make sure your template has a submit button so that users can submit their answers\n        ")])])],2)])])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v("\n        To learn more about templates and placeholders, visit the "),n("a",{attrs:{href:"https://effectai.github.io/developer-docs/effect_network/template.html",target:"_blank"}},[e._v("documentation")]),e._v(".\n      ")])}],!1,null,null,null);t.default=component.exports}}]);