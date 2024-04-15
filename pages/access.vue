<template>
  <div
    id="keys-container"
    class="container flex-center"
  >
    <div :class="{ 'horizontal-shake': shake }">
      <img
        src="/img/logo.svg"
        alt="Effect Force Logo"
      >
      <h1>Force V2 Early Alpha</h1>
      <p class="keys-description">
        Welcome to the early alpha version of <b>Effect Force V2</b>. To ensure
        a seamless experience for everyone, we'll be granting access to V2 in
        waves using <u>access keys.</u>
      </p>

      <div v-if="!userName">
        <p>First, lets connect your EOS wallet.</p>

        <ConnectWallet />
      </div>
      <div v-else>
        <input
          v-model="key"
          placeholder="xxx-xxx-xxx"
        >

        <button
          class="button"
          @click="verifyAccessKey"
        >
          verify
        </button>
        <a
          href="#"
          class="apply-link"
        >how can i get a key?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdiCheck from "~/components/icons/MdiCheck.vue";

const { userName } = useEffectClient();

const { notify } = useNotification();
const key = ref();
const shake = ref(false);
const accessKey = useLocalStorage("accessKey", null);

definePageMeta({
  layout: "preview",
});

const config = useRuntimeConfig();
const router = useRouter();

const verifyAccessKey = async () => {
  try {
    const result = await fetch(config.public.BACKEND_URL + "/grant-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key.value, username: userName.value }),
    });

    const data = await result.json();

    if (!result.ok) {
      throw new Error("Access denied", data);
    }

    if (data.key) {
      accessKey.value = key.value;
      notify({
        type: "success",
        message: "Access granted",
        icon: MdiCheck,
      });
      router.push("/");
    }
  } catch (e) {
    shake.value = true;
    setTimeout(() => {
      shake.value = false;
    }, 500);
    notify({
      type: "error",
      message: "Access denied",
    });
  }
};
</script>

<style scoped>
.apply-link {
  display: block;
}

#keys-container {
  max-width: 400px;
  height: 100vh;
}

input {
  padding: 5px;
  margin: 10px 0;
}

.horizontal-shake {
  animation: horizontal-shaking 0.5s infinite;
}

@keyframes horizontal-shaking {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
