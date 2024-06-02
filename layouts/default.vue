<template>
  <div class="main">
    <Teleport v-if="showSidebar" :to="'body'">
      <div class="popover-container">
        <div class="modal-backdrop"></div>
        <div class="popover">
        <Transition name="fade" mode="out-in" appear>
          <Sidebar  v-if="showSidebar"/>
        </Transition>
          <div>
            <button @click="closeSidebar" class="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383 512" fill="white" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true" data-slot="icon" class="" width="20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    <div class="layout-container">
      <Sidebar />
      <div class="main-content">
        <TheHeader @open-sidebar="openSidebar"/>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const showSidebar = ref(false)

const openSidebar = () => {
  showSidebar.value = true
  // add overflow hidden to html
  document.documentElement.style.overflow = 'hidden'
}

const closeSidebar = () => {
  showSidebar.value = false

  // remove overflow hidden from html
  document.documentElement.style.overflow = 'auto'
}
</script>

<style scoped>

@media screen and (min-width: 1440px) {
  .burger-button {
    display: none;
  }

  .popover-container {
    display: none;
  }
}

.popover {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  width: 100vw;
  height: 100vh;
  transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.popover-container .popover .sidebar {
  display: block;
  width: 250px;
  padding: 20px;
  background-color: white;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

h4 {
  font-weight: bold !important;
  color: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from {
  opacity: 1;
  transform: translateX(-100%);
}

</style>