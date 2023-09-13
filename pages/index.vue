<template>
    <div class="container mx-auto my-10">
        <h1>
            Effect Network
        </h1>

        <button @click="login()">Login</button>
    </div>
</template>

<script setup lang="ts">

const login = async () => {
    const { $sessionKit } = useNuxtApp()
    await $sessionKit.login()
}

</script>


<style >

</style>
