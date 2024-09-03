export namespace WalletDto {
  export namespace RestoreWallet {
    type RequestContent = {
      name: string
      mnemonic_sentence: string[]
      passphrase: string
    }

    type ResponseContent = {
      id: string
      address_pool_gap: number
      balance: {
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
      assets: {
        available: {
          policy_id: string
          asset_name: string
          quantity: number
        }[]
        total: {
          policy_id: string
          asset_name: string
          quantity: number
        }[]
      }
      delegation: any
      name: string
      passphrase: {
        last_updated_at: string
      }
      state: {
        status: string
      }
      tip: any
    }
  }
}
