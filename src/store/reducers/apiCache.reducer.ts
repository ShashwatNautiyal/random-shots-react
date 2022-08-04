import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IApiResponse {
	status: "fetching" | "success" | "error";
	data?: null | unknown;
	error?: null | unknown;
	expiresIn?: null | Date;
}

type PayloadType = {
	key: string;
	data?: unknown;
	error?: unknown;
	storeInStorage?: "local" | "session";
	timeout?: number;
};

const initialState: Record<string, IApiResponse> = {};

export const QuerySlice = createSlice({
	name: "query",
	initialState,
	reducers: {
		setSuccessResponse: (state, action: PayloadAction<PayloadType>) => {
			const _state = {
				status: "success",
				data: action.payload.data,
				error: null,
				expiresIn: action.payload.timeout
					? new Date(new Date().getTime() + action.payload.timeout)
					: undefined,
			} as const;

			if (action.payload.storeInStorage === "session") {
				sessionStorage.setItem(action.payload.key, JSON.stringify(_state));
			} else if (action.payload.storeInStorage === "local")
				localStorage.setItem(action.payload.key, JSON.stringify(_state));

			state[action.payload.key] = _state;
		},
		setFetchingResponse: (
			state,
			action: PayloadAction<Omit<PayloadType, "storeInStorage" | "timeout">>
		) => {
			state[action.payload.key] = {
				status: "fetching",
				data: null,
				error: null,
			};
		},
		setErrorResponse: (
			state,
			action: PayloadAction<Omit<PayloadType, "storeInStorage" | "timeout">>
		) => {
			state[action.payload.key] = {
				status: "error",
				data: null,
				error: action.payload.error,
			};
		},
		deleteResponse: (state, action: PayloadAction<string>) => {
			if (sessionStorage.getItem(action.payload)) sessionStorage.removeItem(action.payload);
			else if (localStorage.getItem(action.payload)) localStorage.removeItem(action.payload);
		},
	},
});

export const { setSuccessResponse, setErrorResponse, setFetchingResponse, deleteResponse } =
	QuerySlice.actions;

export default QuerySlice.reducer;
