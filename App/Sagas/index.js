import { takeLatest, all } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([takeLatest(StartupTypes.STARTUP, startup)])
}
