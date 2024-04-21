import { WalletAccount } from '@/interface/wallet.type'
import { defineStore } from 'pinia'
import { deleteDB, IDBPDatabase, openDB, } from 'idb'

type MainDbType = {}

const useAuthStore = defineStore('auth', () => {

  const mainDbName = 'itsa-preprod'
  const walletCollection = 'wallets'

  const mainDb = ref<IDBPDatabase<MainDbType>>()
  const walletAccount = ref<WalletAccount | null>(null)
  const walletAccounts = ref<WalletAccount[]>([])

  function setCurrentWallet(_walletAccount: WalletAccount) {
    walletAccount.value = _walletAccount
  }

  async function registerWalletAccount(_walletAccount: WalletAccount) {
    mainDb.value?.add(walletCollection, _walletAccount)
    await getWalletAccounts()
  }

  async function getWalletAccounts() {
    const rs = await mainDb.value?.getAll(walletCollection) as WalletAccount[]
    walletAccounts.value = rs || []
  }

  onMounted(async () => {
    mainDb.value = await openDB(mainDbName, 1, {
      upgrade(database, oldVersion, newVersion, transaction, event) {
        const walletStore = database.createObjectStore(walletCollection, { keyPath: 'id' })
      },
    })

    await getWalletAccounts()
  })

  return { walletAccount, setCurrentWallet, registerWalletAccount }
})

export default useAuthStore
