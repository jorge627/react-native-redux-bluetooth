import React from 'react'
import { ScrollView, TouchableHighlight, View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import Styles from './styles'

const DeviceList = ({ devices, connectedId, showConnectedIcon, onDevicePress }) => (
  <ScrollView style={Styles.container}>
    <View style={Styles.listContainer}>
      {devices.map((device, i) => {
        return (
          <TouchableHighlight
            underlayColor="#DDDDDD"
            key={`${device.id}_${i}`}
            style={Styles.listItem}
            onPress={onDevicePress(device)}
          >
            <View style={Styles.deviceContainer}>
              {showConnectedIcon ? (
                <View style={connectedId === device.id && [Styles.iconContainer]}>
                  {connectedId === device.id ? (
                    <Image
                      style={Styles.iconImage}
                      source={{
                        uri:
                          'https://raw.githubusercontent.com/rusel1989/react-native-bluetooth-serial/master/BluetoothSerialExample/src/images/ic_done_black_24dp.png',
                      }}
                    />
                  ) : null}
                </View>
              ) : null}
              <View style={Styles.listDetail}>
                <Text style={Styles.deviceName}>{device.name}</Text>
                <Text>{`<${device.id}>`}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      })}
    </View>
  </ScrollView>
)

DeviceList.propTypes = {
  devices: PropTypes.array,
  connectedId: PropTypes.string,
  showConnectedIcon: PropTypes.bool,
  onDevicePress: PropTypes.func,
}

export default DeviceList
