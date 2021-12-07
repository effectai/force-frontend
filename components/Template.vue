<template>
  <div class="template-wrapper">
    <div v-if="loading">
      Loading..
    </div>
    <!-- TODO: add polyfill for srcdoc or move to different URL and use src -->
    <iframe
      id="mediaFrame"
      ref="mediaFrame"
      :srcdoc="html"
      name="mediaFrame"
      sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-pointer-lock allow-same-origin"
      allow="geolocation; microphone; camera; autoplay; fullscreen"
      allowFullScreen
      @load="mediaFrameLoaded"
    />
  </div>
</template>

<script>
export default {
  props: {
    html: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: true
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
        case 'setHeight':
          // eslint-disable-next-line no-case-declarations
          const frame = document.getElementById('mediaFrame')
          frame.height = (data.height) + 'px'
          break
        case 'submit':
          // TaskContent handles submit
          this.$emit('submit', data.values)
          break
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

<style lang="scss" scoped>
.template-wrapper {
  width: 100%;
  padding: 5px;
}
#mediaFrame {
  width: 100%;
  border:none;
  border-radius: 14px;
}
</style>
