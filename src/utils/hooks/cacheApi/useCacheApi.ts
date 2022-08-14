import { useEffect, useState } from "react";

import {
	setSuccessResponse,
	setFetchingResponse,
	setErrorResponse,
} from "../../../store/reducers/apiCache";
import { useAppDispatch, useAppSelector } from "../reducer";

import { useCacheStorage } from "./useCacheStorage";

type CacheApiReturnType<DataT, ErrorT> =
	| {
			status: "success";
			data: DataT;
			error?: null;
			expiresIn?: Date;
			isRefetching: boolean;
			refetch: () => void;
			isStale: boolean;
	  }
	| {
			status: "error";
			data?: null;
			error: ErrorT;
			expiresIn?: null;
			isRefetching: false;
			refetch: () => void;
			isStale: boolean;
	  }
	| {
			status: "fetching";
			data?: null;
			error?: null;
			expiresIn?: null;
			isRefetching: false;
			refetch: () => void;
			isStale: boolean;
	  };

export const useCacheApi = <DataT, ErrorT>(
	_key: any[],
	fetchFunction: () => Promise<DataT>,
	options?: { staleTime?: number; storeInStorage?: "local" | "session"; refetchOnStale?: boolean }
): CacheApiReturnType<DataT, ErrorT> => {
	const cache = useAppSelector((state) => state.apiCache);
	const dispatch = useAppDispatch();

	// Join all the keys to one key string
	const key = _key.join(" ");

	const [status, setStatus] = useState<"success" | "error" | "fetching">("fetching");
	const [data, setData] = useState<DataT | undefined | null>();
	const [error, setError] = useState<ErrorT | undefined | null>();
	const [expiresIn, setExpiresIn] = useState<Date>();
	const [isRefetching, setIsRefetching] = useState(false);

	// Custom hook for cache data by key
	const { cacheData, isStale } = useCacheStorage<DataT>(key);

	// Default options
	const {
		staleTime = 5 * 60 * 1000,
		storeInStorage = "session",
		refetchOnStale = true,
	} = options ?? {};

	console.log(cacheData, isStale);

	useEffect(() => {
		if (cacheData) {
			setStatus(cacheData.status);
			setData(cacheData.data);
			setError(cacheData.error);
			setExpiresIn(cacheData.expiresIn);

			// Refetch API if isStale or refetchOnStale is true
			if (isStale && refetchOnStale) {
				refetch();
			}
		} else if (!cache[key]) {
			const fetchApi = async () => {
				dispatch(setFetchingResponse({ key, data: null, error: null }));
				setStatus("fetching");
				try {
					const data = await fetchFunction();
					dispatch(
						setSuccessResponse({
							key,
							data,
							error: null,
							storeInStorage: storeInStorage,
							timeout: staleTime,
						})
					);
					setData(data);
					setStatus("success");
					setExpiresIn(new Date(new Date().getTime() + staleTime));
				} catch (error) {
					dispatch(setErrorResponse({ key, data: null, error: error as ErrorT }));
					setError(error as ErrorT);
					setStatus("error");
				}
			};
			fetchApi();
		}
	}, [key]);

	const refetch = () => {
		const fetchApi = async () => {
			setIsRefetching(true);
			try {
				const data = await fetchFunction();
				dispatch(
					setSuccessResponse({
						key,
						data,
						error: null,
						storeInStorage: storeInStorage,
						timeout: staleTime,
					})
				);
				setData(data);
				setIsRefetching(false);
				setExpiresIn(new Date(new Date().getTime() + staleTime));
			} catch (error) {
				setIsRefetching(false);
				console.error(error);
			}
		};
		fetchApi();
	};

	if (status === "fetching") {
		return {
			status,
			data: null,
			error: null,
			isRefetching: false,
			expiresIn: null,
			refetch,
			isStale,
		};
	}

	if (status === "success") {
		return {
			status,
			data: data as DataT,
			error: null,
			expiresIn,
			isRefetching,
			refetch,
			isStale,
		};
	}

	return {
		status,
		data: null,
		error: error as ErrorT,
		isRefetching: false,
		expiresIn: null,
		refetch,
		isStale,
	};
};
