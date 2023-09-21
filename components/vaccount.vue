<template>
    <div class="flex content-center">

        <div class="card lg:card-side bg-base-100">
            <div class="card-body">

                <!-- <h2 v-if="userLoggedIn" class="card-title text-center">{{ userName }}</h2> -->
                <button v-show="!userLoggedIn" @click="connectWallet()" class="btn btn-primary btn-outline">Connect Wallet</button>

                <div class="stats shadow mx-auto my-5">
                    <figure><img src="/img/dapps/effect-captions-icon.png" alt="" /></figure>
                    <div class="stat place-items-center">
                        <div class="stat-title">AccountID</div>
                        <div class="stat-value">{{ userAccount?.id }}</div>
                        <div class="stat-desc"></div>
                    </div>

                    <div class="stat place-items-center">
                        <div class="stat-title">Name</div>
                        <div class="stat-value text-secondary">{{ userName }}</div>
                        <div class="stat-desc text-secondary"></div>
                    </div>

                    <div class="stat place-items-center">
                        <div class="stat-title">Permission</div>
                        <div class="stat-value">{{ userPermission }}</div>
                        <div class="stat-desc"></div>
                    </div>

                </div>
                <hr>
                <div class="stats shadow text-primary-content my-5">
                    <div class="stat">
                        <div class="stat-title">Account balance</div>
                        <div class="stat-value">{{ 1337.8008 }} EFX</div>
                        <div class="stat-desc">{{ '$42' }}</div>
                        <div class="stat-actions">
                            <button class="btn btn-sm btn-success">Add funds</button>
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-title">Pending Balance</div>
                        <div class="stat-value">{{ 1337.8008 }} EFX</div>
                        <div class="stat-desc">{{ '$42' }}</div>
                        <div class="stat-actions">
                            <button class="btn btn-sm btn-success">Claim</button>
                        </div>
                    </div>


                    <div class="stat">
                        <div class="stat-title">Current balance</div>
                        <div class="stat-value">{{ userAccount?.balance.quantity }}</div>
                        <div class="stat-desc">{{ '$2.42' }}</div>
                        <div class="stat-actions">
                            <button class="btn btn-sm">Withdrawal</button>
                            <button class="btn btn-sm">deposit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
const {
    connectWallet,
    userLoggedIn,
    userName,
    userPermission,
    userAccount,
} = useEffectClient()
</script>

<style></style>