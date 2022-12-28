import { configureStore, combineReducers } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import global from './global'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global']
}

const rootReducer = combineReducers({
  global
})

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat([
      sagaMiddleware
    ])
})

// sagaMiddleware.run(function* allSagas() {
//   // yield * accountSagas()
// })

export {
  store
}
export const persistor = persistStore(store)
