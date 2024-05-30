<template>
  <nav>
    <div class="container">
      <div class="burger-button">
        <button @click="emits('openSidebar')" type="button" class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true" data-slot="icon" class="" width="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5">
            </path>
          </svg></button>
      </div>
   
      <div v-if="!isLoggedIn">
        <button
          class="button"
          to="/"
          @click="connectWallet()"
        >
          connect
        </button>
      </div>

      <div
        v-else
        class=""
      >
        <NuxtLink
          to="/"
          class=""
          @click="router.push('/profile')"
        >
          {{ userName }}@{{ permission }}
          <!-- <span class="network"><small>connected {{ network }}</small></span> -->
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

const { connectWallet, isLoggedIn, userName, permission } = useEffectClient();

const emits = defineEmits(['openSidebar']);

const router = useRouter();
</script>

<style scoped>

@media screen and (min-width: 1440px) {
  .burger-button {
    display: none;
  }

  nav .container {
    justify-content: flex-end !important;
  }
}

nav {
  position: sticky;
  top:0;
  z-index: 1;
  width: 100%;
  margin-bottom:20px;
}

nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}

/* Logo styling */

nav .logo {
  display: flex;
  align-items: center;

  span {
    color: black;
  }
}

nav .logo img {
  width: 32px;
  margin-right: 10px;
}

nav a.logo {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--color-main);
  text-decoration: none;
}

.network {
  display:block;
}
</style>

