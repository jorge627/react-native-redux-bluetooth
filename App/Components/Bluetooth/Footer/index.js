import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '../../Bluetooth'
import Styles from './styles'

const Footer = ({ section, discovering, isEnabled, requestEnable, discoverUnpaired }) => (
  <View style={Styles.footer}>
    <ScrollView horizontal contentContainerStyle={Styles.fixedFooter}>
      {section === 1 && isEnabled ? (
        <Button
          title={discovering ? '... Discovering' : 'Discover devices'}
          onPress={discoverUnpaired}
        />
      ) : null}
      {!isEnabled ? <Button title="Request enable" onPress={requestEnable} /> : null}
    </ScrollView>
  </View>
)

Footer.propTypes = {
  section: PropTypes.number,
  discovering: PropTypes.bool,
  isEnabled: PropTypes.bool,
  requestEnable: PropTypes.func,
  discoverUnpaired: PropTypes.func,
}

export default Footer
