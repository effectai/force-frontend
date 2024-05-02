<template>
  <button
    v-if="true"
    class="button primary"
    @click="connectWallet()"
  >
    Connect Wallet

    <div class="circle">
      <IconsArrowRight/>
    </div>
  </button>
</template>

<script setup lang="ts">
const { connectWallet } = useEffectClient();
</script>

<style scoped>
 
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 7px 5px 20px;
  color: white;
  cursor: pointer;
  background: #000;
  border: none;
  border-radius: 30px;
}

.circle{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  color:black;
  background:white;
  border-radius: 50%;
}
</style>
