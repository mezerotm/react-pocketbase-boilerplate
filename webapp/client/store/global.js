import { createSlice } from '@reduxjs/toolkit'
import pkjson from '../../package.json'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    appVersion: pkjson.version
  },
  reducers: {
    stub: (state, action) => { }
  }
})

export const { stub } = globalSlice.actions
export const selectGlobal = state => state.global
export default globalSlice.reducer
