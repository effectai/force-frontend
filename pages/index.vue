<template>
    <div class="container mx-auto my-10">
        <div v-if="userLoggedIn">
            <CampaignList />
        </div>
        <div v-else>
            <div class="hero min-h-screen"
                style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">Effect Network</h1>
                        <p class="mb-5">
                            Effect Network is the largerst decentralized network for human annoted Machine Learning data
                        </p>
                        <button @click="connectWallet" class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {
    userLoggedIn,
    userName,
    userAccount,
    campaigns,
    connectWallet,
} = useEffectClient()

</script>

<style ></style>
