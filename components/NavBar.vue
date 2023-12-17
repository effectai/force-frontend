<template>
    <nav>
        <div class="">
            <NuxtLink to="/" class="">
                <span>
                    <img src="/img/dapps/effect-force_h100.png" style="height: 40px;" />
                </span>
            </NuxtLink>
	</div>
    </nav>
</template>

<script setup lang="ts">
const {
    connectWallet,
    disconnectWallet,
    walletConnecting,
    userName,
    userLoggedIn,
    userAccount,
} = useEffectClient()

// retrieve ref of ul
const dropDownElement = ref(null)

const closeDropdown = () => {
    console.log('closeDropdown', dropDownElement.value)
    dropDownElement.value?.classList?.remove('dropdown-open')
}

</script>

<style>
nav {
    padding: 1rem;
    margin-bottom: var(--space-vert);
}
</style>
