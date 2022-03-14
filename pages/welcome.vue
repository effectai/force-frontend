<template>
  <div class="split">
    <section class="section">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-6 bg-hover bg-hover-left">
            <div class="columns">
              <div class="column is-8-widescreen is-10-desktop is-11-tablet">
                <img src="~assets/img/icons/coins.gif" style="height: 90px" class="show-on-hover">
                <img src="~assets/img/icons/coins.png" style="height: 90px" class="hide-on-hover">
                <h1 class="title is-1">
                  Earn Crypto
                </h1>
                <h1 class="title is-4">
                  Complete tasks and earn the EFX cryptocurrency
                </h1>
                <p class="has-text-aligned block">
                  Effect Force is the decentralized framework for the Future-of-Work. You can now work from anywhere at any time from any device. Simply create an Effect Account and sign into Effect Force to start earning great pay in the cryptocurrency $EFX.
                </p>
                <p class="block">
                  <nuxt-link class="button is-primary is-outlined is-medium" to="/login">
                    Join the WorkForce
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
          <div class="bg-left" />
          <div class="column is-6 bg-hover bg-hover-right">
            <div class="columns">
              <div class="column is-4-widescreen is-2-desktop is-1-tablet" />
              <div class="column is-8-widescreen is-10-desktop is-11-tablet">
                <img src="~assets/img/icons/create.gif" style="height: 90px" class="show-on-hover">
                <img src="~assets/img/icons/create.png" style="height: 90px" class="hide-on-hover">
                <h1 class="title is-1">
                  Create Task
                </h1>
                <h1 class="title is-4">
                  Access a global, on-demand, 24x7 scalable WorkForce
                </h1>
                <p class="has-text-aligned block">
                  Tap into a scalable WorkForce of over 10,000 people to complete tasks for you. Choose one of the default task templates to get started with text analysis, document transcription, image annotations, sentitment analyis and many more!
                </p>
                <p class="block">
                  <nuxt-link class="button is-primary is-outlined is-medium" to="/campaigns/templates">
                    Create a task
                  </nuxt-link>
                </p>
              </div>
            </div>
          </div>
          <div class="bg-right" />
        </div>
      </div>
      <div class="or">
        OR
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: unset;
  > .columns {
    height: calc(100vh - 350px);
  }
}

@import "bulma/sass/utilities/mixins";

.bg-left, .bg-right {
   position: absolute;
    background: #FAFDFF;
    height: 100vh;
    width: 50%;
    left: 0;
    top:0;
    z-index:0;
    &:hover {
      &:after {
        height: 100vh;
        background: $primary;
      }
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      background: transparent;
      height: 0;
      width: 100%;
      left: 0;
      top:0;
      transition: 0.3s;
      z-index:0;
    }
}
.bg-hover {
    z-index: 1;
    &:before {
      content: "";
      display: block;
      background: transparent;
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100vh;
    }
    .button {
      transition: 0.3s;
    }
}
.bg-left, .bg-hover-left:before {
  left: 0;
}
.bg-right, .bg-hover-right:before {
  left: 50%
}
.hide-on-hover {
  display: block;
}
.show-on-hover {
  display: none;
}
.bg-left:hover {
      ~ .bg-hover-left {
      color: white;
      .title, .subtitle {
        color: white;
      }
      .show-on-hover {
        display: block;
      }
      .hide-on-hover {
        display: none;
      }
      .button {
        border-color: $accent !important;
        background: $accent !important;
        color: black !important;
      }
    }
}
.bg-hover-right {
    &:hover {
      + .bg-right:after {
        height: 100vh;
        background: $primary;
      }
  }
}
.bg-hover-left {
    &:hover {
      + .bg-left:after {
        height: 100vh;
        background: $primary;
      }
  }
}

  .or {
    position: absolute;
    top: calc(50% - 35px);
    font-size: 35px;
    font-weight: 900;
    left: calc(50% - 45px);
    width: 90px;
height: 70px;
padding-top: 12px;
text-align: center;
font-size: 25px;

background: #FAFDFF;
border: 1px solid #BFCDF5;
box-sizing: border-box;
box-shadow: 0px 4px 20px rgba(16, 29, 86, 0.2);
border-radius: 20px;
  }
  @include desktop {
    .bg-hover:hover {
      color: white;
      .title, .subtitle {
        color: white;
      }
      .show-on-hover {
        display: block;
      }
      .hide-on-hover {
        display: none;
      }
      .button {
        border-color: $accent !important;
        background: $accent !important;
        color: black !important;
      }
    }
  }
  @include touch {
    .bg-left, .bg-right, .or {
      display: none;
    }
  }
</style>
