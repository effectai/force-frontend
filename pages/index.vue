<template>
  <section class="section">
    <div class="container">
    <div class="text-center">
      <h4 class="title">Welcome {{ $auth.user.name }}</h4>
      <div class="subtitle">{{$auth.user.email}}</div>
      <br>
      <a class="button is-danger" @click="$auth.logout()">Logout</a>
      <br><br>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>

<style>
</style>
