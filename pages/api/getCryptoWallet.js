import nconf from 'nconf'
import QRCode from 'qrcode'

const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text, {
      margin: 2,
      width: 300,
      color: {
        dark: '#FFF',  // Blue dots
        light: '#0A0B11' // Transparent background
      }
    })
  } catch (err) {
    console.error(err)
  }
}

export const getCryptoWallet = async () => {
  return {
    bitcoinWallet: nconf.get('BITCOIN_ADDRESS'),
    bitcoinQRCode: await generateQR(nconf.get('BITCOIN_ADDRESS')),
    ethWallet: nconf.get('ETH_ADDRESS'),
    ethQRCode: await generateQR(nconf.get('ETH_ADDRESS'))
  }
}

export default async (req, res) => {
  res.status(200).json({})
}
