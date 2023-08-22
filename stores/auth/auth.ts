import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const name = "auth";
type stateType = {
  auth: { name: string; content: number };
};

const initialState: stateType = {
  auth: { name: "", content: 0 },
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ name: string; content: string }>
    ) => {
      state.auth.name = action.payload.name;
    }      
  },
  extraReducers: {},
});
export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
