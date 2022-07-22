import { useEffect, useState } from "react";
import {
	setSuccessResponse,
	setFetchingResponse,
	setErrorResponse,
} from "../../store/reducers/query.reducer";
import { useAppDispatch, useAppSelector } from "./reducer";

type CacheApiReturnType<DataT, ErrorT> =
	| { status: "success"; data: DataT; error?: null }
	| { status: "error"; data?: null; error: ErrorT }
	| { status: "fetching"; data?: null; error?: null };

export const useCacheApi = <DataT, ErrorT>(
	_key: any[],
	func: () => Promise<DataT>
): CacheApiReturnType<DataT, ErrorT> => {
	const cache = useAppSelector((state) => state.query);
	const dispatch = useAppDispatch();

	const key = _key.join(" ");

	const [status, setStatus] = useState<"success" | "error" | "fetching">("fetching");

	const [data, setData] = useState<DataT | undefined | null>();

	const [error, setError] = useState<ErrorT | undefined | null>();

	useEffect(() => {
		if (!cache[key]) {
			const fetchApi = async () => {
				dispatch(setFetchingResponse({ key, data: null, error: null }));
				setStatus("fetching");
				try {
					const data = await func();
					dispatch(setSuccessResponse({ key, data, error: null }));
					setData(data);
					setStatus("success");
				} catch (error) {
					dispatch(setErrorResponse({ key, data: null, error: error as ErrorT }));
					setError(error as ErrorT);
					setStatus("error");
				}
			};
			fetchApi();
		}
	}, [key]);

	useEffect(() => {
		if (cache[key]) {
			setStatus(cache[key].status);
			if (cache[key].status === "success") {
				setData(cache[key].data as DataT);
			} else {
				setData(null);
			}
			if (error) {
				setError(cache[key].error as ErrorT);
			} else {
				setError(null);
			}
		}
	}, [key]);

	if (status === "fetching") {
		return { status, data: null, error: null };
	}

	if (status === "success") {
		return { status, data: data as DataT, error: null };
	}

	return { status, data: null, error: error as ErrorT };
};
