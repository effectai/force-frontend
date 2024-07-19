import{g as h,o as u,c as m,a as t,r as f,F as J,w as ee,t as P,G as te,k as o,R as se,m as w,H as T,q as C,v as ae,l as O,p as oe,e as ne,_ as le,I as ie,J as re,b as L,n as ce,K as G,x as ue,L as M,$ as de,f as pe,u as me,i as fe,M as V,j as ve,d as he,N as _e,s as ge}from"./CPfDdkjt.js";const ye=`<script>
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
<\/script>`;class z{constructor(s,e={},a={},n={}){this.html=s,this.placeholders=e,this.options=a,this.info=n}render(){return this.replacePlaceholders(),this.injectJSVar("FORCE_OPTIONS",this.options),this.injectJSVar("FORCE_INFO",this.info),this.injectJSVar("FORCE_PLACEHOLDERS",this.placeholders),this.injectHTML(ye),this.wrapForm(),this.rendered}static htmlEntities(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/`/g,"&#96;")}replacePlaceholders(){this.rendered=this.html.replace(/\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g,(s,e,a)=>{if(e in this.placeholders){let n=this.placeholders[e];switch((Array.isArray(n)||n===Object(n))&&(n=JSON.stringify(n)),a){case"raw":case"html":return n;default:return z.htmlEntities(n)}}return""})}injectHTML(s,e=!1){e?this.rendered=s+this.rendered:this.rendered+=s}injectJSVar(s,e){const a=`<script>window.${s} = ${JSON.stringify(e)};<\/script>`;this.injectHTML(a,!0)}injectJSFile(s,e=!1){const a=`<script src="${s}"><\/script>`;this.injectHTML(a,e)}injectCSSFile(s,e=!1){const a=`<link rel="stylesheet" type="text/css" href="${s}">`;this.injectHTML(a,e)}wrapForm(){this.rendered=`<meta charset="UTF-8" /><style>html {overflow-y: auto !important;}</style><form id="FORCE_FORM">${this.rendered}</form>`}}const we={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},be=t("path",{fill:"currentColor",d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10M6.76 8.82l1.06-1.06l1.06 1.06l1.06-1.06L11 8.82L9.94 9.88L11 10.94L9.94 12l-1.06-1.06L7.82 12l-1.06-1.06l1.06-1.06zm.13 8.68C7.69 15.46 9.67 14 12 14s4.31 1.46 5.11 3.5zm10.35-6.56L16.18 12l-1.06-1.06L14.06 12L13 10.94l1.06-1.06L13 8.82l1.06-1.06l1.06 1.06l1.06-1.06l1.06 1.06l-1.06 1.06z"},null,-1),ke=[be],Re=h({__name:"EmoticonDead",setup(d){return(s,e)=>(u(),m("svg",we,ke))}}),Ce={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 256 256"},xe=t("path",{fill:"currentColor",d:"M216.49 191.51a12 12 0 0 1-17 17L128 137l-71.51 71.49a12 12 0 0 1-17-17l80-80a12 12 0 0 1 17 0Zm-160-63L128 57l71.51 71.52a12 12 0 0 0 17-17l-80-80a12 12 0 0 0-17 0l-80 80a12 12 0 0 0 17 17Z"},null,-1),Ee=[xe],$e=h({__name:"CaretDoubleUp",setup(d){return(s,e)=>(u(),m("svg",Ce,Ee))}}),Fe={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},Se=t("path",{fill:"currentColor","fill-rule":"evenodd",d:"M6.5 1.75a.75.75 0 0 0-1.5 0v20a.75.75 0 0 0 1.5 0V3.6z","clip-rule":"evenodd",opacity:"0.5"},null,-1),Te=t("path",{fill:"currentColor",d:"m13.349 3.79l-.204-.082a8.677 8.677 0 0 0-4.924-.452L6.5 3.6v10l1.72-.344a8.677 8.677 0 0 1 4.925.452a8.677 8.677 0 0 0 5.327.361l.214-.053a1.404 1.404 0 0 0 1.064-1.362V5.287a1.2 1.2 0 0 0-1.49-1.164a7.999 7.999 0 0 1-4.911-.334"},null,-1),Le=[Se,Te],Me=h({__name:"SolarFlag",setup(d){return(s,e)=>(u(),m("svg",Fe,Le))}}),Oe={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24"},Ie=t("path",{fill:"currentColor","fill-rule":"evenodd",d:"M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083","clip-rule":"evenodd",opacity:"0.5"},null,-1),Ne=t("path",{fill:"currentColor",d:"M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"},null,-1),De=[Ie,Ne],Ae=h({__name:"SolarSettings",setup(d){return(s,e)=>(u(),m("svg",Oe,De))}}),He={class:"title"},Ve=h({__name:"ModalConfirmPlainCss",props:{title:{}},emits:["confirm"],setup(d,{emit:s}){return f(null),f("jeffrey"),(e,a)=>(u(),J(o(se),{class:"confirm-modal","content-class":"confirm-modal-content","overlay-transition":"vfm-fade","content-transition":"vfm-fade"},{default:ee(()=>[t("h2",He,P(e.title),1),te(e.$slots,"form")]),_:3}))}}),I=d=>(oe("data-v-1aa72fc0"),d=d(),ne(),d),ze={class:"flag-form"},Be=I(()=>t("label",{for:"faulty"},"Unable to submit",-1)),je=I(()=>t("label",{for:"spam"},"Spam",-1)),Ue=I(()=>t("label",{for:"inappropriate"},"Inappropriate",-1)),Je=I(()=>t("label",{for:"other"},"Other:",-1)),Pe=h({__name:"FlagTaskForm",emits:["flag"],setup(d,{emit:s}){const e=f(null),a=f(null),n=s,x=()=>{n("flag",e.value==="other"?a.value:e.value)};return(E,i)=>(u(),m("div",null,[t("form",ze,[t("div",null,[w(t("input",{type:"radio",id:"option_1",value:"faulty","onUpdate:modelValue":i[0]||(i[0]=l=>C(e)?e.value=l:null)},null,512),[[T,o(e)]]),Be]),t("div",null,[w(t("input",{type:"radio",id:"option_2",value:"spam","onUpdate:modelValue":i[1]||(i[1]=l=>C(e)?e.value=l:null)},null,512),[[T,o(e)]]),je]),t("div",null,[w(t("input",{type:"radio",id:"option_3",value:"inappropriate","onUpdate:modelValue":i[2]||(i[2]=l=>C(e)?e.value=l:null)},null,512),[[T,o(e)]]),Ue]),t("div",null,[w(t("input",{type:"radio",id:"option_4",value:"other","onUpdate:modelValue":i[3]||(i[3]=l=>C(e)?e.value=l:null)},null,512),[[T,o(e)]]),Je,o(e)==="other"?w((u(),m("input",{key:0,type:"text","onUpdate:modelValue":i[4]||(i[4]=l=>C(a)?a.value=l:null),placeholder:"Please provide the reason."},null,512)),[[ae,o(a)]]):O("",!0)])]),t("div",{class:"button-container"},[t("input",{type:"button",class:"button",value:"Submit",onClick:x})])]))}}),Ge=le(Pe,[["__scopeId","data-v-1aa72fc0"]]),We={class:"template-wrapper"},qe={class:"taskbar-container"},Ke=["src"],Ze=h({__name:"TaskTemplate",emits:["submit","ready"],setup(d,{expose:s,emit:e}){const a=f(null),n=f(null),E=ue().public.ALTERNATIVE_FRONTEND_URL,i=f(!1),l=f(!1),v=e;s({setHtml:async r=>{a.value=null,await M(),a.value=r,await M(),v("ready")}});const F=async()=>{var r;await M(),n.value&&((r=n.value.contentWindow)==null||r.postMessage({event:"proxy-load",data:a.value},"*"))},_=r=>{const b=r.data;switch(r.data.task){case"submit":v("submit",b);break}switch(r.data.event){case"proxy-loaded":i.value=!0,v("ready");break;case"proxy-ready":F();break}};ie(()=>{window.addEventListener("message",_)});const N=r=>{v("submit",r)},{open:D,close:A}=re({component:Ve,attrs:{title:"Flag task?"},slots:{form:de({component:Ge,attrs:{onFlag(r){N(r)}}})}});return(r,b)=>{const k=$e,S=Me,H=Ae;return u(),m("div",We,[t("div",{class:ce(["taskbar",{open:o(l)}])},[L(k,{class:"open-icon",onClick:b[0]||(b[0]=B=>l.value=!o(l))}),t("div",qe,[L(S,{onClick:o(D),class:"taskbar-icon"},null,8,["onClick"]),L(H,{class:"taskbar-icon"})])],2),o(a)?w((u(),m("iframe",{key:0,id:"mediaFrame",ref_key:"mediaFrame",ref:n,src:`${o(E)}/template-proxy.html`,name:"mediaFrame",sandbox:"allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin",allow:"geolocation; microphone; camera; autoplay; fullscreen",allowFullScreen:""},null,8,Ke)),[[G,o(i)]]):O("",!0)])}}}),Qe=pe("/img/logo.svg"),Xe={key:0,class:"error"},Ye={class:"error-container flex-center flex-col"},et=t("h3",null,"Uh oh, something went wrong",-1),tt={class:"error-buttons"},st={key:1},at=_e('<div class="backdrop-loader"><div class="backdrop-loading-container"><img src="'+Qe+'"><p class="flex-center"> Loading Task Data </p><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div></div>',1),ot=[at],it=h({__name:"task",setup(d){const{vAccount:s,useCampaign:e,useReservation:a,useReserveTask:n,useSubmitTask:x,useTaskData:E}=me(),i=fe(),l=V(()=>Number(i.currentRoute.value.params.id)),v=f(!1),$=f(null),{data:F}=e(l.value),{data:_,error:N,refetch:D}=a(l),{data:A,error:r,isLoading:b}=E(_),k=V(()=>N.value||r.value),S=V(()=>b.value||B.value||q.value||!v.value),{mutateAsync:H,isPending:B}=n(),{mutateAsync:W,isPending:q}=x(),K=async(p,c)=>{var g,y;try{const R={accountId:(g=s.value)==null?void 0:g.id,campaignId:p.campaign_id,batchId:p.batch_idx,submissionId:p==null?void 0:p.id},Y=new z(c,{id:1,annotations:[],...A.value},{},R).render();await M(),v.value=!1,(y=$.value)==null||y.setHtml(Y)}catch(R){console.error(R)}};ve(()=>{var p,c,g,y;if(!(!_.value||!A.value)&&$.value&&!k.value){if(!((c=(p=F.value)==null?void 0:p.info)!=null&&c.template)){console.error("No template found in campaign");return}K(_.value,(y=(g=F.value)==null?void 0:g.info)==null?void 0:y.template)}});const Z=async p=>{if(!_.value)throw new Error("No reservation found");try{await W({data:p,reservation:_.value});try{const c=await H(l.value);await D()}catch(c){console.error("error while getting next reservation",c)}}catch(c){console.error(c)}},{notify:Q}=ge(),j=["Jeffrey","Jesse","Rochelle","Laurens","David"],U=j[Math.floor(Math.random()*j.length)],X=()=>{Q({type:"success",message:`Notified ${U}`})};return(p,c)=>{const g=Re,y=Ze;return u(),m("div",null,[o(k)?(u(),m("div",Xe,[t("div",Ye,[L(g,{class:"icon"}),et,t("div",tt,[t("button",{class:"button mt-2",onClick:c[0]||(c[0]=R=>o(i).push("/"))},"Go back"),t("button",{class:"button mt-2",onClick:X},[he("Notify "),t("u",null,P(o(U)),1)])])])])):o(S)?(u(),m("div",st,ot)):O("",!0),o(k)?O("",!0):w((u(),J(y,{key:2,ref_key:"templateRef",ref:$,onSubmit:Z,onReady:c[1]||(c[1]=R=>v.value=!0)},null,512)),[[G,!o(S)]])])}}});export{it as default};
