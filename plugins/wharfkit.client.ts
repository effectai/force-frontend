import { SessionKit } from "@wharfkit/session"
import { WebRenderer } from "@wharfkit/web-renderer"
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor"
import { WalletPluginCleos } from "@wharfkit/wallet-plugin-cleos"
// import { WalletPluginScatter } from "@wharfkit/wallet-plugin-scatter"
// import { WalletPluginWombat } from "@wharfkit/wallet-plugin-wombat"
// import { WalletPluginTokenPocket } from "@wharfkit/wallet-plugin-tokenpocket"

export default defineNuxtPlugin(() => {
  const webRenderer = new WebRenderer()

  const sessionKit = new SessionKit({
    appName: "Effect Network",
    chains: [
      {
        id: "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
        url: "https://jungle4.greymass.com",
      },
      {
        id: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        url: "https://eos.greymass.com"
      }
    ],
    ui: webRenderer,
    walletPlugins: [
      new WalletPluginAnchor(),
      // new WalletPluginTokenPocket(),
      // new WalletPluginScatter(),
      // new WalletPluginWombat(),
      new WalletPluginCleos(),
    ],
  })

  return {
    provide: {
      sessionKit
    }
  }
})
