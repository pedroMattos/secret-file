import CryptoJS from 'crypto-js'

export default function decryptData(data, key = process.env.VUE_APP_PEER_KEY) {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}