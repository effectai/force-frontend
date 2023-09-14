import { Client } from '@effectai/effect-js/dist/'

export default defineNuxtPlugin(() => {
    const effectClient: Client = new Client('jungle4')
    console.log('effect.client.ts', effectClient)

    // NOTE: Here the methods are availabe.
    // effectClient.loginWithSession(new Session())

    return {
        provide: {
            effectClient,

        },
        
    }
})
