import { useEffect, useState } from "react";
import {
	setSuccessResponse,
	setFetchingResponse,
	setErrorResponse,
} from "../../store/reducers/apiCache.reducer";
import { useAppDispatch, useAppSelector } from "./reducer";
import { useCacheStorage } from "./useCacheStorage";

type CacheApiReturnType<DataT, ErrorT> =
	| { status: "success"; data: DataT; error?: null; expiresIn?: Date }
	| { status: "error"; data?: null; error: ErrorT }
	| { status: "fetching"; data?: null; error?: null };

export const useCacheApi = <DataT, ErrorT>(
	_key: any[],
	func: () => Promise<DataT>
): CacheApiReturnType<DataT, ErrorT> => {
	const cache = useAppSelector((state) => state.apiCache);
	const dispatch = useAppDispatch();

	const key = _key.join(" ");

	const [status, setStatus] = useState<"success" | "error" | "fetching">("fetching");

	const [data, setData] = useState<DataT | undefined | null>();

	const [error, setError] = useState<ErrorT | undefined | null>();

	const [expiresIn, setExpiresIn] = useState<Date>();

	const localData = useCacheStorage<DataT>(key);

	useEffect(() => {
		if (localData) {
			setStatus(localData.status);
			setData(localData.data);
			setError(localData.error);
			setExpiresIn(localData.expiresIn);
		} else if (!cache[key]) {
			const fetchApi = async () => {
				dispatch(setFetchingResponse({ key, data: null, error: null }));
				setStatus("fetching");
				try {
					const data = await func();
					dispatch(
						setSuccessResponse({
							key,
							data,
							error: null,
							storeInStorage: "session",
							timeout: 15 * 60 * 1000,
						})
					);
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
		return { status, data: data as DataT, error: null, expiresIn };
	}

	return { status, data: null, error: error as ErrorT };
};
