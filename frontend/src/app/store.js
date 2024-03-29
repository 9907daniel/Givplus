import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import cartReducer from '../components/state'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
  
})

setupListeners(store.dispatch)