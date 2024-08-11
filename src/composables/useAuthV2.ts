import { WalletCore } from '@/interface/wallet.type'
import { defineStore } from 'pinia'

export const useAuthV2 = defineStore('auth-v2', () => {
  const currentWallet = ref<WalletCore.WalletAccount | null>(null)
  const setCurrentWallet = (wallet: WalletCore.WalletAccount) => {
    currentWallet.value = wallet
  }

  return {
    currentWallet,
    setCurrentWallet
  }
})
