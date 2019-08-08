import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as BluetoothReducer } from './Bluetooth/Reducers'

export default () => {
  const rootReducer = combineReducers({
    bluetooth: BluetoothReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
