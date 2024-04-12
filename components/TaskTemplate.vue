<template>
  <div class="template-wrapper">
    <iframe
      v-if="html"
      v-show="isIframeLoaded"
      id="mediaFrame"
      ref="mediaFrame"
      :src="`${alternativeFrontendUrl}/template-proxy.html`"
      name="mediaFrame"
      sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin"
      allow="geolocation; microphone; camera; autoplay; fullscreen"
      allowFullScreen
    />
  </div>
</template>

<script setup lang="ts">
const html: Ref<string | null> = ref(null);
const mediaFrame: Ref<HTMLIFrameElement | null> = ref(null);
const config = useRuntimeConfig();
const alternativeFrontendUrl = config.public.ALTERNATIVE_FRONTEND_URL;
const isIframeLoaded = ref(false);

const emit = defineEmits<{
  (e: "submit", data: unknown): void;
  (e: "ready"): void;
}>();

const setHtml = (newHtml: string) => {
  html.value = newHtml;
};

//expose the setting of html to the parent component
defineExpose({ setHtml });

const postHtml = async () => {
  await nextTick();
  // wait for the iframe to load before sending the template

  if (!mediaFrame.value) return;

  mediaFrame.value.contentWindow?.postMessage(
    {
      event: "proxy-load",
      data: html.value,
    },
    "*",
  );
};

const onMessage = (event: any) => {
  const data = event.data;

  switch (event.data.task) {
    case "submit":
      emit("submit", data);
      break;
  }

  switch (event.data.event) {
    case "proxy-loaded":
      isIframeLoaded.value = true;
      emit("ready");
      break;
    case "proxy-ready":
      postHtml();
      break;
  }
};

onMounted(() => {
  window.addEventListener("message", onMessage);
});
</script>

<style lang="css">
.template-wrapper {
  box-sizing: border-box;
  width: calc(100% - 20px);
  height: calc(100dvh - 67.45px - 20px);
  padding: 0px;
  margin: 10px;
  overflow: hidden;
  border: 3px solid #616060;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
