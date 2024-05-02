<template>
  <section id="keys-container" class="container flex-center">
    <div :class="{ 'horizontal-shake': shake }">
      <img src="/img/effect-logo.svg" width="250" alt="Effect Force Logo">
      <div v-if="!userName">
        <h1 class="title">Effect Force V2</h1>

        <div>
          <p>
            Welcome to the early alpha version of Effect Force V2:<br /> a <span class="text-hightlights">100%
              Decentralized</span> and <span class="text-hightlights">Transparent</span> AI Training platform. <br />
          </p>

          <p>To ensure a good experience for everyone, we'll be granting access to V2 in
            waves using <u>access keys.</u></p>
        </div>

        <div>
          <p>First, lets connect your EOS wallet.</p>
          <ConnectWallet class="mt-1" />
        </div>
      </div>
      <div v-if="userName">
        <h2 class="title">
          Ready to dive into the Force platform?
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

        <p>Just enter your access code to unlock access to Effect Force. Once you're in, you'll snag a special NFT
          token, giving you VIP access to all the awesome features waiting for you.</p>

        <input v-model="key" placeholder="xxx-xxx-xxx">

        <ForceButton :is-loading="isLoading" class="button" @click="verifyAccessKey">
          verify
        </ForceButton>

        <a href="#" class="apply-link">how can i get a key?</a>
      </div>
    </div>
  </section>
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
  color: #007bff;
  cursor: pointer;
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
  font-weight: bold;
  color: #007bff;
}
</style>
