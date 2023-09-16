import { Client } from '@effectai/effect-js/dist/'

export default defineNuxtPlugin(() => {
    const effectClient: Client = new Client('jungle4')
    return {
        provide: {
            effectClient,
        },
        
    }
})
