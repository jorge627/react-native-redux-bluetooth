import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  newBTState: ['btState'],
  checkError: ['error'],
  enabling: null,
  disabling: null,
  unpairedBTDevices: ['devices'],
  discovered: null,
  discoveringBT: null,
  checkDevices: ['devices'],
  pairing: ['isPairing'],
  devicePaired: ['device'],
  connecting: null,
  connected: null,
  connectionError: ['error'],
})

export const BluetoothTypes = Types
export default Creators
