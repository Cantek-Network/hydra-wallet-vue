import { IAssetToken } from '@/interface/currency.type'
import { forEach } from 'lodash'

export const formatId = (id: string | null, begin = 5, last = 5): string => {
  if (!id) return ''
  if (id.length <= begin + last) return id
  const before = id.substring(0, begin)
  const after = id.substring(id.length - last)
  return before + '...' + after
}

export const createId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const ROUNDING_CURRENCY: Record<string, any> = {}
const TOKEN_LIST_BNB: Record<string, any> = {}
const TOKEN_LIST_ETH: Record<string, any> = {}
export function initListToken(listToken: IAssetToken[], listAllToken: IAssetToken[]): void {
  forEach(listToken, token => {
    ROUNDING_CURRENCY[token.currency] = token.rounding
  })
  ROUNDING_CURRENCY['USD'] = 2
  ROUNDING_CURRENCY['PERCENT'] = 2

  forEach(listAllToken, token => {
    if (token.network === 'BEP20') {
      TOKEN_LIST_BNB[token.currency] = token.decimals
    } else {
      TOKEN_LIST_ETH[token.currency] = token.decimals
    }
  })
}

export function convertAmountDecimal(amount: string | number, currency: string, isRoundedDown = false, isAddNameCurrency = false): string {
  if (!amount) {
    if (currency === 'PERCENT') {
      return '0'
    }
    amount = 0 // case amount = null | ''
    if (isAddNameCurrency) {
      return amount.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] }) + ' ' + currency
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] })
  }

  if (+amount >= 100 && currency === 'PERCENT') {
    return '100'
  }

  amount = amount.toString()
  if (amount.includes('.')) {
    if (isAddNameCurrency) {
      const number = +toFixedNumber(+amount, ROUNDING_CURRENCY[currency])
      return number.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] }) + ' ' + currency
    }

    const number = +toFixedNumber(+amount, ROUNDING_CURRENCY[currency])
    return number.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] })
  }
  const _value = +amount
  if (isAddNameCurrency) {
    return _value.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] }) + ' ' + currency
  } else {
    return _value.toLocaleString('en-US', { minimumFractionDigits: ROUNDING_CURRENCY[currency] })
  }
}

export function toFixedNumber(number: number, precision: number): string {
  const shift = function (number, exponent) {
    const numArray = ('' + number).split('e')
    return +(numArray[0] + 'e' + (numArray[1] ? +numArray[1] + exponent : exponent))
  }
  return shift(Math.round(shift(number, +precision)), -precision) + ''
}

export function truncateToDecimals(num: number, dec: string): string {
  const calcDec = Math.pow(10, ROUNDING_CURRENCY[dec])
  return Number((Math.trunc(num * calcDec) / calcDec).toFixed(ROUNDING_CURRENCY[dec])).toLocaleString('en-US', {
    minimumFractionDigits: ROUNDING_CURRENCY[dec]
  })
}
