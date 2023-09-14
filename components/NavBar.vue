<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <!-- <nuxt-img 
                src="/img/dapps/effect-force-icon.png"  
                height="60"
                fit="iniside"
            /> -->
            <img src="/img/dapps/effect-force-icon.png" style="height: 60px;"/>
            <a href="/" class="text-lg font-bold">Effect Network</a>
        </div>
        <div class="navbar-end">
            <button v-if="!userName" class="btn btn-primary" @click="login()">Connect Wallet</button>
            <button v-else class="btn btn-primary">{{ userName }}</button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            userName: null
        }
    },
    computed: {
        userLoggedIn (): boolean {
            if (this.$effectClient === null || this.$effectClient === null) {
                return false
            } else {
                return this.$effectClient?.isLoggedIn()
            }
        },
    },
    methods: {
        async login (): Promise<void> {
            const { session } = await this.$sessionKit.login()
            this.$effectClient.loginWithSession(session)
            this.userName = this.$effectClient.session.actor.toString()
        }
    }
}
</script>


<style>
header {
    background-color: #f8f8f8;
    padding: 1rem;
}

nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

nav li {
    margin-right: 1rem;
}

nav a {
    color: #333;
    text-decoration: none;
}
</style>
