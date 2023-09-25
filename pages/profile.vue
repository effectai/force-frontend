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
definePageMeta({ middleware: 'auth' })
const {
    disconnectWallet,
} = useEffectClient()
</script>

<style></style>