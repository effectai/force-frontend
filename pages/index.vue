<template>
    <div class="container mx-auto my-10">
        <p>
            Effect Network is the largerst decentralized network for human annoted Machine Learning data
        </p>
        <div v-if="userLoggedIn">
            <p>
                You are logged in as {{ userName }}
                <code>
                    {{ userAccount }}
                </code>
                <hr>
                <code>
                    {{ campaigns }}
                </code>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { 
    userLoggedIn,
    userName,
    userAccount,
    campaigns
 } = useEffectClient()

</script>

<style >

</style>
