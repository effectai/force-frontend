<template>
  <div class="main">
    <Teleport v-if="showSidebar" :to="'body'">
      <div class="popover-container">
        <div class="modal-backdrop"></div>
        <div class="popover">
          <Sidebar />
          <div>
            <button @click="closeSidebar">close</button>
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

</style>