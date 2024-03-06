
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    username:null,
    fieldOfWork:null,
    degree:null,
    substanceOrStyle:null,
  },
};

export const usersSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    initiateTemporaryUser: (state, action) => {
      state.value.fieldOfWork = action.payload.fieldOfWork;
      state.value.degree = action.payload.degree;
      state.value.substanceOrStyle = action.payload.substanceOrStyle;
    },
    login:(state, action)=>{
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    }
  },
});

export const { initiateTemporaryUser,login } = usersSlice.actions;
export default usersSlice.reducer;