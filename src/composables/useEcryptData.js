import CryptoJS from 'crypto-js'

export default function encryptData(data, key = process.env.VUE_APP_PEER_KEY) {
  if (!data) return null
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}