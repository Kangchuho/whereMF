import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const name = "tab";
type stateType = {
  menu: { name: string; content: number };
};

const initialState: stateType = {
  menu: { name: "", content: 0 },
};

export const tabSlice = createSlice({
  name,
  initialState,
  reducers: {
    setMenu: (
      state,
      action: PayloadAction<{ name: string; content: string }>
    ) => {
      state.menu.name = action.payload.name;
    }     
  },
  extraReducers: {},
});
export const { setMenu } = tabSlice.actions;

export default tabSlice.reducer;
