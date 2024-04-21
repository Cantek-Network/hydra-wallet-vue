

import { BigNum, Bip32PrivateKey, BaseAddress, StakeCredential, NetworkInfo } from '@emurgo/cardano-serialization-lib-browser'
import { mnemonicToEntropy, generateMnemonic } from 'bip39'

export const useWalletCore = () => {
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

  function getCip1852Account(mnemonic: string): Bip32PrivateKey {
    const entropy = mnemonicToEntropy(mnemonic)
    const rootKey = Bip32PrivateKey.from_bip39_entropy(Buffer.from(entropy, 'hex'), Buffer.from(''))
    return rootKey.derive(harden(Purpose.CIP1852)).derive(harden(CoinTypes.CARDANO)).derive(harden(0)) // account #0
  }

  function harden(num: number): number {
    return 0x80000000 + num
  }

  function getEnterpriseAddress(account: Bip32PrivateKey): BaseAddress {
    const enterpriseKey = account.derive(ChainDerivation.INTERNAL).derive(0).to_public()
    const baseAddr = BaseAddress.new(0, StakeCredential.from_keyhash(enterpriseKey.to_raw_key().hash()), StakeCredential.from_keyhash(enterpriseKey.to_raw_key().hash()))
    return baseAddr
  }

  function getEnterpriseAddressByMnemonic(mnemonic: string): BaseAddress {
    const account = getCip1852Account(mnemonic)
    return getEnterpriseAddress(account)
  }


  function test() {
    console.log('useWalletCore::: test')

    const mnemonicTest = 'one select army oil peace mansion trumpet wasp strike chase glow skate'

    //
    const cip1852Account = getCip1852Account(mnemonicTest)
    const utxoPubKey = cip1852Account.derive(ChainDerivation.EXTERNAL).derive(0).to_public()
    const stakeKey = cip1852Account.derive(ChainDerivation.CHIMERIC).derive(0).to_public()

    const baseAddr = BaseAddress.new(0, StakeCredential.from_keyhash(utxoPubKey.to_raw_key().hash()), StakeCredential.from_keyhash(stakeKey.to_raw_key().hash()))

    const address = baseAddr.to_address().to_bech32()
    console.log('>>> / file: useWalletCore:50 / address:', address)

    const network = NetworkInfo.testnet()
    console.log('>>> / file: useWalletCore:43 / network:', network)

  }
  test()

  return {
    getCip1852Account,
    generateMnemonic,
    getEnterpriseAddress,
    getEnterpriseAddressByMnemonic,
    test
  }
}
