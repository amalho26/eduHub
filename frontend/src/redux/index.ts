import { combineReducers, configureStore } from "@reduxjs/toolkit"

import authSlice from './modules/auth/index';
import groupSlice from './modules/group/index';

const reducers = combineReducers({
  auth: authSlice,
  group: groupSlice
})

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;