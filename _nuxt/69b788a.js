(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1241:function(t,e,n){"use strict";var o=n(17),r=n(5),c=n(12),l=n(87),d=n(593),m=n(591),v=n(14),f=r.RangeError,h=r.String,k=Math.floor,C=c(m),_=c("".slice),w=c(1..toFixed),x=function(t,e,n){return 0===e?n:e%2==1?x(t,e-1,n*t):x(t*t,e/2,n)},A=function(data,t,e){for(var n=-1,o=e;++n<6;)o+=t*data[n],data[n]=o%1e7,o=k(o/1e7)},F=function(data,t){for(var e=6,n=0;--e>=0;)n+=data[e],data[e]=k(n/t),n=n%t*1e7},$=function(data){for(var t=6,s="";--t>=0;)if(""!==s||0===t||0!==data[t]){var e=h(data[t]);s=""===s?e:s+C("0",7-e.length)+e}return s};o({target:"Number",proto:!0,forced:v((function(){return"0.000"!==w(8e-5,3)||"1"!==w(.9,0)||"1.25"!==w(1.255,2)||"1000000000000000128"!==w(0xde0b6b3a7640080,0)}))||!v((function(){w({})}))},{toFixed:function(t){var e,n,o,r,c=d(this),m=l(t),data=[0,0,0,0,0,0],v="",k="0";if(m<0||m>20)throw f("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return h(c);if(c<0&&(v="-",c=-c),c>1e-21)if(n=(e=function(t){for(var e=0,n=t;n>=4096;)e+=12,n/=4096;for(;n>=2;)e+=1,n/=2;return e}(c*x(2,69,1))-69)<0?c*x(2,-e,1):c/x(2,e,1),n*=4503599627370496,(e=52-e)>0){for(A(data,0,n),o=m;o>=7;)A(data,1e7,0),o-=7;for(A(data,x(10,o,1),0),o=e-1;o>=23;)F(data,1<<23),o-=23;F(data,1<<o),A(data,1,1),F(data,2),k=$(data)}else A(data,0,n),A(data,1<<-e,0),k=$(data)+C("0",m);return k=m>0?v+((r=k.length)<=m?"0."+C("0",m-r)+k:_(k,0,r-m)+"."+_(k,r-m)):v+k}})},1396:function(t,e,n){"use strict";n.r(e);var o=n(3),r=(n(40),n(1241),{middleware:["auth"],data:function(){return{loading:!1,account:"eos"===this.$auth.user.blockchain?this.$auth.user.accountName:null,submitted:!1,message:null,err:!1,tokenAmount:null,memo:null,transactionUrl:null}},computed:{amount:function(){return null!==this.$blockchain.vefxAvailable?this.$blockchain.vefxAvailable.toFixed(2):-1}},methods:{withdraw:function(t,e,n){var r=this;return Object(o.a)(regeneratorRuntime.mark((function o(){var c;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(r.loading=!0,!(r.tokenAmount>r.amount||r.tokenAmount<0)){o.next=5;break}return r.message="Quantity cannot be higher than your balance.",r.err=!0,o.abrupt("return");case 5:return o.prev=5,o.next=8,r.$blockchain.withdraw(t,parseFloat(e).toFixed(4),n);case 8:if(!(c=o.sent)){o.next=17;break}return r.err=!1,r.transactionUrl="https://jungle3.bloks.io/transaction/"+c.transaction_id,r.message="Withdrawing has been successful. Check your transaction here: ",o.next=15,r.$blockchain.waitForTransaction(c.transaction_id);case 15:r.$blockchain.updateBlockchainInfo(),r.submitted=!0;case 17:o.next=22;break;case 19:o.prev=19,o.t0=o.catch(5),r.$blockchain.handleError(o.t0);case 22:r.loading=!1;case 23:case"end":return o.stop()}}),o,null,[[5,19]])})))()},clearFields:function(){this.tokenAmount=null,this.account=null}}}),c=n(32),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container is-max-widescreen"},[n("h1",{staticClass:"title mt-5"},[t._v("\n      Transfer tokens\n    ")]),t._v(" "),t.submitted?n("div",{staticClass:"notification is-light",class:{"is-danger":!0===t.err,"is-success":!1===t.err}},[t._v("\n      "+t._s(t.message)+"\n      "),n("a",{attrs:{target:"_blank",href:t.transactionUrl}},[t._v(t._s(t.transactionUrl))])]):t._e(),t._v(" "),n("form",{staticClass:"box has-limited-width is-horizontal-centered",attrs:{"accept-charset":"UTF-8"},on:{submit:function(e){return e.preventDefault(),t.withdraw(t.account,t.tokenAmount,t.memo)}}},[n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("Destination Account")]),t._v(" "),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"input",attrs:{type:"text",required:""},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("vAccount Contract Balance")]),t._v(" "),n("div",{staticClass:"field has-addons"},[n("div",{staticClass:"control is-expanded"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.tokenAmount,expression:"tokenAmount"}],staticClass:"input",attrs:{required:"",type:"number",min:"0",max:t.amount,disabled:-1==t.amount,placeholder:"0.0001",step:"0.0001"},domProps:{value:t.tokenAmount},on:{input:function(e){e.target.composing||(t.tokenAmount=e.target.value)}}})]),t._v(" "),n("p",{staticClass:"control"},[n("span",{staticClass:"button is-primary",attrs:{disabled:-1==t.amount},on:{click:function(e){e.preventDefault(),t.tokenAmount=t.amount}}},[t._v(t._s(t.amount)+" EFX")])])])]),t._v(" "),n("div",{staticClass:"field"},[n("label",{staticClass:"label",attrs:{for:""}},[t._v("Memo")]),t._v(" "),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.memo,expression:"memo"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.memo},on:{input:function(e){e.target.composing||(t.memo=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field is-grouped is-grouped-right"},[n("div",{staticClass:"control"},[n("button",{staticClass:"button is-link is-light",on:{click:function(e){return e.preventDefault(),t.clearFields()}}},[t._v("\n            Clear fields\n          ")])]),t._v(" "),n("div",{staticClass:"control"},[n("button",{staticClass:"button is-link",class:{"is-loading":t.loading},attrs:{disabled:!t.tokenAmount||!t.account,type:"submit"}},[t._v("\n            Withdraw\n          ")])])])])])])}),[],!1,null,"368b578b",null);e.default=component.exports}}]);