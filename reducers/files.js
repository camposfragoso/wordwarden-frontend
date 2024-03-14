import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
   id: undefined,
   content: undefined,
  },
};

export const filesSlice = createSlice({
  name: 'files',

  initialState,
  reducers: {
    loadFile: (state, action) => {
      state.value.id = action.payload.id;
      state.value.content = action.payload.content;
    }
  },
});

export const { loadFile } = filesSlice.actions;
export default filesSlice.reducer;