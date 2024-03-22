<template>
    <div class="background-primary">
        <div class="text-2xl title my-5">Profile</div>

        <Vaccount v-if="isLoggedIn" />

        <div v-if="isLoggedIn" class="card-actions justify-center my-5">
            <button @click="disconnectWallet" class="btn btn-warning">
                Logout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
const { disconnectWallet, isLoggedIn } = useEffectClient();
</script>

<style></style>
