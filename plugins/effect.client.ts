import { Client } from '@effectai/effect-js/dist/'

export default defineNuxtPlugin(() => {
    const effect = new Client()
    return {
        provide: {
            effect
        }
    }
})
