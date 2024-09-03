import { $axios } from '@/utils/axios'
import { BaseRepository } from '../base'
import { WalletDto } from './index.d'

export class WalletRepository extends BaseRepository {
  constructor() {
    super('/cardano/wallets')
  }

  async getListWallets(): Promise<any> {
    try {
      const encryptedData = this.encryptContent({})
      const rs = await $axios.post(`${this.prefix}`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/list'
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async restoreWallet(content: WalletDto.RestoreWallet.RequestContent): Promise<WalletDto.RestoreWallet.ResponseContent> {
    try {
      const encryptedData = this.encryptContent(content)
      const rs = await $axios.post(`${this.prefix}`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/createOrRestore'
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}
