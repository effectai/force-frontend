<template>
  <div class="template-wrapper">
	<div class="taskbar" :class="{'open': isTaskBarOpen}">
		<IconsCaretDoubleUp class="open-icon" @click="isTaskBarOpen = !isTaskBarOpen" />
		<div class="taskbar-container">
			<IconsSolarFlag @click="openFlagModal" class="taskbar-icon"/>
			<IconsSolarSettings class="taskbar-icon"/>
		</div>
	</div>
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
import { useModal, useModalSlot } from "vue-final-modal";
import ModalConfirmPlainCss from "./ModalConfirmPlainCss.vue";
import FormsFlagTaskForm from "~/components/forms/FlagTaskForm.vue";

const html: Ref<string | null> = ref(null);
const mediaFrame: Ref<HTMLIFrameElement | null> = ref(null);
const config = useRuntimeConfig();
const alternativeFrontendUrl = config.public.ALTERNATIVE_FRONTEND_URL;
const isIframeLoaded = ref(false);
const isTaskBarOpen = ref(false);

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

/* Feat: Flagging Task */
const handleFlagTask = (reason: string) => {
	emit("submit", reason);
};

const { open: openFlagModal, close: closeFlagModal } = useModal({
	component: ModalConfirmPlainCss,
	attrs: {
		title: "Flag task?",
	},
	slots: {
		form: useModalSlot({
			component: FormsFlagTaskForm,
			attrs: {
				onFlag(reason: string) {
					handleFlagTask(reason);
				},
			},
		}),
	},
});
</script>

<style lang="css">
.template-wrapper {
  position:relative;
  box-sizing: border-box;
  width: calc(100%);
  height: calc(100dvh - 67.45px);
  padding: 0px;
  overflow: hidden;
  border: 3px solid #616060;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

svg:hover path {
  fill: var(--color-gray-400);
}

.taskbar {
  position: absolute;
  right:5px;
  bottom:5px;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color:black;
  cursor:pointer;
}

.taskbar.open .taskbar-container {
	height: 250px;
	color:white;
	background:#333;
}

.open-icon {
	z-index:1;
	transition: all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.taskbar.open {
  .open-icon {
	color:white;
	transform: rotate(180deg);
  }
}

.taskbar-container {
	position:absolute;
	display: flex;
	flex-direction: column;
	gap:10px;
	align-items: center;
	width:50px;
	height:0px;
	padding-top:10px;
	transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.taskbar-icon{
	cursor:pointer;
}

</style>
