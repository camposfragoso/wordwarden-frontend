
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    firstName:null,
    fieldOfWork:null,
    degree:null,
    substanceOrStyle:null,
    defaultActiveAssistants:null
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
      state.value.firstName = action.payload.firstName;
    }
  },
});

export const { initiateTemporaryUser,login } = usersSlice.actions;
export default usersSlice.reducer;