/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { BluetoothTypes } from './Actions'

export const newBTState = (state, { btState }) => ({
  ...state,
  checkingState: false,
  error: null,
  isEnabled: btState,
  ready: btState,
  enabling: false,
  disabling: false,
  pairing: false,
})

export const checkError = (state, { error }) => ({
  ...state,
  error: {
    type: 'check',
    data: error,
  },
})

export const enabling = (state, action) => ({
  ...state,
  enabling: true,
  disabling: false,
})

export const disabling = (state, action) => ({
  ...state,
  enabling: false,
  disabling: true,
})

export const unpairedBTDevices = (state, { devices }) => ({
  ...state,
  unpairedDevices: devices.slice(0),
})

export const discovered = (state, action) => ({
  ...state,
  discovering: false,
})

export const discoveringBT = (state, action) => ({
  ...state,
  discovering: true,
})

export const checkDevices = (state, { devices }) => ({
  ...state,
  isEnabled: devices[0],
  devices: devices[1],
})

export const pairing = (state, { isPairing }) => ({
  ...state,
  pairing: isPairing,
})

export const devicePaired = (state, { device }) => ({
  ...state,
  devices: [...state.devices, device].slice(0),
  unpairedDevices: state.unpairedDevices.filter((d) => d.id !== device.id),
})

export const connecting = (state, action) => ({
  ...state,
  error: null,
  connecting: true,
})

export const connected = (state, { device }) => ({
  ...state,
  connecting: false,
  error: null,
  active: device,
  connected: true,
})

export const connectionError = (state, { error }) => ({
  ...state,
  error: {
    type: 'conn',
    data: error,
  },
  connecting: false,
  connected: false,
})

export const reducer = createReducer(INITIAL_STATE, {
  [BluetoothTypes.NEW_BT_STATE]: newBTState,
  [BluetoothTypes.CHECK_ERROR]: checkError,
  [BluetoothTypes.ENABLING]: enabling,
  [BluetoothTypes.DISABLING]: disabling,
  [BluetoothTypes.UNPAIRED_BT_DEVICES]: unpairedBTDevices,
  [BluetoothTypes.DISCOVERED]: discovered,
  [BluetoothTypes.DISCOVERING_BT]: discoveringBT,
  [BluetoothTypes.CHECK_DEVICES]: checkDevices,
  [BluetoothTypes.PAIRING]: pairing,
  [BluetoothTypes.DEVICE_PAIRED]: devicePaired,
  [BluetoothTypes.CONNECTING]: connecting,
  [BluetoothTypes.CONNECTED]: connected,
  [BluetoothTypes.CONNECTION_ERROR]: connectionError,
})
