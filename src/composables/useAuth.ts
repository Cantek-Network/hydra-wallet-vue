// import { WalletAccount } from '@/interface/wallet.type'
// import { deleteDB, IDBPDatabase, openDB } from 'idb'
// import { defineStore } from 'pinia'

// type MainDbType = {}

// export const useAuth = defineStore('auth', () => {
//   const mainDbName = 'hydrag-preprod'
//   const walletCollection = 'wallets'
//   const metadataCollection = 'metadata'

//   const mainDb = ref<IDBPDatabase<MainDbType>>()
//   const walletAccount = ref<WalletAccount | null>(null)
//   const walletAccounts = ref<WalletAccount[]>([])

//   function setCurrentWallet(_walletAccount: WalletAccount) {
//     walletAccount.value = _walletAccount
//   }

//   async function registerWalletAccount(_walletAccount: WalletAccount) {
//     mainDb.value?.add(walletCollection, _walletAccount)
//     await getWalletAccounts()
//   }

//   async function getWalletAccounts() {
//     const rs = (await mainDb.value?.getAll(walletCollection)) as WalletAccount[]
//     walletAccounts.value = rs || []
//   }

//   async function init() {
//     mainDb.value = await openDB(mainDbName, 1, {
//       upgrade(database, oldVersion, newVersion, transaction, event) {
//         const walletStore = database.createObjectStore(walletCollection, { keyPath: 'id' })
//       }
//     })

//     await getWalletAccounts()
//   }
//   init()

//   return {
//     walletAccount,
//     walletAccounts,
//     setCurrentWallet,
//     registerWalletAccount
//   }
// })
