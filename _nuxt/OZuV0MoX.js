import{g as v,o as c,c as p,a as t,r as f,F as W,w as se,t as z,G as ae,k as o,R as oe,m as h,H as T,q as b,v as ne,l as M,p as le,e as ie,_ as re,I as ce,J as ue,b as L,n as de,K as q,x as pe,$ as me,L as B,f as fe,u as ve,i as he,M as V,j as _e,d as ge,N as ye,s as we}from"./Df8CzY1l.js";const be=`<script>
window.addEventListener('message', function(event) {
    const data = event.data;
    switch ( data.task ) { // postMessage tasks
      case 'print' :
        console.log("received message from frontend:");
        console.log(data.message);
        break;
      case 'key' :
        const event = new KeyboardEvent('keydown', {key: data.key});
        document.dispatchEvent(event);
        break;
      case 'submit' :
        let button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('id', 'FORCE_FORM-submit');
        button.setAttribute('name', 'FORCE_FORM-submit');
        let form =  document.getElementById('FORCE_FORM');
        form.appendChild(button);
        button.click();
        form.removeChild(button);
        break;
      case 'results' :
        if (typeof forceResults === "function") {
          forceResults(data.value);
        } else {
          forceDefaultResults(data.value);
        }
        break;
    }
});

function forceDefaultResults(results) {
  if (typeof results === 'string') results = JSON.parse(results);
  for(let key of Object.keys(results)) {
    let input = document.getElementsByName(key)[0];
    if(!input) {
      input = document.getElementById(key);
      if(!input) {
        continue;
      }
    }
    input.disabled = true;
    if(input.type === 'file') {
      // Skip files for now..
      continue;
    } else if(input.type === 'select-multiple') {
      Array.from(input.options).forEach(function(opt){
        if(results[key].includes(opt.value)) {
          opt.selected = true;
        }
      });
      input.dispatchEvent(new Event('change'))
    } else {
      input.value = results[key];
      if (input.type === 'select-one') {
        input.dispatchEvent(new Event('change'))
      } else {
        input.dispatchEvent(new Event('input'))
      }
    }
  }
}

function forceSubmit() {
  let button = document.createElement('input');
  button.setAttribute('type', 'submit');
  let form =  document.getElementById('FORCE_FORM');
  form.appendChild(button);
  button.click();
  form.removeChild(button);
}

var rtime;
var resizeCount = 0;
var delta = 100;

function forceResize() {
  // wait for cooloff period
  if (!rtime || new Date() - rtime > delta) {
    resizeCount++;
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    parent.postMessage({'task': 'setHeight', 'height': height}, '*');
    // start cooloff period when we resized more than 5 times
    if (resizeCount > 5) {
      resizeCount = 0;
      rtime = new Date();
    }
  }
}

function forceOnload() {
  forceResize();

  document.getElementById('FORCE_FORM').addEventListener("submit", async function(event) {
    event.preventDefault();
    let values = {};
    if (typeof forceInput === "function") {
      values = await forceInput(event);
    } else {
      const inputs = event.target.elements;
      for (let index = 0; index < inputs.length; ++index) {
        if (!inputs[index].name.startsWith('FORCE_')) {
          let value;
          const field = inputs[index];
          const key = field.name || field.id;
          if (!key) continue;
          switch (field.type) {
            case 'checkbox':
              if (!field.checked) continue;
              value = field.value;
              break;
            case 'submit':
              // submit not yet supported
              continue;
            case 'file':
              delete(inputs[index])
              break;
            case 'radio':
              if (!field.checked) continue;
              value = field.value;
              break;
            case 'select-multiple':
              value = Array.from(inputs[index].options).filter(opt => opt.selected).map(opt => opt.value);
              break;
            default:
              value = inputs[index].value;
          }
          if (key in values) {
            if (Array.isArray(values[key])) {
              // We already have an array with values, push new value to array
              values[key].push(value);
            } else {
              // multiple values same key, create array
              values[key] = [values[key], value];
            }
          } else {
            values[key] = value;
          }
        }
      }
    }
    if (typeof forceBeforeSubmit === "function") {
      values = await forceBeforeSubmit(values, event);
    }
    parent.postMessage({'task': 'submit', 'values': values}, '*');
    return false;
  });
}

// Force onload and resize
window.addEventListener("load", forceOnload, false);
window.addEventListener("resize", forceResize, false);
setInterval(forceResize, 1000)
<\/script>`;class j{constructor(s,e={},a={},n={}){this.html=s,this.placeholders=e,this.options=a,this.info=n}render(){return this.replacePlaceholders(),this.injectJSVar("FORCE_OPTIONS",this.options),this.injectJSVar("FORCE_INFO",this.info),this.injectJSVar("FORCE_PLACEHOLDERS",this.placeholders),this.injectHTML(be),this.wrapForm(),this.rendered}static htmlEntities(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/`/g,"&#96;")}replacePlaceholders(){this.rendered=this.html.replace(/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g,(s,e,a)=>{if(e in this.placeholders){let n=this.placeholders[e];switch((Array.isArray(n)||n===Object(n))&&(n=JSON.stringify(n)),a){case"raw":case"html":return n;default:return j.htmlEntities(n)}}return""})}injectHTML(s,e=!1){e?this.rendered=s+this.rendered:this.rendered+=s}injectJSVar(s,e){const a=`<script>window.${s} = ${JSON.stringify(e)};<\/script>`;this.injectHTML(a,!0)}injectJSFile(s,e=!1){const a=`<script src="${s}"><\/script>`;this.injectHTML(a,e)}injectCSSFile(s,e=!1){const a=`<link rel="stylesheet" type="text/css" href="${s}">`;this.injectHTML(a,e)}wrapForm(){this.rendered=`<meta charset="UTF-8" /><style>html {overflow-y: auto !important;}</style><form id="FORCE_FORM">${this.rendered}</form>`}}const ke={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},Ee=t("path",{fill:"currentColor",d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10M6.76 8.82l1.06-1.06l1.06 1.06l1.06-1.06L11 8.82L9.94 9.88L11 10.94L9.94 12l-1.06-1.06L7.82 12l-1.06-1.06l1.06-1.06zm.13 8.68C7.69 15.46 9.67 14 12 14s4.31 1.46 5.11 3.5zm10.35-6.56L16.18 12l-1.06-1.06L14.06 12L13 10.94l1.06-1.06L13 8.82l1.06-1.06l1.06 1.06l1.06-1.06l1.06 1.06l-1.06 1.06z"},null,-1),Re=[Ee],Ce=v({__name:"EmoticonDead",setup(d){return(s,e)=>(c(),p("svg",ke,Re))}}),xe={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 256 256"},$e=t("path",{fill:"currentColor",d:"M216.49 191.51a12 12 0 0 1-17 17L128 137l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0Zm-160-63L128 57l71.51 71.52a12 12 0 0 0 17-17l-80-80a12 12 0 0 0-17 0l-80 80a12 12 0 0 0 17 17Z"},null,-1),Fe=[$e],Se=v({__name:"CaretDoubleUp",setup(d){return(s,e)=>(c(),p("svg",xe,Fe))}}),Te={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},Le=t("path",{fill:"currentColor","fill-rule":"evenodd",d:"M6.5 1.75a.75.75 0 0 0-1.5 0v20a.75.75 0 0 0 1.5 0V3.6z","clip-rule":"evenodd",opacity:"0.5"},null,-1),Me=t("path",{fill:"currentColor",d:"m13.349 3.79l-.204-.082a8.677 8.677 0 0 0-4.924-.452L6.5 3.6v10l1.72-.344a8.677 8.677 0 0 1 4.925.452a8.677 8.677 0 0 0 5.327.361l.214-.053a1.404 1.404 0 0 0 1.064-1.362V5.287a1.2 1.2 0 0 0-1.49-1.164a7.999 7.999 0 0 1-4.911-.334"},null,-1),Oe=[Le,Me],Ie=v({__name:"SolarFlag",setup(d){return(s,e)=>(c(),p("svg",Te,Oe))}}),Ne={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},De=t("path",{fill:"currentColor","fill-rule":"evenodd",d:"M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083","clip-rule":"evenodd",opacity:"0.5"},null,-1),Ae=t("path",{fill:"currentColor",d:"M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"},null,-1),He=[De,Ae],Ve=v({__name:"SolarSettings",setup(d){return(s,e)=>(c(),p("svg",Ne,He))}}),ze={class:"title"},Be=v({__name:"ModalConfirmPlainCss",props:{title:{}},emits:["confirm"],setup(d,{emit:s}){return f(null),f("jeffrey"),(e,a)=>(c(),W(o(oe),{class:"confirm-modal","content-class":"confirm-modal-content","overlay-transition":"vfm-fade","content-transition":"vfm-fade"},{default:se(()=>[t("h2",ze,z(e.title),1),ae(e.$slots,"form")]),_:3}))}}),O=d=>(le("data-v-1aa72fc0"),d=d(),ie(),d),je={class:"flag-form"},Ue=O(()=>t("label",{for:"faulty"},"Unable to submit",-1)),Je=O(()=>t("label",{for:"spam"},"Spam",-1)),Pe=O(()=>t("label",{for:"inappropriate"},"Inappropriate",-1)),Ge=O(()=>t("label",{for:"other"},"Other:",-1)),We=v({__name:"FlagTaskForm",emits:["flag"],setup(d,{emit:s}){const e=f(null),a=f(null),n=s,k=()=>{n("flag",e.value==="other"?a.value:e.value)};return(E,i)=>(c(),p("div",null,[t("form",je,[t("div",null,[h(t("input",{type:"radio",id:"option_1",value:"faulty","onUpdate:modelValue":i[0]||(i[0]=l=>b(e)?e.value=l:null)},null,512),[[T,o(e)]]),Ue]),t("div",null,[h(t("input",{type:"radio",id:"option_2",value:"spam","onUpdate:modelValue":i[1]||(i[1]=l=>b(e)?e.value=l:null)},null,512),[[T,o(e)]]),Je]),t("div",null,[h(t("input",{type:"radio",id:"option_3",value:"inappropriate","onUpdate:modelValue":i[2]||(i[2]=l=>b(e)?e.value=l:null)},null,512),[[T,o(e)]]),Pe]),t("div",null,[h(t("input",{type:"radio",id:"option_4",value:"other","onUpdate:modelValue":i[3]||(i[3]=l=>b(e)?e.value=l:null)},null,512),[[T,o(e)]]),Ge,o(e)==="other"?h((c(),p("input",{key:0,type:"text","onUpdate:modelValue":i[4]||(i[4]=l=>b(a)?a.value=l:null),placeholder:"Please provide the reason."},null,512)),[[ne,o(a)]]):M("",!0)])]),t("div",{class:"button-container"},[t("input",{type:"button",class:"button",value:"Submit",onClick:k})])]))}}),qe=re(We,[["__scopeId","data-v-1aa72fc0"]]),Ke={class:"template-wrapper"},Ze={class:"taskbar-container"},Qe=["src"],Xe=v({__name:"TaskTemplate",emits:["submit","ready"],setup(d,{expose:s,emit:e}){const a=f(null),n=f(null),E=pe().public.ALTERNATIVE_FRONTEND_URL,i=f(!1),l=f(!1),_=e;s({setHtml:r=>{a.value=r}});const C=async()=>{var r;await B(),n.value&&((r=n.value.contentWindow)==null||r.postMessage({event:"proxy-load",data:a.value},"*"))},m=r=>{const g=r.data;switch(r.data.task){case"submit":_("submit",g);break}switch(r.data.event){case"proxy-loaded":i.value=!0,_("ready");break;case"proxy-ready":C();break}};ce(()=>{window.addEventListener("message",m)});const I=r=>{_("submit",r)},{open:N,close:D}=ue({component:Be,attrs:{title:"Flag task?"},slots:{form:me({component:qe,attrs:{onFlag(r){I(r)}}})}});return(r,g)=>{const y=Se,x=Ie,A=Ve;return c(),p("div",Ke,[t("div",{class:de(["taskbar",{open:o(l)}])},[L(y,{class:"open-icon",onClick:g[0]||(g[0]=U=>l.value=!o(l))}),t("div",Ze,[L(x,{onClick:o(N),class:"taskbar-icon"},null,8,["onClick"]),L(A,{class:"taskbar-icon"})])],2),o(a)?h((c(),p("iframe",{key:0,id:"mediaFrame",ref_key:"mediaFrame",ref:n,src:`${o(E)}/template-proxy.html`,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},null,8,Qe)),[[q,o(i)]]):M("",!0)])}}}),Ye=fe("/img/logo.svg"),et={key:0,class:"error"},tt={class:"error-container flex-center flex-col"},st=t("h3",null,"Uh oh, something went wrong",-1),at={class:"error-buttons"},ot={key:1},nt=ye('<div class="backdrop-loader"><div class="backdrop-loading-container"><img src="'+Ye+'"><p class="flex-center"> Loading Task Data </p><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div></div>',1),lt=[nt],ct=v({__name:"task",setup(d){const{vAccount:s,useCampaign:e,useReservation:a,useReserveTask:n,useSubmitTask:k,useTaskData:E}=ve(),i=he(),l=V(()=>Number(i.currentRoute.value.params.id)),_=f(!1),R=f(null),{data:C}=e(l.value),{data:m,error:I,refetch:N}=a(l),{data:D,error:r,isLoading:g}=E(m),y=V(()=>I.value||r.value),x=V(()=>g.value||U.value||Z.value||!_.value),{mutateAsync:A,isPending:U}=n(),{mutateAsync:K,isPending:Z}=k(),Q=async()=>{var w,u,$,F,S,G;try{if(!m.value)throw new Error("No reservation found");if(!((u=(w=C.value)==null?void 0:w.info)!=null&&u.template))throw new Error("No template found");const H={accountId:($=s.value)==null?void 0:$.id,campaignId:(F=m.value)==null?void 0:F.campaign_id,batchId:(S=m.value)==null?void 0:S.batch_idx,submissionId:(G=m.value)==null?void 0:G.id},te=new j(C.value.info.template,{id:1,annotations:[],...D.value},{},H).render();if(await B(),!R.value)throw new Error("Template reference not found");R.value.setHtml(te)}catch(H){console.error(H)}},X=async w=>{if(!m.value)throw new Error("No reservation found");try{await K({data:w,reservation:m.value});try{const u=await A(l.value);await N()}catch(u){console.error("error while getting next reservation",u)}}catch(u){console.error(u)}};_e(async()=>{!m.value||!D.value||y.value||(await B(),Q())});const{notify:Y}=we(),J=["Jeffrey","Jesse","Rochelle","Laurens","David"],P=J[Math.floor(Math.random()*J.length)],ee=()=>{Y({type:"success",message:`Notified ${P}`})};return(w,u)=>{const $=Ce,F=Xe;return c(),p("div",null,[o(y)?(c(),p("div",et,[t("div",tt,[L($,{class:"icon"}),st,t("p",null,z(o(y)),1),t("div",at,[t("button",{class:"button mt-2",onClick:u[0]||(u[0]=S=>o(i).push("/"))},"Go back"),t("button",{class:"button mt-2",onClick:ee},[ge("Notify "),t("u",null,z(o(P)),1)])])])])):o(x)?(c(),p("div",ot,lt)):M("",!0),o(y)?M("",!0):h((c(),W(F,{key:2,ref_key:"templateRef",ref:R,onSubmit:X,onReady:u[1]||(u[1]=S=>_.value=!0)},null,512)),[[q,!o(x)]])])}}});export{ct as default};
