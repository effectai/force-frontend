<template>
  <div class="chain p-2">
    <div class="pl-1">
      <span :class="{'is-success': $blockchain.eosInfo}" class="status" />
      <span class="pl-2">
        <strong>{{ chainName }}</strong> - Block:
      </span>
      <span>
        <a
          v-if="$blockchain.eosInfo"
          :href="`${$blockchain.eos.explorer}/block/${$blockchain.eosInfo.head_block_num}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $blockchain.eosInfo.head_block_num }}
        </a>
        <span v-else>...</span>
      </span>
      <div class="pl-5">
        <b>Smart Contract:</b> <a
          :href="`${$blockchain.eos.explorer}/account/${$blockchain.sdk.force.config.forceContract}?loadContract=true&tab=Tables&table=campaign&account=${$blockchain.sdk.force.config.forceContract}&scope=${$blockchain.sdk.force.config.forceContract}`"
          target="_blank"
          rel="noopener noreferrer"
        >{{ $blockchain.sdk.force.config.forceContract }}</a>
      </div>
      <div class="pl-5">
        <strong>
          <nuxt-link to="/status">Status Page</nuxt-link>
        </strong>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChainStatus',
  data () {
    return {
    }
  },
  computed: {
    chainName () {
      let chainName
      if (this.$blockchain && this.$blockchain.eosInfo) {
        switch (this.$blockchain.eosInfo.chain_id) {
          case '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840':
            chainName = 'JungleNet'
            break
          case 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906':
            chainName = 'MainNet'
            break
          case '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191':
            chainName = 'Kylin'
            break
        }
      }
      return chainName
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: grey;
  border-radius: 100%;
  box-shadow: 120px 80px 40px 20px #0ff;
  &.is-danger {
    background: $danger;
  }
  &.is-success {
    animation: pulse-green 2s infinite;
    background: $success;
  }
}
.chain {
  position: fixed;
  bottom: -50px;
  z-index: 29;
  width: 300px;
  right: -270px;
  transition: 0.3s;
  border-radius: 5px;
  backdrop-filter: blur(2px);
  background: rgba(#FAFDFF, 0.8);
  border: 1px solid #BFCDF5;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px rgba(16, 29, 86, 0.2);
  &:hover {
    bottom: 0px;
    right: 0px;
  }
}
</style>
