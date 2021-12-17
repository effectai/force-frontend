(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1231:function(t,e,n){var content=n(1239);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("cba8df8e",content,!0,{sourceMap:!1})},1232:function(t,e,n){"use strict";var r=n(1244),o=n.n(r),c={name:"InstructionsModal",props:{campaign:{type:Object,required:!0,default:function(){return{}}},info:{type:Object,required:!0,default:function(){return{}}},show:{type:Boolean,required:!1,default:!1},functional:{type:Boolean,required:!1,default:!0},readonly:{type:Boolean,required:!1,default:!1}},data:function(){return{tac:!1}},computed:{showModal:{get:function(){return this.show},set:function(t){this.$emit("clicked",t)}}},methods:{onCancel:function(){this.functional&&(this.showModal=!1)},onClick:function(){this.functional&&this.$parent.joinCampaign()},sanitizeHtmlCustom:function(t){return o()(t,{allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","iframe","img","span","label"],allowedAttributes:{a:["href","name","target","class"],img:["src","alt"],iframe:["src"],"*":["style"]}})}}},l=n(32),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.campaign&&t.info?n("div",{staticClass:"modal",class:{"is-active":t.showModal},style:{position:t.functional?"fixed":"relative",padding:t.functional?"initial":"10px"}},[n("div",{staticClass:"modal-background"}),t._v(" "),n("div",{staticClass:"modal-card"},[n("header",{staticClass:"modal-card-head"},[n("p",{staticClass:"modal-card-title"},[t._v("\n        "+t._s(t.info.title)+"\n      ")]),t._v(" "),n("button",{staticClass:"delete",attrs:{"aria-label":"close",disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}})]),t._v(" "),n("section",{staticClass:"modal-card-body"},[t.campaign&&t.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.sanitizeHtmlCustom(t.$md.render(t.info.instructions)))}}):n("p",[t._v("\n        ...\n      ")]),t._v(" "),n("label",{staticClass:"checkbox"},[t.readonly?n("input",{attrs:{checked:"",type:"checkbox",disabled:""}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.tac,expression:"tac"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.tac)?t._i(t.tac,null)>-1:t.tac},on:{change:function(e){var n=t.tac,r=e.target,o=!!r.checked;if(Array.isArray(n)){var c=t._i(n,null);r.checked?c<0&&(t.tac=n.concat([null])):c>-1&&(t.tac=n.slice(0,c).concat(n.slice(c+1)))}else t.tac=o}}}),t._v("\n        I agree to the "),n("a",{attrs:{href:"#"}},[t._v("terms and conditions")])])]),t._v(" "),n("footer",{staticClass:"modal-card-foot"},[t.readonly?n("button",{staticClass:"button is-primary",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n        OK\n      ")]):[n("button",{staticClass:"button is-primary",attrs:{disabled:!(t.tac&&t.campaign&&t.info&&t.functional)},on:{click:function(e){return e.preventDefault(),t.onClick()}}},[t._v("\n          Join Campaign\n        ")]),t._v(" "),n("button",{staticClass:"button",attrs:{disabled:!t.functional},on:{click:function(e){return e.preventDefault(),t.onCancel()}}},[t._v("\n          Cancel\n        ")])]],2)])]):t._e()}),[],!1,null,"5257eca7",null);e.a=component.exports},1235:function(t,e){},1236:function(t,e){},1238:function(t,e,n){"use strict";n(1231)},1239:function(t,e,n){var r=n(102)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".template-wrapper[data-v-2bb6d93f]{width:100%;padding:5px}#mediaFrame[data-v-2bb6d93f]{width:100%;border:none;border-radius:14px}",""]),t.exports=r},1241:function(t,e,n){"use strict";n(24),n(66);var r={props:{html:{type:String,default:null}},data:function(){return{loading:!0}},mounted:function(){document.addEventListener("keydown",this.sendKeyEvents)},created:function(){window.addEventListener("message",this.communicateWithIframe)},beforeDestroy:function(){window.removeEventListener("message",this.communicateWithIframe),document.removeEventListener("keydown",this.sendKeyEvents)},methods:{mediaFrameLoaded:function(){this.loading=!1,this.$emit("templateLoaded")},sendKeyEvents:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"key",key:t.key},"*")},communicateWithIframe:function(t){var data=t.data;switch(data.task){case"setHeight":document.getElementById("mediaFrame").height=data.height+"px";break;case"submit":this.$emit("submit",data.values);break;case"results":document.getElementById("mediaFrame").contentWindow.postMessage(data,"*")}}}},o=(n(1238),n(32)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"template-wrapper"},[t.loading?n("div",[t._v("\n    Loading..\n  ")]):t._e(),t._v(" "),n("iframe",{ref:"mediaFrame",attrs:{id:"mediaFrame",srcdoc:t.html,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},on:{load:t.mediaFrameLoaded}})])}),[],!1,null,"2bb6d93f",null);e.a=component.exports},1242:function(t,e){},1243:function(t,e){},1247:function(t,e){},1248:function(t,e,n){"use strict";var r={props:{message:{type:String,default:null},title:{type:String,default:null}},data:function(){return{messageTitle:this.title,messageContent:this.message}}},o=n(32),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal",class:{"is-active":t.messageContent}},[n("div",{staticClass:"modal-background",on:{click:function(e){t.messageContent=null}}}),t._v(" "),n("div",{staticClass:"modal-content p-5 has-background-success has-radius has-text-white"},[n("h3",{staticClass:"subtitle has-text-white is-5"},[t._v(t._s(t.messageTitle))]),t._v(" "),n("p",[t._v(t._s(t.messageContent))]),t._v(" "),n("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(e){t.messageContent=null}}}),t._v(" "),n("div",{staticClass:"has-text-right"},[n("button",{staticClass:"button",on:{click:function(e){t.messageContent=null}}},[t._v("OK")])])])])}),[],!1,null,null,null);e.a=component.exports},1249:function(t,e,n){"use strict";n(85),n(24),n(76),n(88),n(67),n(51),n(50),n(86),n(89),n(66);var r=n(3);n(40);function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){d=!0,o=t},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw o}}}}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var l=n(371),d={props:{batch:{type:Object,default:null}},data:function(){return{loading:!1,error:null}},mounted:function(){this.makeReservation()},methods:{makeReservation:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,o,c,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,e.next=4,t.$blockchain.getReservations();case 4:return n=e.sent,e.next=7,t.getReservationForUser(n);case 7:if(o=e.sent){e.next=15;break}return e.next=11,t.$blockchain.reserveTask(t.batch.id,t.batch.campaign_id,t.batch.tasks_done,t.batch.tasks);case 11:return c=e.sent,t.$store.dispatch("transaction/addTransaction",c),e.next=15,l(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$blockchain.getReservations();case 2:return n=e.sent,e.next=5,t.getReservationForUser(n);case 5:if(o=e.sent){e.next=8;break}throw new Error("Reservation not found");case 8:case"end":return e.stop()}}),e)}))),{retries:5,onRetry:function(t,e){console.log("attempt",e,t)}});case 15:if(!o){e.next=22;break}return e.next=18,t.$blockchain.getTaskIndexFromLeaf(t.batch.campaign_id,t.batch.id,o.leaf_hash,t.batch.tasks);case 18:d=e.sent,t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id+"/"+d+"?submissionId="+o.id),e.next=23;break;case 22:t.$router.push("/campaigns/"+t.batch.campaign_id+"/"+t.batch.batch_id);case 23:t.loading=!1,e.next=30;break;case 26:e.prev=26,e.t0=e.catch(0),t.loading=!1,t.$blockchain.handleError(e.t0);case 30:case"end":return e.stop()}}),e,null,[[0,26]])})))()},getReservationForUser:function(t){var e,n,r=o(t.rows);try{for(r.s();!(n=r.n()).done;){var c=n.value;if(!(c.account_id!==this.$auth.user.vAccountRows[0].id||parseInt(this.batch.batch_id)!==parseInt(c.batch_id)||c.data&&c.data.length)){e=c;break}}}catch(t){r.e(t)}finally{r.f()}return e}}},h=n(32),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[t.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),t._v(" "),n("br"),t._v("Making reservation...\n  ")]):t._e()])}),[],!1,null,null,null);e.a=component.exports},1253:function(t,e,n){"use strict";t.exports.isFunction=function(t){return t&&"[object Function]"==={}.toString.call(t)},t.exports.isArray=function(t){return Array.isArray(t)},t.exports.isObject=function(t){return t instanceof Object},t.exports.isString=function(t){return"string"==typeof t},t.exports.isNumber=function(t){return"number"==typeof t},t.exports.isBoolean=function(t){return"boolean"==typeof t},t.exports.isDate=function(t){return t instanceof Date}},1296:function(t,e,n){"use strict";t.exports="\n"},1297:function(t,e,n){var content=n(1391);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(103).default)("1e87e775",content,!0,{sourceMap:!1})},1384:function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=n(1385),c=n(1389),l=(n(1253),n(1296));t.exports=function(){var t={headers:[],rename:[],headerPathString:".",rowDelimiter:",",textDelimiter:'"',arrayPathString:";",undefinedString:"",endOfLine:l||"\n",mainPathItem:null,booleanTrueString:null,booleanFalseString:null,includeHeaders:!0,fillGaps:!1,verticalOutput:!0,forceTextDelimiter:!1},e=void 0,n=void 0,d=void 0;if(3===arguments.length){var h=Array.prototype.slice.call(arguments);e=h[0],n=h[1],d=h[2]}else if(2===arguments.length){var v=void 0,f=Array.prototype.slice.call(arguments);e=f[0],"function"==typeof(v=f[1])?d=v:"object"===(void 0===v?"undefined":r(v))&&(n=v)}else{if(1!==arguments.length)return new c(new o(t));var m=Array.prototype.slice.call(arguments),_=m[0];if("object"===(void 0===_?"undefined":r(_))){var k=Object.keys(t),y=Object.keys(_),w=y.every((function(t){return k.includes(t)}));y.length>0&&w?n=_:e=_}else e=_}var C=Object.assign({},t,n),x=new o(C);return e?new Promise((function(t,n){x.parse(e,(function(e,r){return d?d(e,r):e?n(e):n?t(r):void 0}))})):new c(x)}},1385:function(t,e,n){"use strict";var r=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var o=n(1386),c=n(1387),l=n(1253),d=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._options=e||{},this._handler=new c(this._options),this._headers=this._options.headers||[],this._escape=n(1388)(this._options.textDelimiter,this._options.rowDelimiter,this._options.forceTextDelimiter)}return r(t,[{key:"parse",value:function(t,e,n){return l.isArray(t)?e(null,this._parseArray(t,n)):l.isObject(t)?e(null,this._parseObject(t)):e(new Error("Unable to parse the JSON object, its not an Array or Object."))}},{key:"_checkRows",value:function(t){var e=null,n=[],r=function(col,t){return""===col||void 0===col?e[t]:col},o=!0,c=!1,l=void 0;try{for(var d,h=t[Symbol.iterator]();!(o=(d=h.next()).done);o=!0){var v=d.value,f=this._headers.length-v.length;f>0&&(v=v.concat(Array(f).join(".").split("."))),e&&this._options.fillGaps&&(v=v.map(r)),n.push(v.join(this._options.rowDelimiter)),e=v}}catch(t){c=!0,l=t}finally{try{!o&&h.return&&h.return()}finally{if(c)throw l}}return n}},{key:"_parseArray",value:function(t,e){var n=this;this._headers=this._headers||[];var r,c=[];r=function(t){var header,e,r=[],o=function(t){return r.push(t.map((function(col){return null!=col?col:""})))},l=function(){return new Array(n._headers.length).fill(null)},d={},h=l(),v=!0,f=!1,m=void 0;try{for(var _,k=t[Symbol.iterator]();!(v=(_=k.next()).done);v=!0){var element=_.value,y=(header=element.item,e=void 0,-1===(e=n._headers.indexOf(header))&&(n._headers.push(header),e=n._headers.indexOf(header)),e);null!=h[y]&&(o(h),h=l()),d[y]=d[y]||0,n._options.fillTopRow&&d[y]<r.length?(r[d[y]][y]=n._escape(element.value),d[y]+=1):(h[y]=n._escape(element.value),d[y]+=1)}}catch(t){f=!0,m=t}finally{try{!v&&k.return&&k.return()}finally{if(f)throw m}}h.length>0&&o(h),c=c.concat(n._checkRows(r))};var l=!0,d=!1,h=void 0;try{for(var v,f=t[Symbol.iterator]();!(l=(v=f.next()).done);l=!0){var m=v.value;r(n._handler.check(m,n._options.mainPathItem,m,t))}}catch(t){d=!0,h=t}finally{try{!l&&f.return&&f.return()}finally{if(d)throw h}}return!e&&n._options.includeHeaders&&c.unshift(this.headers),o(c,n._options.endOfLine)}},{key:"_parseObject",value:function(t){var e,n=this,r=[],c=[[],[]];for(var l in e=function(t){var e=t.value||0===t.value?t.value.toString():n._options.undefinedString;if(e=n._escape(e),n._options.verticalOutput){var o=[t.item,e];r.push(o.join(n._options.rowDelimiter))}else c[0].push(t.item),c[1].push(e)},t){var d="";this._options.mainPathItem&&(d=this._options.mainPathItem+this._options.headerPathString),this._handler.check(t[l],d+l,l,t).forEach(e)}return this._options.verticalOutput||(r.push(c[0].join(this._options.rowDelimiter)),r.push(c[1].join(this._options.rowDelimiter))),o(r,this._options.endOfLine)}},{key:"headers",get:function(){var t=this,e=this._headers;return this._options.rename&&this._options.rename.length>0&&(e=e.map((function(header){return t._options.rename[t._options.headers.indexOf(header)]||header}))),this._options.forceTextDelimiter&&(e=e.map((function(header){return""+t._options.textDelimiter+header+t._options.textDelimiter}))),this._options.mapHeaders&&(e=e.map(this._options.mapHeaders)),e.join(this._options.rowDelimiter)}}]),t}();t.exports=d},1386:function(t,e,n){"use strict";var r=n(1296),o=n(1253);t.exports=function(t,e){if(!t||!o.isArray(t))throw new TypeError('Invalid params "rows" for joinRows. Must be an array of string.');return t.join(e||r||"\n")}},1387:function(t,e,n){"use strict";(function(e){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var c=n(1253),l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._options=e,this._options.typeHandlers=this._options.typeHandlers||{}}return o(t,[{key:"_setHeaders",value:function(t,e){var n=this;return e?t.map((function(element){return element.item=element.item?e+n._options.headerPathString+element.item:e,element})):t}},{key:"castValue",value:function(element,t,e,n){var r=this._options.typeHandlers;for(var o in r)if(h(element,o)){element=r[o].call(r,element,e,n);break}return element}},{key:"checkComplex",value:function(element,t){if(c.isDate(element))return[{item:t,value:(this._options.handleDate||this._handleDate)(element,t)}];if(c.isArray(element)){var e=this._handleArray(element,t);return this._setHeaders(e,t)}if(c.isObject(element)){var n=this._handleObject(element);return this._setHeaders(n,t)}return[{item:t,value:""}]}},{key:"check",value:function(element,t,e,n){switch(void 0===(element=this.castValue(element,t,e,n))?"undefined":r(element)){case"string":return[{item:t,value:this._handleString(element,t)}];case"number":return[{item:t,value:this._handleNumber(element,t)}];case"boolean":return[{item:t,value:this._handleBoolean.bind(this)(element,t)}]}return this.checkComplex(element,t)}},{key:"_handleObject",value:function(t){var e=[];for(var n in t){var r=t[n],o=this.check(r,n,n,t);e=e.concat(o)}return e}},{key:"_handleArray",value:function(t){for(var e,n=[],r=0;r<t.length;++r){var element=t[r],o=this.check(element,null,r,t);if(0!==o.length){var c=o[0];c.item||void 0===e?(o.length>0&&!c.item&&void 0===e&&(e=c),n=n.concat(o)):e.value+=this._options.arrayPathString+c.value}}return n}},{key:"_handleBoolean",value:function(t){return t?this._options.booleanTrueString||"true":this._options.booleanFalseString||"false"}},{key:"_handleString",value:function(t){return t}},{key:"_handleNumber",value:function(t){return t}},{key:"_handleDate",value:function(t){return t.toLocaleDateString()}}]),t}();t.exports=l;var d="undefined"==typeof window?e:window;function h(element,t){if(element instanceof d[t])return!0;switch(void 0===element?"undefined":r(element)){case"string":return"String"===t;case"boolean":return"Boolean"===t;case"number":return"Number"===t}return!1}}).call(this,n(11))},1388:function(t,e,n){"use strict";t.exports=function(t,e,n){if("string"!=typeof t)throw new TypeError('Invalid param "textDelimiter", must be a string.');if("string"!=typeof e)throw new TypeError('Invalid param "rowDelimiter", must be a string.');var r=new RegExp("\\"+t,"g"),o=t+t,c='"'===t?function(t){return t.indexOf(e)>=0||t.indexOf("\n")>=0||t.indexOf('"')>=0}:function(t){return t.indexOf(e)>=0||t.indexOf("\n")>=0};return function(e){return n&&(e=""+e),e.replace?(e=e.replace(r,o),(n||c(e))&&(e=t+e+t),e):e}}},1389:function(t,e,n){"use strict";t.exports=function(t){throw new Error("jsonexport called without third argument as a callback and is required")}},1390:function(t,e,n){"use strict";n(1297)},1391:function(t,e,n){var r=n(102)(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap);"]),r.push([t.i,".box-title[data-v-4cfe1858]{text-align:center;border-bottom:2px solid #cdd4e6;padding-bottom:31px;margin:10px 0 15px}.progress[data-v-4cfe1858]::-webkit-progress-value{-webkit-transition:width .5s ease;transition:width .5s ease}",""]),t.exports=r},1405:function(t,e,n){"use strict";n.r(e);n(50),n(114),n(75),n(115);var r=n(3),o=n(44),c=(n(216),n(24),n(74),n(67),n(66),n(131),n(104),n(1255),n(591),n(85),n(40),n(184)),l=n(157),d=n(1241),h=n(1249),v=n(1232),f=n(1248);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var k=n(1384),y={components:{TemplateMedia:d.a,ReserveTask:h.a,InstructionsModal:v.a,SuccessModal:f.a},middleware:["auth"],data:function(){return{ipfsExplorer:"https://ipfs.effect.ai",campaignId:parseInt(this.$route.params.id),batchId:parseInt(this.$route.params.batch),batchCompleted:parseInt(this.$route.query.batchCompleted),campaign:void 0,batch:void 0,body:"description",accountId:this.$auth.user.vAccountRows[0].id,userJoined:null,loading:!1,joinCampaignPopup:!1,reserveTask:!1,submissions:null,page:1,perPage:10,pages:[],viewTaskResult:!1,successMessage:null,successTitle:null,reservations:null,userReservation:null}},computed:_(_({},Object(c.c)({batches:function(t){return t.campaign.batches},campaigns:function(t){return t.campaign.campaigns},campaignLoading:function(t){return t.campaign.loading},batchLoading:function(t){return t.campaign.loadingBatch}})),{},{displayedSubmissions:function(){return this.paginate(this.submissions)},displayedReservations:function(){return this.paginate(this.reservations)}}),watch:{submissions:function(){this.setPages()},reservations:function(){this.setPages()}},mounted:function(){this.batchCompleted&&(this.successTitle="Batch is completed",this.successMessage="All the tasks in this batch are done")},created:function(){this.checkUserCampaign(),this.getBatch(),this.getCampaign(),this.setPages()},methods:{campaignModalChange:function(t){this.joinCampaignPopup=t},joinCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$blockchain.joinCampaign(t.campaignId);case 3:if(data=e.sent,t.$store.dispatch("transaction/addTransaction",data),!data){e.next=13;break}return t.loading=!0,t.joinCampaignPopup=!1,e.next=10,t.$blockchain.waitForTransaction(data);case 10:return e.next=12,t.checkUserCampaign();case 12:t.userJoined&&(t.reserveTask=!0);case 13:t.joinCampaignPopup=!1,e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),t.$blockchain.handleError(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))()},checkUserCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,t.$blockchain.getCampaignJoins(t.campaignId);case 4:data=e.sent,t.userJoined=data.rows.length>0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$blockchain.handleError(e.t0);case 11:t.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},postResults:function(t){var e=document.getElementById("mediaFrame");e&&e.contentWindow.postMessage({task:"results",value:t},"*")},viewTask:function(sub){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$blockchain.getTaskIndexFromLeaf(t.batch.campaign_id,t.batch.id,sub.leaf_hash,t.batch.tasks);case 2:n=e.sent,t.viewTaskResult={placeholders:t.batch.tasks[n],results:JSON.parse(sub.data)};case 4:case"end":return e.stop()}}),e)})))()},submitTask:function(t){console.log("Task submitted!",t)},renderTemplate:function(template){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new l.Template(template,t,e).render()},getBatch:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getBatch",{batchId:t.batchId});case 2:return t.batch=t.batches.find((function(b){return b.batch_id===t.batchId})),e.next=5,t.$blockchain.getSubmissionsAndReservationsForBatch(t.batchId);case 5:n=e.sent,t.submissions=n.filter((function(sub){return sub.data})),t.reservations=n.filter((function(sub){return!sub.data})),t.userReservation=t.reservations.find((function(e){return e.account_id===t.$auth.user.vAccountRows[0].id}));case 9:case"end":return e.stop()}}),e)})))()},getCampaign:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("campaign/getCampaign",t.campaignId);case 2:t.campaign=t.campaigns.find((function(e){return e.id===t.campaignId}));case 3:case"end":return e.stop()}}),e)})))()},generateRandomNumber:function(t){return Math.ceil(Math.random()*t)},downloadTaskResults:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all(t.submissions.map(function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(n){var sub,r,o,c,l,d,h,v,f,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for((sub={}).data=JSON.parse(n.data),r=0,o=Object.keys(sub.data);r<o.length;r++)c=o[r],n[c]=sub.data[c];return e.next=5,t.$blockchain.getTaskIndexFromLeaf(t.batch.campaign_id,t.batch.id,n.leaf_hash,t.batch.tasks);case 5:for(l=e.sent,d=t.batch.tasks[l],n.placeholders=JSON.stringify(d),h=0,v=Object.keys(d);h<v.length;h++)f=v[h],n[f]=d[f];return delete n.content,delete n.batch_id,delete n.id,delete n.leaf_hash,m={link_id:null,account_id:null},n=Object.assign(m,n),e.abrupt("return",n);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 3:return n=e.sent,e.next=6,k(n,(function(e,n){if(e)return console.error(e);var r="task_results_".concat(t.batchId,".csv"),o=new Blob([n],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(o,r);else{var link=document.createElement("a");if(void 0!==link.download){var c=URL.createObjectURL(o);link.setAttribute("href",c),link.setAttribute("download",r),link.style.visibility="hidden",document.body.appendChild(link),link.click(),document.body.removeChild(link)}}}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},setPages:function(){if(this.submissions)for(var t=Math.ceil(this.submissions.length/this.perPage),e=1;e<=t;e++)this.pages.length<e&&this.pages.push(e)},paginate:function(t){var e=this.page*this.perPage-this.perPage,n=this.page*this.perPage;return t.slice(e,n)}}},w=y,C=(n(1390),n(32)),component=Object(C.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section is-max-widescreen"},[n("div",{staticClass:"container"},[n("nav",{staticClass:"breadcrumb",attrs:{"aria-label":"breadcrumbs"}},[n("ul",[n("li",[n("nuxt-link",{attrs:{to:"/"}},[t._v("\n            Campaigns\n          ")])],1),t._v(" "),n("li",[n("nuxt-link",{attrs:{to:"/campaigns/"+t.campaignId}},[t._v("\n            Campaign "+t._s(t.campaignId)+"\n          ")])],1),t._v(" "),n("li",{staticClass:"is-active"},[t.batch?n("nuxt-link",{attrs:{to:"/campaigns/"+t.campaignId+"/"+t.batchId,"aria-current":"page"}},[t._v("\n            Batch "+t._s(t.batch.id)+"\n          ")]):t._e()],1)])]),t._v(" "),t.loading?n("div",{staticClass:"loader-wrapper is-active"},[n("div",{staticClass:"loader is-loading"}),t._v(" "),n("br"),t._v("Waiting for the transaction to complete...\n    ")]):t._e(),t._v(" "),t.campaignLoading||t.batchLoading?n("div",[t._v("\n      Campaign loading..\n    ")]):t.campaign&&t.batch?t._e():n("div",[t._v("\n      Could not retrieve campaign\n    ")]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column is-two-thirds"},[n("div",{staticClass:"title"},[t.batch?n("span",[t._v("#"+t._s(t.campaignId)+"."+t._s(t.batch.id)+": ")]):t._e(),t._v(" "),t.campaign&&t.campaign.info?n("span",[t._v(t._s(t.campaign.info.title))]):t.campaign&&null===t.campaign.info?n("span",{staticClass:"has-text-danger-dark"},[t._v("Could not load campaign info")]):n("span",[t._v("Loading..")])]),t._v(" "),n("div",{staticClass:"tabs"},[n("ul",[n("li",{class:{"is-active":"description"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="description"}}},[t._v("Description")])]),t._v(" "),n("li",{class:{"is-active":"instruction"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="instruction"}}},[t._v("Instructions")])]),t._v(" "),t.campaign&&t.campaign.owner[1]===t.$auth.user.accountName?n("li",{class:{"is-active":"reservations"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="reservations"}}},[t._v("Active Reservations")])]):t._e(),t._v(" "),t.campaign&&t.campaign.owner[1]===t.$auth.user.accountName?n("li",{class:{"is-active":"results"===t.body}},[n("a",{on:{click:function(e){e.preventDefault(),t.body="results"}}},[t._v("Task Results")])]):t._e()])]),t._v(" "),"description"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("p",[t._v("\n            "+t._s(t.campaign.info.description)+"\n          ")]):n("p",[t._v("\n            ...\n          ")]),t._v(" "),n("h2",{staticClass:"subtitle mt-5"},[t._v("\n            Task Preview\n          ")]),t._v(" "),t.campaign&&t.campaign.info?n("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.campaign.info.example_task||{})},on:{submit:t.submitTask}}):t._e()],1):t._e(),t._v(" "),"instruction"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.$md.render(t.campaign.info.instructions))}}):n("p",[t._v("\n            ...\n          ")])]):t._e(),t._v(" "),"reservations"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("div",{staticClass:"content"},[t.reservations.length?n("div",[n("table",{staticClass:"table",staticStyle:{width:"100%"}},[t._m(0),t._v(" "),n("tbody",t._l(t.displayedReservations,(function(sub){return n("tr",{key:sub.id},[n("td",[t._v(t._s(sub.id))]),t._v(" "),n("td",[t._v(t._s(sub.account_id))])])})),0)]),t._v(" "),n("nav",{staticClass:"pagination",attrs:{role:"navigation","aria-label":"pagination"}},[1!=t.page?n("a",{staticClass:"pagination-previous",on:{click:function(e){t.page--}}},[t._v("Previous")]):t._e(),t._v(" "),t.page<t.pages.length?n("a",{staticClass:"pagination-next",on:{click:function(e){t.page++}}},[t._v("Next page")]):t._e(),t._v(" "),n("ul",{staticClass:"pagination-list"},t._l(t.pages,(function(e){return n("li",{key:e},[n("a",{staticClass:"pagination-link",class:{"is-current":t.page===e},on:{click:function(n){t.page=e}}},[t._v(t._s(e))])])})),0)])]):n("span",[t._v("No active reservations")])]):t._e()]):t._e(),t._v(" "),"results"===t.body?n("div",{staticClass:"block"},[t.campaign&&t.campaign.info?n("div",{staticClass:"content"},[t.submissions.length?n("div",[n("table",{staticClass:"table",staticStyle:{width:"100%"}},[t._m(1),t._v(" "),n("tbody",t._l(t.displayedSubmissions,(function(sub){return n("tr",{key:sub.id},[n("td",[t._v(t._s(sub.id))]),t._v(" "),n("td",[t._v(t._s(sub.account_id))]),t._v(" "),n("td",[t._v(t._s(sub.data))]),t._v(" "),n("td",[t._v(t._s(sub.paid?"yes":"no"))]),t._v(" "),n("td",[n("button",{staticClass:"button",on:{click:function(e){return e.preventDefault(),t.viewTask(sub)}}},[t._v("\n                        View\n                      ")])])])})),0)]),t._v(" "),n("nav",{staticClass:"pagination",attrs:{role:"navigation","aria-label":"pagination"}},[1!=t.page?n("a",{staticClass:"pagination-previous",on:{click:function(e){t.page--}}},[t._v("Previous")]):t._e(),t._v(" "),t.page<t.pages.length?n("a",{staticClass:"pagination-next",on:{click:function(e){t.page++}}},[t._v("Next page")]):t._e(),t._v(" "),n("ul",{staticClass:"pagination-list"},t._l(t.pages,(function(e){return n("li",{key:e},[n("a",{staticClass:"pagination-link",class:{"is-current":t.page===e},on:{click:function(n){t.page=e}}},[t._v(t._s(e))])])})),0)]),t._v(" "),n("button",{staticClass:"button is-primary",on:{click:function(e){return e.preventDefault(),t.downloadTaskResults()}}},[t._v("\n                Download Results\n              ")])]):n("span",[t._v("No submissions found")]),t._v(" "),n("div",{staticClass:"modal",class:{"is-active":t.viewTaskResult}},[n("div",{staticClass:"modal-background",on:{click:function(e){t.viewTaskResult=!1}}}),t._v(" "),n("div",{staticClass:"modal-content",staticStyle:{"background-color":"#fff",padding:"10px"}},[t.campaign&&t.campaign.info&&t.viewTaskResult?n("template-media",{attrs:{html:t.renderTemplate(t.campaign.info.template||"No template found..",t.viewTaskResult.placeholders)},on:{templateLoaded:function(e){return t.postResults(t.viewTaskResult.results)}}}):t._e()],1),t._v(" "),n("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(e){t.viewTaskResult=!1}}})])]):t._e()]):t._e()]),t._v(" "),n("div",{staticClass:"column is-one-third"},[n("div",{staticClass:"box"},[t._m(2),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Requester")]),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"blockchain-address"},[t.campaign?n("nuxt-link",{attrs:{to:"/profile/"+t.campaign.owner[1]}},[t._v("\n                "+t._s(t.campaign.owner[1])+"\n              ")]):n("span",[t._v(".....")])],1)]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Reward")]),t._v(" "),n("br"),t._v(" "),t.campaign?n("span",[t._v(t._s(t.campaign.reward.quantity))]):n("span",[t._v(".....")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Tasks")]),t._v(" "),n("br"),t._v(" "),t.batch&&t.batch.num_tasks-t.batch.tasks_done==0&&!t.batch.reservations.length?[n("span",[t._v(t._s(t.batch.num_tasks)+" Tasks done.")])]:t.batch&&t.batch.num_tasks-t.batch.tasks_done>0||t.batch&&t.batch.reservations.length?[n("span",[t._v(t._s(t.batch.num_tasks-t.batch.tasks_done))]),t._v(" "),n("span",[t._v("/ "+t._s(t.batch.num_tasks)+" left")])]:n("span",[t._v("...")]),t._v(" "),n("progress",{staticClass:"progress",class:{"is-success":!!t.batch&&(t.batch.tasks_done===t.batch.num_tasks&&!t.batch.reservations.length),"is-secondary":!!t.batch&&(t.batch.tasks_done<t.batch.num_tasks||t.batch.reservations.length)},attrs:{max:t.batch?t.batch.num_tasks:void 0},domProps:{value:t.batch?t.batch.tasks_done:void 0}},[t._v("\n              Left\n            ")])],2),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Category")]),t._v(" "),n("br"),t._v(" "),t.campaign&&t.campaign.info?n("span",{staticClass:"tag is-info is-light is-medium"},[t._v(t._s(t.campaign.info.category))]):n("span",{staticClass:"tag is-info is-light is-medium"},[t._v("...")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("IPFS")]),t._v(" "),n("br"),t._v(" "),t.batch?n("div",{staticClass:"blockchain-address"},[n("a",{attrs:{target:"_blank",href:t.ipfsExplorer+"/ipfs/"+t.batch.content.field_1}},[t._v(t._s(t.batch.content.field_1))])]):n("span",[t._v(".....")])]),t._v(" "),n("div",{staticClass:"block"},[n("b",[t._v("Blockchain")]),t._v(" "),n("br"),t._v(" "),n("a",{attrs:{target:"_blank",href:t.$blockchain.eos.explorer+"/account/"+t.$blockchain.sdk.force.config.force_contract+"?loadContract=true&tab=Tables&table=batch&account="+t.$blockchain.sdk.force.config.force_contract+"&scope="+t.$blockchain.sdk.force.config.force_contract+"&limit=1&lower_bound="+t.batchId+"&upper_bound="+t.batchId}},[t._v("View Batch on Explorer")])]),t._v(" "),n("div",{staticClass:"block"},[t.loading||null===t.userReservation||t.campaignLoading||t.batchLoading||!t.batch?n("button",{staticClass:"button is-primary is-loading"},[t._v("\n              Loading\n            ")]):t.userJoined?t.batch.num_tasks-t.batch.tasks_done==0||t.userReservation?t.userReservation?n("button",{staticClass:"button is-accent has-text-weight-semibold",on:{click:function(e){e.preventDefault(),t.reserveTask=!0}}},[t._v("\n              Go To Task\n            ")]):[t.userJoined?n("button",{staticClass:"button is-primary",attrs:{disabled:!0}},[t._v("\n                Joined Campaign\n              ")]):t._e(),t._v(" "),n("p",[t._v("No active tasks currently")])]:n("button",{staticClass:"button is-primary",on:{click:function(e){e.preventDefault(),t.reserveTask=!0}}},[t._v("\n              Make Task Reservation\n            ")]):n("button",{staticClass:"button is-primary",class:{"is-loading":!0===t.loading},on:{click:function(e){e.preventDefault(),t.joinCampaignPopup=!0}}},[t._v("\n              Join Campaign\n            ")])],2)])])]),t._v(" "),t.batch&&t.batch.num_tasks-t.batch.tasks_done==0&&t.batchCompleted&&t.successMessage?n("success-modal",{attrs:{message:t.successMessage,title:t.successTitle}}):t._e(),t._v(" "),t.reserveTask?n("reserve-task",{attrs:{batch:t.batch}}):t._e(),t._v(" "),t.campaign&&t.campaign.info?n("instructions-modal",{attrs:{campaign:t.campaign,info:t.campaign.info,show:t.joinCampaignPopup},on:{clicked:t.campaignModalChange}}):t._e()],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Reservation ID")]),t._v(" "),n("th",[t._v("Account ID")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("ID")]),t._v(" "),n("th",[t._v("Account ID")]),t._v(" "),n("th",[t._v("Data")]),t._v(" "),n("th",[t._v("Paid")]),t._v(" "),n("th")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",{staticClass:"box-title is-size-4"},[n("b",[t._v("Information")])])}],!1,null,"4cfe1858",null);e.default=component.exports}}]);