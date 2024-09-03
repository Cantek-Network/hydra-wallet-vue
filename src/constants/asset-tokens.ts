import { IAssetToken } from '@/interface/currency.type'

export const assetTokens: IAssetToken[] = [
  {
    baseCurrency: 'ETH',
    currency: 'ETH',
    currencyName: 'Ethereum',
    decimals: 18,
    iconUrl: 'https://example.com/icons/eth.png',
    id: 1,
    network: 'ERC20',
    stableCurrency: 'USDC',
    systemCurrency: false,
    type: 'cryptocurrency',
    rounding: 2
  },
  {
    baseCurrency: 'ADA',
    currency: 'ADA',
    currencyName: 'Cardano',
    decimals: 6,
    iconUrl: 'https://example.com/icons/ada.png',
    id: 2,
    network: 'Cardano',
    stableCurrency: 'USD',
    systemCurrency: false,
    type: 'cryptocurrency',
    rounding: 2
  }
]
