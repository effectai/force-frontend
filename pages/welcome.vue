<template>
  <div>
    <div class="is-flex is-flex-wrap-wrap split" style="position: relative">
      <section class="hero is-secondary">
        <div class="hero-body">
          <div class="py-6">
            <div class="py-6 has-text-centered">
              <font-awesome-icon style="font-size: 80px" icon="fa-solid fa-coins" />
            </div>
            <h1 class="title">
              Earn Crypto
            </h1>
            <h2 class="subtitle">
              Complete tasks and earn the EFX cryptocurrency
            </h2>
            <p class="has-text-aligned block">
              Effect Force is the decentralized framework for the Future-of-Work. Currently there are over 10,000 people earning great pay in the cryptocurrency $EFX. You can now work from anywhere at any time from any device. Simply create an Effect Account and sign into Effect Force to start your future today.
            </p>
            <p class="block">
              <nuxt-link class="button is-primary" to="/login">
                Join the WorkForce
              </nuxt-link>
            </p>
          </div>
        </div>
      </section>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="py-6">
            <div class="py-6 has-text-centered">
              <font-awesome-icon style="font-size: 80px" icon="fa-solid fa-laptop-code" />
            </div>
            <h1 class="title">
              Create Tasks
            </h1>
            <h2 class="subtitle">
              Access a global, on-demand, 24x7 scalable WorkForce
            </h2>
            <p class="has-text-aligned block">
              Effect Force is the decentralized framework for the Future-of-Work. Currently there are over 10,000 people earning great pay in the cryptocurrency $EFX. You can now work from anywhere at any time from any device. Simply create an Effect Account and sign into Effect Force to start your future today.
            </p>
            <p class="block">
              <nuxt-link class="button is-secondary" to="/campaigns/templates">
                Create a task
              </nuxt-link>
            </p>
          </div>
        </div>
      </section>
      <div class="hero is-primary dynamic-title">
        <div class="container has-text-centered">
          <h1 class="title">
            Get Started with Effect Force
          </h1>
        </div>
      </div>
      <div class="or">
        OR
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins";
    .dynamic-title{
        width: 100%;
        position: absolute;
        top: 0;
        transition: 0.2s;
    }
    .split section.is-primary:hover ~ .dynamic-title {
        background-color: $primary;
    }
    .split section.is-accent:hover ~ .dynamic-title {
        background-color: $accent;
        color: black;
    }
    .split section.is-secondary:hover ~ .dynamic-title {
        background-color: $secondary;
    }
    .split section {
      width: 50%;
      opacity: 0.7;
      transition: 0.2s;
      min-height: calc(100vh - 108px);
      &:hover {
          opacity: 1;
      }
    }
  .or {
    position: absolute;
    top: calc(50% - 28px);
    font-size: 35px;
    font-weight: 900;
    color: white;
    left: calc(50% - 26px);
    &:before {
        width: 3px;
        height: 40px;
        content: "";
        display: block;
        left: 24px;
        bottom: 50px;
        background: white;
        position: absolute;
    }
    &:after {
        width: 3px;
        height: 40px;
        content: "";
        display: block;
        left: 24px;
        top: 50px;
        background: white;
        position: absolute;
    }
  }
  @include touch {
    .split section {
        width: 100%;
        opacity: 1;
    }
  }
</style>
