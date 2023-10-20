import { createSlice } from "@reduxjs/toolkit";

export const THEME = {
  LIGHT: "Light",
  DARK: "Dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: "DARK",
  reducers: {
    themeChanged(state, action) {
      const newTheme = action.payload;
      return newTheme;
    },
  },
});

export const getCurrentTheme = (state) => state.theme;

export const { themeChanged } = themeSlice.actions;

export default themeSlice.reducer;
