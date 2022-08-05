import { useEffect, useState } from "react";

import { useCacheStorage } from "./useCacheStorage";

import {
	setErrorResponse,
	setFetchingResponse,
	setSuccessResponse,
} from "../../../store/reducers/apiCache.reducer";
import { useAppDispatch, useAppSelector } from "../reducer";

type SuccessType<DataT> = {
	status: "success";
	data: DataT[];
	error?: null;
	expiresIn?: Date;
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	fetchNextPage: () => void;
	isRefetching: boolean;
	refetch: () => void;
	isStale: boolean;
};

type ErrorType<ErrorT> = {
	status: "error";
	data?: null;
	error: ErrorT;
	expiresIn: null;
	isFetchingNextPage: false;
	hasNextPage: false;
	fetchNextPage: () => void;
	isRefetching: false;
	refetch: () => void;
	isStale: boolean;
};

type FetchingType = {
	status: "fetching";
	data?: null;
	error?: null;
	expiresIn: null;
	isFetchingNextPage: false;
	hasNextPage: false;
	fetchNextPage: () => void;
	isRefetching: false;
	refetch: () => void;
	isStale: boolean;
};

type InfiniteApiReturnType<DataT, ErrorT> = SuccessType<DataT> | ErrorType<ErrorT> | FetchingType;

export const useInfiniteApi = <DataT, ErrorT>(
	_key: unknown[],
	fetchFunction: ({ pageParam }: { pageParam?: number }) => Promise<DataT>,
	paramFunctions: { getNextPageParam: (lastPage: DataT) => number | undefined },
	options?: { staleTime?: number; storeInStorage?: "local" | "session"; refetchOnStale?: boolean }
): InfiniteApiReturnType<DataT, ErrorT> => {
	const dispatch = useAppDispatch();

	// Default options
	const {
		staleTime = 5 * 60 * 1000,
		storeInStorage = "session",
		refetchOnStale = true,
	} = options ?? {};

	// Join all the keys to one key string
	const key = _key.join(" ");

	const cache = useAppSelector((state) => state.apiCache);

	const [status, setStatus] = useState<"success" | "error" | "fetching">("fetching");
	const [data, setData] = useState<DataT[] | undefined | null>();
	const [error, setError] = useState<ErrorT | undefined | null>();
	const [hasNextPage, setHasNextPage] = useState(true);
	const [expiresIn, setExpiresIn] = useState<Date>();
	const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
	const [isRefetching, setIsRefetching] = useState(false);

	const { cacheData, isStale } = useCacheStorage<DataT[]>(key);

	useEffect(() => {
		if (cacheData) {
			setStatus(cacheData.status);
			setData(cacheData.data);
			setError(cacheData.error);
			setExpiresIn(cacheData.expiresIn);

			if (isStale && refetchOnStale) {
				refetch();
			}
		} else if (!cache[key]) {
			const fetchApi = async () => {
				setStatus("fetching");
				dispatch(setFetchingResponse({ key, data: null, error: null }));
				try {
					const data = await fetchFunction({ pageParam: undefined });
					const nextPage = paramFunctions.getNextPageParam(data);
					if (nextPage) setHasNextPage(true);
					dispatch(
						setSuccessResponse({
							key,
							data: [data],
							error: null,
							storeInStorage: storeInStorage,
							timeout: staleTime,
						})
					);
					setData([data]);
					setStatus("success");
					setExpiresIn(new Date(new Date().getTime() + staleTime));
				} catch (error) {
					dispatch(setErrorResponse({ key, data: null, error: error as ErrorT }));
					setStatus("error");
					setError(error as ErrorT);
				}
			};
			fetchApi();
		}
	}, [key]);

	const fetchNextPage = () => {
		if (data) {
			const fetchNext = async () => {
				const nextPage = paramFunctions.getNextPageParam(data[data?.length - 1]);
				if (nextPage) {
					setHasNextPage(true);
					setIsFetchingNextPage(true);
					try {
						const nextData = await fetchFunction({ pageParam: nextPage });
						dispatch(
							setSuccessResponse({
								key,
								data: [...data, nextData],
								error: null,
							})
						);
						setData((prev) => {
							if (prev) return [...prev, nextData];
						});
						setIsFetchingNextPage(false);
					} catch (err) {
						setHasNextPage(false);
						setIsFetchingNextPage(false);
					}
				} else {
					setHasNextPage(false);
				}
			};
			fetchNext();
		}
	};

	const refetch = () => {
		const fetchApi = async () => {
			setIsRefetching(true);
			try {
				const data = await fetchFunction({ pageParam: undefined });
				const nextPage = paramFunctions.getNextPageParam(data);
				if (nextPage) setHasNextPage(true);
				dispatch(
					setSuccessResponse({
						key,
						data: [data],
						error: null,
						storeInStorage: storeInStorage,
						timeout: staleTime,
					})
				);
				setData([data]);
				setExpiresIn(new Date(new Date().getTime() + staleTime));
				setIsRefetching(false);
			} catch (err) {
				setIsRefetching(false);
			}
		};
		fetchApi();
	};

	if (status === "fetching") {
		return {
			status,
			data: null,
			error: null,
			hasNextPage: false,
			isFetchingNextPage: false,
			fetchNextPage,
			isRefetching: false,
			refetch,
			isStale,
			expiresIn: null,
		};
	}

	if (status === "success") {
		return {
			status,
			data: data as DataT[],
			error: null,
			isFetchingNextPage,
			expiresIn,
			hasNextPage,
			fetchNextPage,
			isRefetching,
			refetch,
			isStale,
		};
	}

	return {
		status,
		data: null,
		error: error as ErrorT,
		isFetchingNextPage: false,
		hasNextPage: false,
		fetchNextPage,
		isRefetching: false,
		refetch,
		isStale,
		expiresIn: null,
	};
};
