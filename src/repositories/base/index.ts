import { BaseRepositoryInterface } from './index.d'
import { encrypt } from '@/utils/encrypt'

export abstract class BaseRepository implements BaseRepositoryInterface {
  prefix: string

  constructor(prefix: string) {
    this.prefix = prefix
  }

  encryptContent(data: Record<string, any>) {
    return encrypt(data)
  }
}
