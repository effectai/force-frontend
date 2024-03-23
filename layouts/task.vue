<template>
<div id="layout">
  <TheHeader/>
    <div>
        <slot />
    </div>
</div>
</template>

<style>
body, #__nuxt, #layout, #layout > div {
  height:100%;
  overflow:hidden
}

</style>
