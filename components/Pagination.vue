<template>
  <nav
    v-if="items"
    class="pagination"
    role="navigation"
    aria-label="pagination"
  >
    <span>{{ (page - 1) * perPage + 1 }}-{{ Math.min(page * perPage, items) }} of
      {{ items }}</span>
    <a
      class="pagination-previous"
      :disabled="page === 1"
      @click="$emit('setPage', page - 1)"
    >Previous</a>
    <a
      class="pagination-next"
      :disabled="!maxPage || page === maxPage"
      @click="$emit('setPage', page + 1)"
    >Next page</a>
    <ul class="pagination-list">
      <li v-if="page > 2">
        <a class="pagination-link" @click="$emit('setPage', 1)">1</a>
      </li>
      <li v-if="page > 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="page > 1">
        <a class="pagination-link" @click="$emit('setPage', page - 1)">{{
          page - 1
        }}</a>
      </li>
      <li>
        <a class="pagination-link is-current" aria-current="page">{{
          page
        }}</a>
      </li>
      <li v-if="page < maxPage">
        <a class="pagination-link" @click="$emit('setPage', page + 1)">{{
          page + 1
        }}</a>
      </li>
      <li v-if="maxPage > page + 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="maxPage > page + 1">
        <a class="pagination-link" @click="$emit('setPage', maxPage)">{{ maxPage }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: ['page', 'perPage', 'items'],
  computed: {
    maxPage () {
      return Math.ceil(this.items / this.perPage)
    }
  }
}
</script>
