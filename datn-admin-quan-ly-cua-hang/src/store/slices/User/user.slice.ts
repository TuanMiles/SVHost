import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserDataState {
  userData: {
    _id: string
    username: string
    avatar: string
    gender: string
    loyalCustomers: boolean
  }
}

const initialState: IUserDataState = {
  userData: {
    _id: '',
    username: '',
    avatar: '',
    gender: '',
    loyalCustomers: false
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
