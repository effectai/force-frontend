[1mdiff --git a/assets/css/global.css b/assets/css/global.css[m
[1mindex 78d5be3..27422cf 100644[m
[1m--- a/assets/css/global.css[m
[1m+++ b/assets/css/global.css[m
[36m@@ -190,6 +190,11 @@[m [mp {[m
 [m
 /* Utility classes */[m
 [m
[32m+[m[32m.flex-col {[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m}[m
[32m+[m
 .text-center {[m
   text-align: center;[m
 }[m
[1mdiff --git a/components/TheHeader.vue b/components/TheHeader.vue[m
[1mindex f1b1990..8deb223 100644[m
[1m--- a/components/TheHeader.vue[m
[1m+++ b/components/TheHeader.vue[m
[36m@@ -29,6 +29,7 @@[m
           @click="router.push('/profile')"[m
         >[m
           {{ userName }}@{{ permission }}[m
[32m+[m[32m          <!-- <span class="network"><small>connected {{ network }}</small></span> -->[m
         </NuxtLink>[m
       </div>[m
     </div>[m
[36m@@ -77,4 +78,9 @@[m [mnav a.logo {[m
   color: var(--color-main);[m
   text-decoration: none;[m
 }[m
[32m+[m
[32m+[m[32m.network {[m
[32m+[m[32m  display:block;[m
[32m+[m[32m}[m
 </style>[m
[41m+[m
[1mdiff --git a/composables/useEffectClient.ts b/composables/useEffectClient.ts[m
[1mindex fa68335..cdbd0b5 100644[m
[1m--- a/composables/useEffectClient.ts[m
[1m+++ b/composables/useEffectClient.ts[m
[36m@@ -5,6 +5,8 @@[m [mimport {[m
 	type TaskIpfsError,[m
 	type Settings,[m
 	type Reservation,[m
[32m+[m	[32mtype Session,[m
[32m+[m	[32mtype Name,[m
 	createClient,[m
 	jungle4,[m
 	setSession,[m
[36m@@ -37,8 +39,6 @@[m [mimport {[m
 } from "@tanstack/vue-query";[m
 import { experimental_createPersister } from "@tanstack/query-persist-client-core";[m
 [m
[31m-import type { Name, Session } from "@wharfkit/session";[m
[31m-[m
 let effectClient: ClientStore | null;[m
 [m
 export const persister = experimental_createPersister({[m
[36m@@ -127,7 +127,7 @@[m [mexport interface ClientStore {[m
 	useSubmitTask: () => UseMutationReturnType<[m
 		Awaited<ReturnType<typeof submitTask>>,[m
 		Error,[m
[31m-		Parameters<typeof submitTask>[0],[m
[32m+[m		[32mOmit<Parameters<typeof submitTask>[0], "client">,[m
 		unknown[m
 	>;[m
 [m
[36m@@ -166,15 +166,6 @@[m [mexport const initClient = (): void => {[m
 export const createEffectClient = (): ClientStore => {[m
 	const { notify } = useNotification();[m
 [m
[31m-	/* --------- SESSION LOGIC --------- */[m
[31m-	const { sessionKit } = useSessionKit();[m
[31m-[m
[31m-	sessionKit.restore().then((restoreSession) => {[m
[31m-		if (restoreSession) {[m
[31m-			connectWallet(restoreSession).catch(console.error);[m
[31m-		}[m
[31m-	});[m
[31m-[m
 	/* --------- CLIENT --------- */[m
 [m
 	const client = shallowRef([m
[1mdiff --git a/pages/campaign/[id]/task.vue b/pages/campaign/[id]/task.vue[m
[1mindex ec6051a..fb0c6e6 100644[m
[1m--- a/pages/campaign/[id]/task.vue[m
[1m+++ b/pages/campaign/[id]/task.vue[m
[36m@@ -1,34 +1,37 @@[m
 <template>[m
[31m-  <div>[m
[31m-    <div v-if="error">[m
[31m-      error: {{ error }}[m
[31m-    </div>[m
[31m-[m
[31m-    <div v-else-if="isTemplateLoading">[m
[31m-      <div class="backdrop-loader">[m
[31m-        <div class="backdrop-loading-container">[m
[31m-          <img src="/img/logo.svg">[m
[31m-          <p class="flex-center">[m
[31m-            Loading Task Data[m
[31m-          </p>[m
[31m-          <div class="lds-ellipsis">[m
[31m-            <div />[m
[31m-            <div />[m
[31m-            <div />[m
[31m-            <div />[m
[31m-          </div>[m
[31m-        </div>[m
[31m-      </div>[m
[31m-    </div>[m
[31m-[m
[31m-    <TaskTemplate[m
[31m-      v-if="!error"[m
[31m-      v-show="!isTemplateLoading"[m
[31m-      ref="templateRef"[m
[31m-      @submit="doSubmitTask"[m
[31m-      @ready="isTemplateReady = true"[m
[31m-    />[m
[31m-  </div>[m
[32m+[m	[32m<div>[m
[32m+[m		[32m<div v-if="error" class="error">[m
[32m+[m			[32m<div class="error-container flex-center fl