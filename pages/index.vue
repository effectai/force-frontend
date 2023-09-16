<template>
    <div class="container mx-auto my-10">
        <p>
            Effect Network is the largerst decentralized network for human annoted Machine Learning data
        </p>
        <div v-if="user">
            <p>
                You are logged in as {{ user }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const effectClient = useEffectClient().effectClient

const user = ref(() => effectClient?.session?.actor?.toJSON())
</script>

<style >

</style>
