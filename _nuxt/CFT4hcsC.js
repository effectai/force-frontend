import{au as P,ao as z,x as O,ae as q,am as J}from"./Bk7_z8zR.js";import{g as Q,b as M,c as K,o as U,d as V,f as R,h as S,i as E,k as H}from"./DIqeZryz.js";import{a as X}from"./JiFQw_g2.js";import{u as W}from"./DNgSKQ__.js";import"./C-v3KzvZ.js";const G="memory",Y=()=>{const n=new Map;return{name:G,options:{},hasItem(e){return n.has(e)},getItem(e){return n.get(e)??null},getItemRaw(e){return n.get(e)??null},setItem(e,r){n.set(e,r)},setItemRaw(e,r){n.set(e,r)},removeItem(e){n.delete(e)},getKeys(){return Array.from(n.keys())},clear(){n.clear()},dispose(){n.clear()}}};function Z(n){return!n||typeof n.then!="function"?Promise.resolve(n):n}function h(n,...e){try{return Z(n(...e))}catch(r){return Promise.reject(r)}}function b(n){const e=typeof n;return n===null||e!=="object"&&e!=="function"}function k(n){const e=Object.getPrototypeOf(n);return!e||e.isPrototypeOf(Object)}function j(n){if(b(n))return String(n);if(k(n)||Array.isArray(n))return JSON.stringify(n);if(typeof n.toJSON=="function")return j(n.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function N(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const x="base64:";function tt(n){if(typeof n=="string")return n;N();const e=Buffer.from(n).toString("base64");return x+e}function et(n){return typeof n!="string"||!n.startsWith(x)?n:(N(),Buffer.from(n.slice(x.length),"base64"))}const rt=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function nt(n,e){if(e=$(e),!e)return n;const r={...n};for(const s of rt)r[s]=(c="",...u)=>n[s](e+c,...u);return r.getKeys=(s="",...c)=>n.getKeys(e+s,...c).then(u=>u.map(l=>l.slice(e.length))),r}function d(n){return n?n.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function it(...n){return d(n.join(":"))}function $(n){return n=d(n),n?n+":":""}const st="memory",at=()=>{const n=new Map;return{name:st,options:{},hasItem(e){return n.has(e)},getItem(e){return n.get(e)??null},getItemRaw(e){return n.get(e)??null},setItem(e,r){n.set(e,r)},setItemRaw(e,r){n.set(e,r)},removeItem(e){n.delete(e)},getKeys(){return Array.from(n.keys())},clear(){n.clear()},dispose(){n.clear()}}};function ot(n={}){const e={mounts:{"":n.driver||at()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},r=t=>{for(const i of e.mountpoints)if(t.startsWith(i))return{base:i,relativeKey:t.slice(i.length),driver:e.mounts[i]};return{base:"",relativeKey:t,driver:e.mounts[""]}},s=(t,i)=>e.mountpoints.filter(a=>a.startsWith(t)||i&&t.startsWith(a)).map(a=>({relativeBase:t.length>a.length?t.slice(a.length):void 0,mountpoint:a,driver:e.mounts[a]})),c=(t,i)=>{if(e.watching){i=d(i);for(const a of e.watchListeners)a(t,i)}},u=async()=>{if(!e.watching){e.watching=!0;for(const t in e.mounts)e.unwatch[t]=await B(e.mounts[t],c,t)}},l=async()=>{if(e.watching){for(const t in e.unwatch)await e.unwatch[t]();e.unwatch={},e.watching=!1}},g=(t,i,a)=>{const o=new Map,m=f=>{let w=o.get(f.base);return w||(w={driver:f.driver,base:f.base,items:[]},o.set(f.base,w)),w};for(const f of t){const w=typeof f=="string",_=d(w?f:f.key),y=w?void 0:f.value,v=w||!f.options?i:{...i,...f.options},I=r(_);m(I).items.push({key:_,value:y,relativeKey:I.relativeKey,options:v})}return Promise.all([...o.values()].map(f=>a(f))).then(f=>f.flat())},p={hasItem(t,i={}){t=d(t);const{relativeKey:a,driver:o}=r(t);return h(o.hasItem,a,i)},getItem(t,i={}){t=d(t);const{relativeKey:a,driver:o}=r(t);return h(o.getItem,a,i).then(m=>P(m))},getItems(t,i){return g(t,i,a=>a.driver.getItems?h(a.driver.getItems,a.items.map(o=>({key:o.relativeKey,options:o.options})),i).then(o=>o.map(m=>({key:it(a.base,m.key),value:P(m.value)}))):Promise.all(a.items.map(o=>h(a.driver.getItem,o.relativeKey,o.options).then(m=>({key:o.key,value:P(m)})))))},getItemRaw(t,i={}){t=d(t);const{relativeKey:a,driver:o}=r(t);return o.getItemRaw?h(o.getItemRaw,a,i):h(o.getItem,a,i).then(m=>et(m))},async setItem(t,i,a={}){if(i===void 0)return p.removeItem(t);t=d(t);const{relativeKey:o,driver:m}=r(t);m.setItem&&(await h(m.setItem,o,j(i),a),m.watch||c("update",t))},async setItems(t,i){await g(t,i,async a=>{if(a.driver.setItems)return h(a.driver.setItems,a.items.map(o=>({key:o.relativeKey,value:j(o.value),options:o.options})),i);a.driver.setItem&&await Promise.all(a.items.map(o=>h(a.driver.setItem,o.relativeKey,j(o.value),o.options)))})},async setItemRaw(t,i,a={}){if(i===void 0)return p.removeItem(t,a);t=d(t);const{relativeKey:o,driver:m}=r(t);if(m.setItemRaw)await h(m.setItemRaw,o,i,a);else if(m.setItem)await h(m.setItem,o,tt(i),a);else return;m.watch||c("update",t)},async removeItem(t,i={}){typeof i=="boolean"&&(i={removeMeta:i}),t=d(t);const{relativeKey:a,driver:o}=r(t);o.removeItem&&(await h(o.removeItem,a,i),(i.removeMeta||i.removeMata)&&await h(o.removeItem,a+"$",i),o.watch||c("remove",t))},async getMeta(t,i={}){typeof i=="boolean"&&(i={nativeOnly:i}),t=d(t);const{relativeKey:a,driver:o}=r(t),m=Object.create(null);if(o.getMeta&&Object.assign(m,await h(o.getMeta,a,i)),!i.nativeOnly){const f=await h(o.getItem,a+"$",i).then(w=>P(w));f&&typeof f=="object"&&(typeof f.atime=="string"&&(f.atime=new Date(f.atime)),typeof f.mtime=="string"&&(f.mtime=new Date(f.mtime)),Object.assign(m,f))}return m},setMeta(t,i,a={}){return this.setItem(t+"$",i,a)},removeMeta(t,i={}){return this.removeItem(t+"$",i)},async getKeys(t,i={}){t=$(t);const a=s(t,!0);let o=[];const m=[];for(const f of a){const _=(await h(f.driver.getKeys,f.relativeBase,i)).map(y=>f.mountpoint+d(y)).filter(y=>!o.some(v=>y.startsWith(v)));m.push(..._),o=[f.mountpoint,...o.filter(y=>!y.startsWith(f.mountpoint))]}return t?m.filter(f=>f.startsWith(t)&&!f.endsWith("$")):m.filter(f=>!f.endsWith("$"))},async clear(t,i={}){t=$(t),await Promise.all(s(t,!1).map(async a=>{if(a.driver.clear)return h(a.driver.clear,a.relativeBase,i);if(a.driver.removeItem){const o=await a.driver.getKeys(a.relativeBase||"",i);return Promise.all(o.map(m=>a.driver.removeItem(m,i)))}}))},async dispose(){await Promise.all(Object.values(e.mounts).map(t=>D(t)))},async watch(t){return await u(),e.watchListeners.push(t),async()=>{e.watchListeners=e.watchListeners.filter(i=>i!==t),e.watchListeners.length===0&&await l()}},async unwatch(){e.watchListeners=[],await l()},mount(t,i){if(t=$(t),t&&e.mounts[t])throw new Error(`already mounted at ${t}`);return t&&(e.mountpoints.push(t),e.mountpoints.sort((a,o)=>o.length-a.length)),e.mounts[t]=i,e.watching&&Promise.resolve(B(i,c,t)).then(a=>{e.unwatch[t]=a}).catch(console.error),p},async unmount(t,i=!0){t=$(t),!(!t||!e.mounts[t])&&(e.watching&&t in e.unwatch&&(e.unwatch[t](),delete e.unwatch[t]),i&&await D(e.mounts[t]),e.mountpoints=e.mountpoints.filter(a=>a!==t),delete e.mounts[t])},getMount(t=""){t=d(t)+":";const i=r(t);return{driver:i.driver,base:i.base}},getMounts(t="",i={}){return t=d(t),s(t,i.parents).map(o=>({driver:o.driver,base:o.mountpoint}))}};return p}function B(n,e,r){return n.watch?n.watch((s,c)=>e(s,r+c)):()=>{}}async function D(n){typeof n.dispose=="function"&&await h(n.dispose)}function ut(n={}){const e=ct(r,n.operators);function r(s,c){return typeof c!="object"||c instanceof RegExp?e.$eq(s,c):Object.keys(c||{}).every(u=>{const l=c[u];if(u.startsWith("$")&&e[u]){const g=e[u];return typeof g=="function"?g(s,l):!1}return r(Q(s,u),l)})}return r}function ct(n,e={}){return{$match:(r,s)=>n(r,s),$eq:(r,s)=>s instanceof RegExp?s.test(r):r===s,$ne:(r,s)=>s instanceof RegExp?!s.test(r):r!==s,$not:(r,s)=>!n(r,s),$and:(r,s)=>(M(s,"$and requires an array as condition"),s.every(c=>n(r,c))),$or:(r,s)=>(M(s,"$or requires an array as condition"),s.some(c=>n(r,c))),$in:(r,s)=>K(s).some(c=>Array.isArray(r)?n(r,{$contains:c}):n(r,c)),$contains:(r,s)=>(r=Array.isArray(r)?r:String(r),K(s).every(c=>r.includes(c))),$icontains:(r,s)=>{if(typeof s!="string")throw new TypeError("$icontains requires a string, use $contains instead");return r=String(r).toLocaleLowerCase(),K(s).every(c=>r.includes(c.toLocaleLowerCase()))},$containsAny:(r,s)=>(M(s,"$containsAny requires an array as condition"),r=Array.isArray(r)?r:String(r),s.some(c=>r.includes(c))),$exists:(r,s)=>s?typeof r<"u":typeof r>"u",$type:(r,s)=>typeof r===String(s),$regex:(r,s)=>{if(!(s instanceof RegExp)){const c=String(s).match(/\/(.*)\/([dgimsuy]*)$/);s=c!=null&&c[1]?new RegExp(c[1],c[2]||""):new RegExp(s)}return s.test(String(r||""))},$lt:(r,s)=>r<s,$lte:(r,s)=>r<=s,$gt:(r,s)=>r>s,$gte:(r,s)=>r>=s,...e||{}}}function lt(n){const e=ut(),r=(u,{query:l,before:g,after:p})=>{const t=typeof l=="string"?{_path:l}:l,i=u.findIndex(o=>e(o,t));g=g??1,p=p??1;const a=new Array(g+p).fill(null,0);return i===-1?a:a.map((o,m)=>u[i-g+m+ +(m>=g)]||null)},s=[(u,l)=>{const g=u.result.filter(p=>K(l.where).every(t=>e(p,t)));return{...u,result:g,total:g.length}},(u,l)=>K(l.sort).forEach(g=>V(u.result,g)),function(l,g,p){var t;if(g.surround){let i=r(((t=l.result)==null?void 0:t.length)===1?p:l.result,g.surround);i=R(S(g.without))(i),i=R(E(g.only))(i),l.surround=i}return l}],c=[(u,l)=>{if(l.skip)return{...u,result:u.result.slice(l.skip),skip:l.skip}},(u,l)=>{if(l.limit)return{...u,result:u.result.slice(0,l.limit),limit:l.limit}},function(l,g,p){var t,i,a;if(g.dirConfig){const o=((t=l.result[0])==null?void 0:t._path)||((a=(i=g.where)==null?void 0:i.find(m=>m._path))==null?void 0:a._path);if(typeof o=="string"){const m=p.find(f=>f._path===z(o,"_dir"));m&&(l.dirConfig={_path:m._path,...S(["_"])(m)})}}return l},(u,l)=>({...u,result:R(S(l.without))(u.result)}),(u,l)=>({...u,result:R(E(l.only))(u.result)})];return async u=>{const l=await n(),g=u.params(),p={result:l,limit:0,skip:0,total:l.length},t=s.reduce((a,o)=>o(a,g,l)||a,p);if(g.count)return{result:t.result.length};const i=c.reduce((a,o)=>o(a,g,l)||a,t);return g.first?{...U(["skip","limit","total"])(i),result:i.result[0]}:i}}function L(n){const e=lt(n);return async r=>{var u;r.params().first&&r.withDirConfig();const s=r.params(),c=await e(r);return s.surround?c==null?void 0:c.surround:(c!=null&&c.dirConfig&&(c.result={_path:(u=c.dirConfig)==null?void 0:u._path,...c.result,_dir:c.dirConfig}),c==null?void 0:c.result)}}function ft(n,e){const{navigation:r}=O().public.content;if(r===!1)return[];const s=u=>({...gt(["title",...r.fields])(u),...pt(u==null?void 0:u.navigation)?u.navigation:{}}),c=n.sort((u,l)=>u._path.localeCompare(l._path)).reduce((u,l)=>{var m;const g=l._path.substring(1).split("/"),p=l._id.split(":").slice(1),t=!!((m=p[p.length-1])!=null&&m.match(/([1-9][0-9]*\.)?index.md/g)),i=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...s(f),...f._draft?{_draft:!0}:{}}),a=i(l);if(t){const f=e[a._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return u;if(l._path!=="/"){const w=i(l);a.children.push(w)}f&&Object.assign(a,s(f))}return g.length===1?(u.push(a),u):(g.slice(0,-1).reduce((f,w,_)=>{const y="/"+g.slice(0,_+1).join("/"),v=e[y];if(typeof(v==null?void 0:v.navigation)<"u"&&!v.navigation)return[];let I=f.find(F=>F._path===y);return I||(I={title:X(w),_path:y,_file:l._file,children:[],...v&&s(v)},f.push(I)),I.children},u).push(a),u)},[]);return T(c)}const mt=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function T(n){var r;n.forEach(s=>{s._file=s._file.split(".").slice(0,-1).join(".")});const e=n.sort((s,c)=>mt.compare(s._file,c._file));for(const s of e)(r=s.children)!=null&&r.length?T(s.children):delete s.children,delete s._file;return n}function gt(n){return e=>(e=e||{},n&&n.length?n.filter(r=>typeof e[r]<"u").reduce((r,s)=>Object.assign(r,{[s]:e[s]}),{}):e)}function pt(n){return Object.prototype.toString.call(n)==="[object Object]"}const ht=n=>J(n,O().public.content.api.baseURL),wt=nt(ot({driver:Y()}),"@content");function dt(n){async function e(){const r=new Set(await n.getKeys("cache:")),s=W().getPreviewToken();if(s){const u=await n.getItem(`${s}$`).then(p=>p||{});if(Array.isArray(u.ignoreSources)){const p=u.ignoreSources.map(t=>`cache:${t.trim()}:`);for(const t of r)p.some(i=>t.startsWith(i))&&r.delete(t)}const l=await n.getKeys(`${s}:`),g=await Promise.all(l.map(p=>n.getItem(p)));for(const p of g)r.delete(`cache:${p._id}`),p.__deleted||r.add(`${s}:${p._id}`)}return await Promise.all(Array.from(r).map(u=>n.getItem(u)))}return{storage:n,fetch:L(e),query:r=>H(L(e),{initialParams:r,legacy:!0})}}let C=null,A=null;async function yt(){return A?await A:C||(A=vt(),C=await A),C}async function vt(){const n=q(),{content:e}=O().public,r=dt(wt),s=await r.storage.getItem("integrity");if(e.integrity!==+(s||0)){const{contents:c,navigation:u}=await $fetch(ht(e.integrity?`cache.${e.integrity}.json`:"cache.json"));await Promise.all(c.map(l=>r.storage.setItem(`cache:${l._id}`,l))),await r.storage.setItem("navigation",u),await r.storage.setItem("integrity",e.integrity)}return await n.callHook("content:storage",r.storage),r}async function Rt(n){const e=await yt();if(!W().getPreviewToken()&&Object.keys(n||{}).length===0)return e.storage.getItem("navigation");const r=await e.query(n).where({_partial:!1,navigation:{$ne:!1}}).find(),c=(await e.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((u,l)=>{var p;((p=l.title)==null?void 0:p.toLowerCase())==="dir"&&(l.title=void 0);const g=l._path.split("/").slice(0,-1).join("/")||"/";return u[g]={...l,...l.body},u},{});return ft(r,c)}export{wt as contentStorage,dt as createDB,Rt as generateNavigation,yt as useContentDatabase};
