<template>
  <div class="template-wrapper">
    <iframe
      v-if="html"
      v-show="isIframeLoaded"
      id="mediaFrame"
      ref="mediaFrame"
      :srcdoc="html"
      :scrolling="'no'"
      name="mediaFrame"
      sandbox="allow-scripts allow-modals allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin"
      allow="geolocation; microphone; camera; autoplay; fullscreen"
      allowFullScreen
      @load="mediaFrameLoaded"
    />
  </div>
</template>

<script setup lang="ts">
const html: Ref<string | null> = ref(null);
const mediaFrame: Ref<HTMLElement | null> = ref(null);

const isIframeLoaded = ref(false);

const setHtml = (newHtml: string) => {
  html.value = newHtml;
};

const emit = defineEmits<{
  (e: "submit", data: unknown): void;
  (e: "ready"): void;
}>();

//expose the setting of html to the parent component
defineExpose({ setHtml });

onMounted(() => {
  window.addEventListener("message", communicateWithIframe);
});

const mediaFrameLoaded = async () => {
  isIframeLoaded.value = true;
  console.log("loaded!");
  await nextTick();
  emit("ready");
};

const communicateWithIframe = (event: any) => {
  const data = event.data;
  switch (data.task) {
    case "setHeight":
      if (!mediaFrame.value) return;
      mediaFrame.value.style.height = data.height + "px";
      break;
    case "submit":
      emit("submit", data);
      break;
    // case "results":
    //   // eslint-disable-next-line no-case-declarations
    //   const mediaFrame = document.getElementById("mediaFrame");
    //   mediaFrame.contentWindow.postMessage(data, "*");
    //   break;
  }
};
</script>

<style lang="css" scoped>
.template-wrapper {
  box-sizing: border-box;
  width: 100%;
}

#mediaFrame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
