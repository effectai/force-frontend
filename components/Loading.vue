<template>
  <div :class="{fullscreen}">
    <img src="~assets/img/loading.svg">
    <p>Loading</p>
  </div>
</template>

<script>
export default {
  props: ['fullscreen']
}
</script>

<style scoped lang="scss">
div {
    text-align: center;
}
   p {
       color: $force-color;
       font-size: 30px;
       &:after {
        content: '.';
        animation: dots 1.5s steps(5, end) infinite;
        }
        padding-right: 10px;
   }

@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: $force-color;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 $force-color,
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 $force-color,
      .5em 0 0 $force-color;}}
  .fullscreen {
    position: fixed;
    backdrop-filter: blur(2px);
    z-index: 31;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(white, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
  }
</style>
