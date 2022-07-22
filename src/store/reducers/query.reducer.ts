import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IApiResponse {
	status: "fetching" | "success" | "error";
	data?: null | unknown;
	error?: null | unknown;
}

const initialState: Record<string, IApiResponse> = {};

export const QuerySlice = createSlice({
	name: "query",
	initialState,
	reducers: {
		setSuccessResponse: (
			state,
			action: PayloadAction<{ key: string; data?: unknown; error?: unknown }>
		) => {
			state[action.payload.key] = {
				status: "success",
				data: action.payload.data,
				error: null,
			};
		},
		setFetchingResponse: (
			state,
			action: PayloadAction<{ key: string; data?: unknown; error?: unknown }>
		) => {
			state[action.payload.key] = {
				status: "fetching",
				data: null,
				error: null,
			};
		},
		setErrorResponse: (
			state,
			action: PayloadAction<{ key: string; data?: unknown; error?: unknown }>
		) => {
			state[action.payload.key] = {
				status: "error",
				data: null,
				error: action.payload.error,
			};
		},
		deleteResponse: (state, action: PayloadAction<string>) => {
			delete state[action.payload];
		},
	},
});

export const { setSuccessResponse, setErrorResponse, setFetchingResponse, deleteResponse } =
	QuerySlice.actions;

export default QuerySlice.reducer;
