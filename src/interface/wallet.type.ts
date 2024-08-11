export type WalletAccount = {
  id: string
  enterpriseAddress: string
  networkId: 'preprod' | 'mainnet'
  rootKey: {
    prv: string
    pub: string
    v: '1'
  }
  signType: 'mnemonic'
}
export namespace WalletCore {
  export type WalletAccount = {
    id: string
    name: string
    addressPoolGap: number
    balance: Balance
    assets: Assets
    state: {
      status: 'ready' | 'syncing' | 'not_ready'
    }
  }

  export type Balance = {
    available: {
      quantity: number
      unit: string
    }
    reward: {
      quantity: number
      unit: string
    }
    total: {
      quantity: number
      unit: string
    }
  }

  export type Assets = {
    available: {
      policyId: string
      assetName: string
      quantity: number
    }[]
    total: {
      policyId: string
      assetName: string
      quantity: number
    }[]
  }
}
