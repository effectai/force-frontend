<style>
  @import '../assets/css/normalize.css';
  @import '../assets/css/global.css';
</style>

<template>
    <NavBar />
    <div class="container">
        <section class="">
            <div class="flex items-center">
                <slot />
            </div>
        </section>
    </div>
</template>
