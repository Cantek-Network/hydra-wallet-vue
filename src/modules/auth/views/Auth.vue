<script setup lang="ts">
  import { BigNum, Bip32PrivateKey, BaseAddress, StakeCredential, NetworkInfo } from '@emurgo/cardano-serialization-lib-browser'
  import { mnemonicToEntropy, generateMnemonic } from 'bip39'
  // Purpose derivation (See BIP43)
  enum Purpose {
    CIP1852 = 1852 // see CIP 1852
  }

  // Cardano coin type (SLIP 44)
  enum CoinTypes {
    CARDANO = 1815
  }

  enum ChainDerivation {
    EXTERNAL = 0, // from BIP44
    INTERNAL = 1, // from BIP44
    CHIMERIC = 2 // from CIP1852
  }

  function getCip1852Account(): Bip32PrivateKey {
    const mnemonic = generateMnemonic()
    console.log('>>> / file: Auth.vue:22 / mnemonic:', mnemonic)

    const entropy = mnemonicToEntropy('one select army oil peace mansion trumpet wasp strike chase glow skate')
    const rootKey = Bip32PrivateKey.from_bip39_entropy(Buffer.from(entropy, 'hex'), Buffer.from(''))
    return rootKey.derive(harden(Purpose.CIP1852)).derive(harden(CoinTypes.CARDANO)).derive(harden(0)) // account #0
  }

  function harden(num: number): number {
    return 0x80000000 + num
  }

  onMounted(async () => {
    console.log('mounted')
    //
    const cip1852Account = getCip1852Account()
    const utxoPubKey = cip1852Account.derive(ChainDerivation.EXTERNAL).derive(0).to_public()
    const stakeKey = cip1852Account.derive(ChainDerivation.CHIMERIC).derive(0).to_public()

    const baseAddr = BaseAddress.new(0, StakeCredential.from_keyhash(utxoPubKey.to_raw_key().hash()), StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()))

    const address = baseAddr.to_address().to_bech32()
    console.log('>>> / file: Auth.vue:50 / address:', address)

    const network = NetworkInfo.testnet()
    console.log('>>> / file: Auth.vue:43 / network:', network)
  })
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between p-4">
    <div class="flex justify-end">
      <a-button type="ghost" class="" size="large" @click="$router.push({ name: 'AuthImport' })">Login</a-button>
    </div>
    <div class="flex flex-col items-center">
      <img src="/images/wallet-logo.png" alt="LOGO" class="h-80 w-80 object-cover" />
      <p class="mb-0 text-center text-title-1 font-700">$Fuel Wallet</p>
      <p class="text-center text-body-1 font-700">Next generation Telegram wallet. <br />Secure, Fast and over the $Fuel Blockchain</p>
    </div>
    <div class="w-full">
      <a-button type="primary" class="w-full !h-[56px] !rounded-4" size="large" @click="$router.push({ name: 'AuthCreate' })">Create new account</a-button>
    </div>
  </div>
</template>
