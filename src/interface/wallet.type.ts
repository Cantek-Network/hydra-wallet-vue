export type WalletAccount = {
    id: string
    enterpriseAddress: string
    networkId: 'preprod' | 'mainnet'
    rootKey: {
        prv: string
        pub: string
        v: "1"
    }
    signType: "mnemonic"
}
