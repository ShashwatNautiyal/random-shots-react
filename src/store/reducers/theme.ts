import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
	mode?: "dark" | "light";
}
const modeFromLocalStorage = localStorage.getItem("darkMode-key");
const initialState :ThemeState= {
	mode: (modeFromLocalStorage === "dark" || modeFromLocalStorage === "light")
		? modeFromLocalStorage
		: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
};

export const ThemeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<"dark" | "light">) => {
			state.mode = action.payload;
			localStorage.setItem("darkMode-key",state.mode)
		},
	},
});

export const { setMode } = ThemeSlice.actions;

export default ThemeSlice.reducer;
