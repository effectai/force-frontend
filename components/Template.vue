<template>
  <div class="template-wrapper">
    <div v-if="loading" class="loading-text subtitle">
      Loading
    </div>
    <!-- TODO: add polyfill for srcdoc or move to different URL and use src -->
    <iframe
      id="mediaFrame"
      ref="mediaFrame"
      :src="alternativeFrontendUrl + '/template'"
      name="mediaFrame"
      sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin"
      allow="geolocation; microphone; camera; autoplay; fullscreen"
      allowFullScreen
      @load="mediaFrameLoaded"
    />
    <div v-if="iframeLoaded" class="watermark columns is-centered is-vcentered"><p>PREVIEW</p></div>
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
      alternativeFrontendUrl: process.env.NUXT_ENV_ALTERNATIVE_FRONTEND,
      loading: true,
      iframeLoaded: false
    }
  },
  watch: {
    html (html) {
      const frame = document.getElementById('mediaFrame')
      frame.contentWindow.postMessage({ task: 'template', value: html }, '*')
    }
  },
  mounted () {
    const frame = document.getElementById('mediaFrame')
    frame.addEventListener('load', this.frameIsLoaded)
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
    // helps check when iframe is fully rendered
    frameIsLoaded () {
      this.iframeLoaded = true
    },
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

.watermark{
  background-color: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 15em;
  left: 0;
  height: -webkit-fill-available;
  width: 60%;
  vertical-align: middle;
}
.watermark > p{
  // transform: rotate(-45deg) translate(-1.1em,1em);
  transform: rotate(-45deg);
  font-size: 9vw;
  color: rgba(0, 0, 0, 0.3);
  // text-align: center;
}
.template-wrapper {
  width: 100%;
}
#mediaFrame {
  width: 100%;
  border:none;
}

@media (max-width: 768px) {
  .watermark{
    width: -webkit-fill-available;
    top: 20em;
    height: 50%;
  }

.watermark > p{
  transform: rotate(-45deg) translate(-22vh, 42vw);
    font-size: 17vw;
    color: rgba(0, 0, 0, 0.3);
    // text-align: center;
  }
}

@media (max-width: 540px) {
  .watermark > p{
    transform: rotate(-45deg) translate(-24vh, 57vw);
    font-size: 17vw;
    color: rgba(0, 0, 0, 0.3);
    // text-align: center;
  }

}

@media (max-width: 419px) {
  .watermark{
    top: 21em;
  }
}
</style>
