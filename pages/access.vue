<template>
  <div id="page-container">
    <section id="keys-container" class="container flex-center">
      <div :class="{ 'horizontal-shake': shake }">
	<img src="/img/logo-black.png" width="190" alt="Effect Force Logo">
	<div v-if="!userName">
	  <div>
            <h2 class="title">Welcome to Effect V2</h2>
	    <p>
	      This is the early access platform of Effect AI: a <span class="text-hightlights">100%
		decentralized</span> and <span class="text-hightlights">transparent</span> AI Training platform. <br />
	    </p>

	    <p>To ensure a good experience for everyone, we'll be granting access to V2 in
	    waves using <a class="subtle" href="https://docs.google.com/forms/d/1T2WR74yDcZM-w3ZMxB95We0Quo438VeTIP9pbii7-1s">access keys</a>.</p>
	  </div>

	  <div class="">
	    <p>First, lets connect your EOS wallet.</p>
	    <ConnectWallet class="mt-2" />
	  </div>
	</div>
	<div v-if="userName">
	  <h2 class="title">
	    Ready to dive into the Effect platform?
	  </h2>

	  <p>
	    Welcome
	  <div class="dropdown">
	    <a href="#" @click="showDropdown">{{ userName }}</a>
	    <div id="myDropdown" class="dropdown-content">
	      <a @click="disconnectWallet" href="#home">logout</a>
	    </div>
	  </div>,<span class="logout-button" @click="disconnectWallet">
	  </span></p>

	  <p>Enter your access code to unlock access to Effect V2. Once you're in, you'll snag a special NFT
	    token, giving you VIP access to all the awesome features waiting for you.</p>

	  <input class="input" v-model="key" placeholder="xxx-xxx-xxx">

	  <ForceButton :is-loading="isLoading" class="button" @click="verifyAccessKey">
	    verify
	  </ForceButton>

	  <a href="https://docs.google.com/forms/d/1T2WR74yDcZM-w3ZMxB95We0Quo438VeTIP9pbii7-1s" class="apply-link">how can i get a key?</a>
	</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import MdiCheck from "~/components/icons/MdiCheck.vue";

const { userName, disconnectWallet } = useEffectClient();

const { notify } = useNotification();
const key = ref();
const shake = ref(false);
const accessKey = useLocalStorage("hasAccessNft", false);

const isLoading = ref(false);

definePageMeta({
	layout: "preview",
});

const config = useRuntimeConfig();
const router = useRouter();

watchEffect(() => {
	if (accessKey.value) {
		router.push("/");
	}
});

const showDropdown = () => {
	document.getElementById("myDropdown")?.classList.toggle("show");
};

const verifyAccessKey = async () => {
	try {
		isLoading.value = true;

		const result = await fetch(`${config.public.BACKEND_URL}/grant-access`, {
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

		if (data) {
			accessKey.value = key.value;

			notify({
				type: "success",
				message: "Access granted",
				icon: MdiCheck,
			});

			setTimeout(() => {
				router.push("/");
			}, 2000);
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
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped>
.apply-link {
  display:block;
  font-size: var(--font-size-sm);
  color: #007bff;
  cursor: pointer;
}

#page-container {
  max-width: 1200px;
  margin: auto;
}

#keys-container {
  max-width: 750px;
  min-height: 100vh;
  font-size: 20px;
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

.logout-button {
  color: #007bff;
  cursor: pointer;
}

.text-hightlights {
  color: #007bff;
}

a.subtle { color: var(--text-color) !important; }
</style>
