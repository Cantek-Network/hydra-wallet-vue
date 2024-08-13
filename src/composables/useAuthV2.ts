import { WalletCore } from '@/interface/wallet.type'
import { defineStore } from 'pinia'

export const useAuthV2 = defineStore(
  'auth-v2',
  () => {
    const currentWallet = ref<WalletCore.WalletAccount | null>(null)
    const currentWalletAddress = ref<WalletCore.WalletAddress | null>(null)
    const setCurrentWallet = (wallet: WalletCore.WalletAccount) => {
      currentWallet.value = wallet
    }
    const setCurrentWalletAddress = (address: WalletCore.WalletAddress) => {
      if (!currentWallet.value) {
        console.error('Current wallet is not set')
        return
      }
      currentWalletAddress.value = address
    }

    const reset = () => {
      currentWallet.value = null
      currentWalletAddress.value = null
    }

    return {
      currentWallet,
      setCurrentWallet,
      setCurrentWalletAddress,
      reset
    }
  },
  {
    // @ts-expect-error
    persist: {
      enabled: true
    }
  }
)
