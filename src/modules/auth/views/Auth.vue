<script setup lang="ts">
  import { BrowserWallet, AppWallet } from '@meshsdk/core'
  import useAuthStore from '../stores'

  const walletCore = useWalletCore()
  const authStore = useAuthStore()

  onMounted(async () => {
    //
  })
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between p-4">
    <div class="flex justify-end">
      <a-button type="ghost" class="" size="large" @click="$router.push({ name: 'AuthImport' })">Login</a-button>
    </div>
    <div class="flex flex-col items-center">
      <img src="/images/wallet-logo.png" alt="LOGO" class="h-80 w-80 object-cover" />
      <p class="text-title-1 font-700 mb-0 text-center">$Fuel Wallet</p>
      <p class="text-body-1 font-700 text-center">Next generation Telegram wallet. <br />Secure, Fast and over the $Fuel Blockchain</p>
    </div>
    <div class="w-full">
      <a-button type="primary" class="!rounded-4 !h-[56px] w-full" size="large" @click="$router.push({ name: 'AuthCreate' })">Create new account</a-button>
    </div>
  </div>
</template>
