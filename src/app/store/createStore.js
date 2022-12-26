import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities.js'

const rootReducer = combineReducers({ qualities: qualitiesReducer })

export function createStore() {
  return configureStore({ reducer: rootReducer })
}
