import { StyleSheet } from 'react-native'
import { Colors } from '../../../Theme'

const Styles = StyleSheet.create({
  fixedFooter: {
    alignItems: 'center',
    borderTopColor: Colors.white,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    alignSelf: 'flex-end',
    height: 52,
  },
})

export default Styles
