import { $axios } from '@/utils/axios'
import { BaseRepository } from '../base'
import type { WalletDto } from './index.d'
import { convertKeysToSnakeCase, recursiveToCamel } from '@/utils/format'

export class WalletRepository extends BaseRepository {
  constructor() {
    super('/cardano')
  }

  async getListWallets(): Promise<any> {
    try {
      const encryptedData = this.encryptContent({})
      const rs = await $axios.post(`${this.prefix}/wallets`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/list'
      })
      return Promise.resolve(rs)
    } catch (error: any) {
      this.errorResponseHandler(error)
      return Promise.reject(error)
    }
  }

  async restoreWallet(content: WalletDto.RestoreWallet.RequestContent) {
    try {
      const encryptedData = this.encryptContent(content)
      const rs = await $axios.post<any, WalletDto.RestoreWallet.ResponseContent>(`${this.prefix}/wallets`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/createOrRestore'
      })
      return Promise.resolve(rs)
    } catch (error: any) {
      this.errorResponseHandler(error)
      return Promise.reject(error)
    }
  }

  async getWalletById(walletId: string) {
    try {
      const encryptedData = this.encryptContent({})
      const rs = await $axios.post<any, WalletDto.DetailWallet.ResponseContent>(`${this.prefix}/wallets`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/detail',
        walletId: walletId
      })
      return Promise.resolve(rs)
    } catch (error: any) {
      this.errorResponseHandler(error)
      return Promise.reject(error)
    }
  }

  async getWalletAddresses(walletId: string) {
    try {
      const encryptedData = this.encryptContent({})
      const rs = await $axios.post<any, WalletDto.WalletAddresses.ResponseContent>(`${this.prefix}/addresses`, {
        content: encryptedData?.encryptedData,
        contentKey: encryptedData?.encryptedAesKey,
        requestType: 'wallets/addresses/list',
        walletId: walletId
      })
      const camelizedData = recursiveToCamel(rs) as WalletDto.WalletAddresses.ResponseContent
      return Promise.resolve(camelizedData)
    } catch (error: any) {
      this.errorResponseHandler(error)
      return Promise.reject(error)
    }
  }
}
