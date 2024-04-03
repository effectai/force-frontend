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

      <input
        v-model="key"
        placeholder="xxx-xxx-xxx"
      >

      <button
        class="button"
        @click="verifyAccessKey"
      >
        submit
      </button>
      <a
        href="#"
        class="apply-link"
      >how can i get a key?</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const { notify } = useNotification();
const key = ref();
const shake = ref(false);

const { betaKey } = useBetaKeys();

definePageMeta({
  layout: "preview",
});

const router = useRouter();

// 🤫🤫🤫
const validKeys = ["EFX-A4L-8J3", "EFX-LPA-44X", "EFX-AR1-SZL", "EFX-LAP-4X3"];

const verifyAccessKey = () => {
  if (validKeys.includes(key.value)) {
    notify({
      type: "success",
      message: "Access granted",
    });
    betaKey.value = key.value;
    router.push("/");
  } else {
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
