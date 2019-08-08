import { StyleSheet } from 'react-native'
import { Colors } from '../../../Theme'

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 0.9,
  },
  deviceContainer: {
    flexDirection: 'row',
  },
  deviceName: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  iconContainer: {
    height: 48,
    opacity: 0.4,
    width: 48,
  },
  iconImage: {
    flex: 1,
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  listContainer: {
    // borderColor: '#ccc',
    borderTopWidth: 0.5,
  },
  listDetail: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    // borderColor: '#ccc',
    borderBottomWidth: 0.5,
    flex: 1,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
})

export default Styles
