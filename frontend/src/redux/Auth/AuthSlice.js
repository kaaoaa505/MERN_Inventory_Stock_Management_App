import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const { isLoggedIn } = AuthSlice.actions;

export default AuthSlice.reducer