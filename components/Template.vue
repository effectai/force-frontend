<template>
    <div v-show="loading && !iframeLoaded" style="height: 100%;">
	<TemplateSkeleton />
    </div>
    <div
        v-show="!loading && iframeLoaded"
        class="template-wrapper"
        style="width: 100%; height: 100%;  border: none; overflow: hidden;"
	>

        <!-- TODO: add polyfill for srcdoc or move to different URL and use src -->
        <!-- TODO: configurable template server host  -->
        <iframe
            id="mediaFrame"
            ref="mediaFrame"
            src="http://localhost:3030/template"
            style="width: 100%; height: 100%; border: none; overflow: hidden;"
            name="mediaFrame"
            sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin"
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
    data() {
        return {
            alternativeFrontendUrl: process.env.NUXT_ENV_ALTERNATIVE_FRONTEND,
            loading: true,
            iframeLoaded: false
        }
    },
    watch: {
        html(html) {
            const frame = document.getElementById('mediaFrame')
            frame.contentWindow.postMessage({ task: 'template', value: html }, '*')
        }
    },
    mounted() {
        const frame = document.getElementById('mediaFrame')
        frame.addEventListener('load', this.frameIsLoaded)
        document.addEventListener('keydown', this.sendKeyEvents)
    },
    created() {
        // console.debug('Template created', this.html)
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.addEventListener('message', this.communicateWithIframe)
    },
    beforeDestroy() {
        window.removeEventListener('message', this.communicateWithIframe)
        document.removeEventListener('keydown', this.sendKeyEvents)
    },
    methods: {
        // helps check when iframe is fully rendered
        frameIsLoaded() {
            this.iframeLoaded = true
        },
        mediaFrameLoaded() {
            this.loading = false
            const frame = document.getElementById('mediaFrame')

            frame.contentWindow.postMessage({ task: 'template', value: this.html }, '*')
            this.$emit('templateLoaded')
        },
        sendKeyEvents(e) {
            const frame = document.getElementById('mediaFrame')
            if (frame) {
                frame.contentWindow.postMessage({ task: 'key', key: e.key }, '*')
            }
        },
        communicateWithIframe(event) {
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

<style lang="css" scoped>
.template-wrapper {
    width: 100%;
    border: 8px solid var(--c-border) !important;
    box-sizing: border-box;
}

#mediaFrame {
    width: 100%;
    border: none;
}
</style>
