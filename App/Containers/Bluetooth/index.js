import React from 'react'
import { ActivityIndicator, View, DeviceEventEmitter } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BluetoothActions from '../../Stores/Bluetooth/Actions'
import Spinner from 'react-native-loading-spinner-overlay'
import Styles from './styles'
import { Button, DeviceList, TabHeader, Footer } from '../../Components/Bluetooth'
import {
  on,
  withDelimiter,
  isEnabled,
  list,
  requestEnable,
  enable,
  connect as connectDevice,
  disable,
  write,
  pairDevice,
  discoverUnpairedDevices,
  cancelDiscovery,
} from 'react-native-bluetooth-serial'
import { Buffer } from 'buffer'

global.Buffer = Buffer
const iconv = require('iconv-lite')

class Bluetooth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      section: 0,
    }
  }

  componentDidMount() {}

  componentWillMount() {
    this.checkInitialStatus()
    on('bluetoothEnabled', () => this.checkDevicesWhenChangeState(true))
    on('bluetoothDisabled', () => this.checkDevicesWhenChangeState(false))
    on('error', (err) => console.log(`Error: ${err.message}`))
    on('connectionLost', () => {
      if (this.props.active) {
        alert(`Connection to device ${this.props.active.name} has been lost`)
      }
    })
    withDelimiter('#').then(() => {
      DeviceEventEmitter.addListener('read', (data) => this.handleBluetoothRead(data))
    })
  }

  handleBluetoothRead = (readed) => {
    console.log(`Data readed: ${readed}`)
  }

  checkInitialStatus = () => {
    Promise.all([isEnabled(), list()]).then((values) => {
      this.props.checkDevices(values)
    })
  }

  checkDevicesWhenChangeState = (isEnabled) => {
    list().then((devices) => {
      this.props.checkDevices([isEnabled, devices])
    })
  }

  requestBtEnable = () => {
    requestEnable()
      .then((res) => this.props.newBTState(true))
      .catch(() => {})
  }

  toggleBluetooth = (value) => {
    if (value === true) {
      this.enableBT()
    } else {
      this.disableBt()
    }
  }

  enableBT = () => {
    const { enabling, newBTState, checkError } = this.props
    enabling()
    enable()
      .then((res) => newBTState(true))
      .catch((err) => checkError(err))
  }

  disableBt = () => {
    const { disabling, newBTState, checkError } = this.props
    disabling()
    disable()
      .then(() => newBTState(false))
      .catch((err) => checkError(err))
  }

  changeTabStatus = (section) => () => {
    this.setState({ section: section })
  }

  cancelDiscovery = () => {
    if (this.props.discovering) {
      cancelDiscovery()
        .then(() => this.props.discovered())
        .catch(() => {})
    }
  }

  pairBTDevice = (device) => {
    this.props.pairing(true)
    pairDevice(device.id)
      .then((paired) => {
        if (paired) {
          alert(`Device ${device.name} paired successfully`)
          this.props.devicePaired(device)
        } else {
          alert(`Device ${device.name} pairing failed`)
        }
        this.props.pairing(false)
      })
      .catch(() => {
        // Toast.showShortBottom(err.message)
        this.props.pairing(false)
      })
  }

  connectBTDevice = (device) => {
    this.props.connecting()
    connectDevice(device.id)
      .then(() => {
        this.props.connected(device)
        alert(`Connected to device ${device.name}`)
      })
      .catch((err) => {
        alert('Bluetooth connection was not possible')
        this.props.connectionError(err)
      })
  }

  onDevicePress = (device) => () => {
    if (this.state.section === 0) {
      this.connectBTDevice(device)
    } else {
      this.pairBTDevice(device)
    }
  }

  discoverUnpaired = () => {
    if (this.props.discovering) {
      return false
    } else {
      this.discoverBTUnpairedDevices()
    }
  }

  discoverBTUnpairedDevices = () => {
    const { discoveringBT, discovered, unpairedBTDevices } = this.props
    discoveringBT()
    discoverUnpairedDevices()
      .then((unpairedDevices) => {
        discovered()
        unpairedBTDevices(unpairedDevices)
      })
      .catch(() => {})
  }

  writeData = (message) => {
    if (!this.props.connected) {
      alert('You must connect to device first')
    }

    write(message)
      .then(() => {
        alert('Successfuly wrote to device')
      })
      .catch((err) => alert(err.message))
  }

  writePackets = (message, packetSize = 64) => {
    const toWrite = iconv.encode(message, 'cp852')
    const writePromises = []
    const packetCount = Math.ceil(toWrite.length / packetSize)

    for (var i = 0; i < packetCount; i++) {
      const packet = Buffer.alloc(packetSize)
      packet.fill(' ')
      toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize)
      writePromises.push(write(packet))
    }

    Promise.all(writePromises).then((result) => {})
  }

  render() {
    return (
      <View style={Styles.container}>
        <Spinner
          visible={this.props.isConnecting}
          textContent={'Connecting ...'}
          textStyle={Styles.spinnerTextStyle}
        />
        <TabHeader
          isEnabled={this.props.isEnabled}
          toggleBluetooth={this.toggleBluetooth}
          section={this.state.section}
          changeTabStatus={this.changeTabStatus}
        />
        {this.props.discovering && this.state.section === 1 ? (
          <View style={Styles.floatingButtonContainer}>
            <ActivityIndicator style={Styles.spinner} size={60} />
            <Button
              textStyle={Styles.texButtonColor}
              style={Styles.buttonRaised}
              title="Cancel Discovery"
              onPress={this.cancelDiscovery}
            />
          </View>
        ) : (
          <DeviceList
            showConnectedIcon={this.state.section === 0}
            connectedId={this.props.active && this.props.active.id}
            devices={this.state.section === 0 ? this.props.devices : this.props.unpairedDevices}
            onDevicePress={this.onDevicePress}
          />
        )}
        <Footer
          section={this.state.section}
          discovering={this.props.discovering}
          isEnabled={this.props.isEnabled}
          requestEnable={this.requestBtEnable}
          discoverUnpaired={this.discoverUnpaired}
        />
      </View>
    )
  }
}

