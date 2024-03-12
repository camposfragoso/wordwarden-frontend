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
      state.value.mainFolderId = action.payload.mainFolderId
    },
    logout: (state, action) => {
      state.value.token = null;
      state.value.firstName = null;
      state.value.mainFolderId = null;
    }
  },
});

export const { initiateTemporaryUser,login, logout } = usersSlice.actions;
export default usersSlice.reducer;