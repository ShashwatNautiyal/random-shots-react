import { useEffect, useState } from "react";
import {
	setSuccessResponse,
	setFetchingResponse,
	setErrorResponse,
} from "../../store/reducers/query.reducer";
import { useAppDispatch, useAppSelector } from "./reducer";

type InfiniteApiReturnType<DataT, ErrorT> =
	| {
			status: "success";
			data: DataT[];
			error?: null;
			isFetchingNextPage: boolean;
			hasNextPage: boolean;
			fetchNextPage: () => void;
	  }
	| {
			status: "error";
			data?: null;
			error: ErrorT;
			isFetchingNextPage: false;
			hasNextPage: false;
			fetchNextPage: () => void;
	  }
	| {
			status: "fetching";
			data?: null;
			error?: null;
			isFetchingNextPage: false;
			hasNextPage: false;
			fetchNextPage: () => void;
	  };

export const useInfiniteApi = <DataT, ErrorT>(
	_key: any[],
	fetchFunction: ({ pageParam }: { pageParam?: number }) => Promise<DataT>,
	paramFunctions: { getNextPageParam: (lastPage: DataT) => number | undefined }
): InfiniteApiReturnType<DataT, ErrorT> => {
	const cache = useAppSelector((state) => state.query);
	const dispatch = useAppDispatch();

	const key = _key.join(" ");

	const [status, setStatus] = useState<"success" | "error" | "fetching">("fetching");

	const [data, setData] = useState<DataT[] | undefined | null>();

	const [error, setError] = useState<ErrorT | undefined | null>();

	const [hasNextPage, setHasNextPage] = useState(true);

	const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

	useEffect(() => {
		if (!cache[key]) {
			const fetchApi = async () => {
				setStatus("fetching");
				dispatch(setFetchingResponse({ key, data: null, error: null }));
				try {
					const data = await fetchFunction({ pageParam: undefined });
					const nextPage = paramFunctions.getNextPageParam(data);
					if (nextPage) setHasNextPage(true);
					dispatch(setSuccessResponse({ key, data: [data], error: null }));
					setData([data]);
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
				setData([...(cache[key].data as DataT[])]);
			}
			setError(cache[key].error as ErrorT);
		}
	}, [key]);

	const fetchNextPage = () => {
		if (data) {
			const fetchNext = async () => {
				const nextPage = paramFunctions.getNextPageParam(data[data?.length - 1]);
				if (nextPage) {
					setHasNextPage(true);
					setIsFetchingNextPage(true);
					const nextData = await fetchFunction({ pageParam: nextPage });
					dispatch(setSuccessResponse({ key, data: [...data, nextData], error: null }));
					setData((prev) => {
						if (prev) return [...prev, nextData];
					});
					setIsFetchingNextPage(false);
				} else {
					setHasNextPage(false);
				}
			};
			fetchNext();
		}
	};

	if (status === "fetching") {
		return {
			status,
			data: null,
			error: null,
			hasNextPage: false,
			isFetchingNextPage: false,
			fetchNextPage,
		};
	}

	if (status === "success") {
		return {
			status,
			data: data as DataT[],
			error: null,
			isFetchingNextPage,
			hasNextPage,
			fetchNextPage,
		};
	}

	return {
		status,
		data: null,
		error: error as ErrorT,
		isFetchingNextPage: false,
		hasNextPage: false,
		fetchNextPage,
	};
};
