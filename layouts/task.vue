<template>
<div id="layout">
    <nav class="task-nav">
	<!-- <NuxtLink to="/" class="back">
	    <img src="/img/effect-logo-black.png" style="height: 35px;" />
	    <h1><strong>Working</strong></h1>
	</NuxtLink>

	<div class="user" v-if="!userLoggedIn">
	    <NuxtLink to="/" class="connect"  @click="connectWallet()">
	    </NuxtLink>
	</div>
	<div v-else class="user">
	    <span class="profile">{{ userName }}</span>
	</div>
   -->
    </nav>

    <section class="layout-slot">
        <slot />
    </section>
</div>
</template>

<style>
/* nav.task-nav {
  display: flex;
  margin-bottom: 0;
  background-color: var(--c-pink-1);
  border-bottom: 1px solid var(--c-border);
  transition: background 15s linear;
}
nav .user {
  display: flex;
  align-items: center;  
  align-self: center;
  align-self: stretch;
  padding: 0 1.45rem;
  margin-left: auto;
  color: var(--fontColor);
  border-left: 1px solid var(--c-border);
}
nav .user .connect {
  font-size: 1em;
}
.back h1 {
  padding: 0.75rem 0;
  margin: 0;
  font-size: 1em;
  font-weight: normal;
  color: var(--fontColor);
  text-decoration: none;

}
a.back {
  text-decoration: none;
}
a.logo {
  text-decoration: none;
}
.back {
  display: flex;
  align-items: center;
}
.back img {
  margin: 0 0.45rem;  
}

#__nuxt { height: 100%; }
#layout { display: flex; flex-direction: column; height: 100%; }
.layout-slot { flex: 1; } */

</style>
