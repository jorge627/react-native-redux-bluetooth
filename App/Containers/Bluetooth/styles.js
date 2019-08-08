import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme'

const Styles = StyleSheet.create({
  buttonRaised: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    elevation: 2,
  },
  connectionInfo: {
    alignSelf: 'center',
    // color: '#238923',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  connectionInfoWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  container: {
    flex: 1,
  },
  floatingButtonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 15,
  },
  spinnerTextStyle: {
    color: Colors.white,
  },
  texButtonColor: {
    color: Colors.white,
  },
})
export default Styles
