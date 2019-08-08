import { createAppContainer, createStackNavigator } from 'react-navigation'

import Bluetooth from 'App/Containers/Bluetooth'
import SplashScreen from 'App/Containers/SplashScreen'

const StackNavigator = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: Bluetooth,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

export default createAppContainer(StackNavigator)
