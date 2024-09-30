import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../featured/authSlice'

const store = configureStore({

  reducer: {
    auth: authSlice,
  }

});

export default store;