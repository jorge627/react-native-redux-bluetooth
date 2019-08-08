import { StyleSheet } from 'react-native'
import { Colors } from '../../../Theme'

const Styles = StyleSheet.create({
  activeTab: {
    borderBottomWidth: 6,
    borderColor: Colors.primary,
  },
  enableInfoWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  enableText: {
    // color: '#FFFFFF',
    fontSize: 12,
  },
  heading: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#FFFFFF',
  },
  tab: {
    alignItems: 'center',
    borderBottomWidth: 6,
    flex: 0.5,
    height: 56,
    justifyContent: 'center',
    // borderColor: 'transparent',
  },
  topBar: {
    alignItems: 'center',
    elevation: 6,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // backgroundColor: '#7B1FA2',
  },
  topBarContainer: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
})

export default Styles