Bluetooth.propTypes = {
  active: PropTypes.object,
  discovering: PropTypes.bool,
  discoveringBT: PropTypes.func,
  isEnabled: PropTypes.bool,
  isConnecting: PropTypes.bool,
  pairing: PropTypes.func,
  devices: PropTypes.array,
  unpairedDevices: PropTypes.array,
  newBTState: PropTypes.func,
  enabling: PropTypes.func,
  devicePaired: PropTypes.func,
  connecting: PropTypes.func,
  connected: PropTypes.func,
  connectionError: PropTypes.func,
  disabling: PropTypes.func,
  checkError: PropTypes.func,
  discovered: PropTypes.func,
  unpairedBTDevices: PropTypes.func,
  checkDevices: PropTypes.func,
}

const mapStateToProps = (state) => ({
  isEnabled: state.bluetooth.isEnabled,
  isConnecting: state.bluetooth.connecting,
  discovering: state.bluetooth.discovering,
  unpairedDevices: state.bluetooth.unpairedDevices,
  devices: state.bluetooth.devices,
})

const mapDispatchToProps = (dispatch) => ({
  connecting: () => dispatch(BluetoothActions.connecting()),
  connected: () => dispatch(BluetoothActions.connected()),
  connectionError: (error) => dispatch(BluetoothActions.connectionError(error)),
  pairing: (isPairing) => dispatch(BluetoothActions.pairing(isPairing)),
  enabling: () => dispatch(BluetoothActions.enabling()),
  disabling: () => dispatch(BluetoothActions.disabling()),
  newBTState: (btState) => dispatch(BluetoothActions.newBTState(btState)),
  checkError: (error) => dispatch(BluetoothActions.checkError(error)),
  unpairedBTDevices: (devices) => dispatch(BluetoothActions.unpairedBTDevices(devices)),
  discoveringBT: () => dispatch(BluetoothActions.discoveringBT()),
  discovered: () => dispatch(BluetoothActions.discovered()),
  checkDevices: (devices) => dispatch(BluetoothActions.checkDevices(devices)),
  devicePaired: (device) => dispatch(BluetoothActions.devicePaired(device)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bluetooth)
