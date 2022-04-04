import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Let Nuxt handle CSS
config.autoAddCss = false

library.add(fas, fab)

// Register component globally
Vue.component('font-awesome-icon', FontAwesomeIcon)
