import React from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Styles from './styles'

const TabHeader = ({ isEnabled, toggleBluetooth, section, changeTabStatus }) => (
  <View>
    <View style={Styles.topBar}>
      <Text style={Styles.heading}>Redux Bluetooth</Text>
      <View style={Styles.enableInfoWrapper}>
        <Text style={Styles.enableText}>{isEnabled ? 'disable' : 'enable'}</Text>
        <Switch onValueChange={toggleBluetooth} value={isEnabled} />
      </View>
    </View>
    <View style={[Styles.topBar, Styles.topBarContainer]}>
      <TouchableOpacity
        style={[Styles.tab, section === 0 && Styles.activeTab]}
        onPress={changeTabStatus(0)}
      >
        <Text>PAIRED DEVICES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Styles.tab, section === 1 && Styles.activeTab]}
        onPress={changeTabStatus(1)}
      >
        <Text>UNPAIRED DEVICES</Text>
      </TouchableOpacity>
    </View>
  </View>
)

TabHeader.propTypes = {
  isEnabled: PropTypes.bool,
  toggleBluetooth: PropTypes.func,
  section: PropTypes.number,
  changeTabStatus: PropTypes.func,
}

export default TabHeader
