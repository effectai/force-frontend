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
                        <ConnectWallet />
                        <br><br>
                        <a href="https://dao.effect.network" class="btn btn-accent" target="_blank" rel="noopener noreferrer">DAO</a>
                        <br><br>
                        <a href="https://docs.effect.network" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">Documentation</a>
                        <br><br>
                        <a href="https://discord.gg/effectnetwork" class="btn btn-info" target="_blank" rel="noopener noreferrer">Discord</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const {
    userLoggedIn,
    connectWallet,
    walletConnecting,
} = useEffectClient()

</script>

<style ></style>
