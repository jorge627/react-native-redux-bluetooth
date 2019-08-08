import { StyleSheet } from 'react-native'
import { Colors } from '../../../Theme'

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    margin: 5,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default Styles
