import { BaseRepository } from './base'
import { WalletRepository } from './wallet'

class DefaultRepository extends BaseRepository {
  constructor() {
    super('/')
  }
}

export enum RepoName {
  Wallet
}
export default function getRepository(name: RepoName): BaseRepository {
  switch (name) {
    case RepoName.Wallet:
      return new WalletRepository()
    default:
      return new DefaultRepository()
  }
}
