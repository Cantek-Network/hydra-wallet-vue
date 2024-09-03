import JSEncrypt from 'jsencrypt'
import CryptoJs from 'crypto-js'

export function encrypt(data: Record<string, any>): { encryptedData: string; encryptedAesKey: string } | null {
  console.log('>>> / file: encrypt.ts:4 / data:', data)

  const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY
  if (!PUBLIC_KEY) {
    console.error('VITE_APP_PUBLIC_KEY is not defined')
    return null
  }
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)

  const aesKey = 'c0387405f238868c1637c299a1211fe4'
  const _data = JSON.stringify(data)

  // Convert the key from hex to a CryptoJS format
  const aesKeyBytes = CryptoJs.enc.Utf8.parse(aesKey)
  const encryptedAesKey = encryptor.encrypt(aesKey).toString()
  console.log('Encrypted AES key:', encryptedAesKey)

  // Encrypt the data
  const ciphertext = CryptoJs.AES.encrypt(CryptoJs.enc.Utf8.parse(_data), aesKeyBytes, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7 // Ensure you use PKCS7 padding
  })

  // Convert the ciphertext to a Base64 string
  const contentBase64Str = ciphertext.toString()

  return {
    encryptedData: contentBase64Str,
    encryptedAesKey
  }
}
