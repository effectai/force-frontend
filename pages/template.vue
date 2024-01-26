<template>
  <div class="template-wrapper">
    <div v-if="loading" class="loading-text subtitle">
      Loading
    </div>
    <iframe
      v-if="html"
      id="mediaFrame"
      ref="mediaFrame"
      style="min-height: 100%; box-sizing: border-box; margin: 0;"
      :srcdoc="html"
      name="mediaFrame"
      sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin"
      allow="geolocation; microphone; camera; autoplay; fullscreen"
      allowFullScreen
      @load="mediaFrameLoaded"
    />
  </div>
</template>

<script>
definePageMeta({
    middleware: 'auth',
    layout: 'empty'
})


export default {
  data () {
    return {
      loading: true,
      html: null
    }
  },
  mounted () {
    document.addEventListener('keydown', this.sendKeyEvents)
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('message', this.communicateWithIframe)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.communicateWithIframe)
    document.removeEventListener('keydown', this.sendKeyEvents)
  },
  methods: {
    mediaFrameLoaded () {
      this.loading = false
      const frame = document.getElementById('mediaFrame')

      frame.contentWindow.postMessage({ task: 'template', value: this.html }, '*')
      this.$emit('templateLoaded')
    },
    sendKeyEvents (e) {
      const frame = document.getElementById('mediaFrame')
      if (frame) {
        frame.contentWindow.postMessage({ task: 'key', key: e.key }, '*')
      }
    },
    communicateWithIframe (event) {
      // TODO: check if sender of event is template iframe
      const data = event.data
      switch (data.task) { // postMessage tasks
        case 'template':
          this.html = data.value
          break
        case 'setHeight':
          // eslint-disable-next-line no-case-declarations
          const frame = document.getElementById('mediaFrame')
          frame.height = (data.height) + 'px'
          parent.postMessage(data, '*')
          break
        case 'submit':
          // TaskContent handles submit
          parent.postMessage(data, '*')
          break
        case 'key':
        case 'results':
          // eslint-disable-next-line no-case-declarations
          const mediaFrame = document.getElementById('mediaFrame')
          mediaFrame.contentWindow.postMessage(data, '*')
          break
      }
    }
  }
}
</script>
<style>
html {
  overflow-y: auto !important;
}
#__layout {
  line-height:0;
}
.template-wrapper {
  width: 100%;
  height: 100%;
}
#mediaFrame {
  width: 100%;
  border: none;
}
</style>