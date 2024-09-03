import getRepository, { RepoName } from '@/repositories'
import { WalletRepository } from '@/repositories/wallet'

export const useWalletApi = () => {
  const walletApi = getRepository(RepoName.Wallet) as WalletRepository
  return walletApi
}
