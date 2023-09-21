<template>
    <div class="">
        <div class="text-2xl">Profile</div>
        <Vaccount />
        <div class="card-actions justify-center my-5">
            <button @click="disconnectWallet" class="btn btn-warning">Logout</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const {
    disconnectWallet,
} = useEffectClient()
</script>

<style></style>