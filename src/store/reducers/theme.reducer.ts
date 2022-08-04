import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
	mode?: "dark" | "light";
}

const initialState: ThemeState = {
	mode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
};

export const ThemeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<"dark" | "light">) => {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = ThemeSlice.actions;

export default ThemeSlice.reducer;
