<template>
<div id="layout">
    <nav class="task-nav">
	<NuxtLink to="/" class="back">
	    <img src="/img/effect-logo-black.png" style="height: 35px;" />
	    <h1><strong>Working</strong></h1>
	</NuxtLink>

	<div class="user" v-if="!userLoggedIn">
	    <NuxtLink to="/" class="connect"  @click="connectWallet()">
		<div>Get Support</div>
	    </NuxtLink>
	</div>
	<div v-else class="user">
	    <span class="profile">{{ userName }}</span>
	</div>
    </nav>

    <section class="layout-slot">
        <slot />
    </section>
</div>
</template>

<style>
nav.task-nav {
  background-color: var(--c-pink-1);
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 0;
  display: flex;
}
nav .user {
  margin-left: auto;
  padding: 0 1.45rem;  
  align-self: center;
  color: var(--fontColor);
  border-left: 1px solid var(--c-border);
  align-self: stretch;
  display: flex;
  align-items: center;
}
nav .user .connect {
  font-size: 1em;
}
nav .user .profile {
}
.back h1 {
  padding: 0.75rem 0;
  color: var(--fontColor);
  text-decoration: none;
  font-weight: normal;
  font-size: 1em;
  margin: 0;

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
#layout { height: 100%; display: flex; flex-direction: column; }
.layout-slot { flex: 1; }

</style>
