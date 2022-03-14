<template>
  <div class="modal" :class="{'is-active': $blockchain.error}">
    <div class="modal-background" @click="$blockchain.error = null" />
    <div class="modal-content p-5 has-background-danger has-radius has-text-white">
      <h2 class="subtitle has-text-white is-3">
        Error
      </h2>
      <p>{{ $blockchain.error }}</p>
      <button class="modal-close is-large" aria-label="close" @click="$blockchain.error = null" />
      <div class="has-text-right">
        <button class="button" @click="$blockchain.error = null">
          OK
        </button>
      </div>
    </div>
  </div>
</template>
