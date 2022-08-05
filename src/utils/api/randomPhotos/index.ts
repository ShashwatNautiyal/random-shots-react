import { AxiosError } from "axios";

import { privateAxios } from "../../axios";
import { useInfiniteApi } from "../../hooks/cacheApi/useInfiniteApi";

import { RandomPhoto } from "../../types/random";

export const useInfiniteRandomPhotos = (count = 22, collections?: string, topics?: string) => {
	return useInfiniteApi<
		{
			result: RandomPhoto[];
			nextPage: number;
			totalPages: number;
		},
		AxiosError<string | undefined>
	>(
		["randomPhotos", count, collections, topics],
		async ({ pageParam = 1 }) => {
			return privateAxios
				.get("photos/random", {
					params: {
						collections,
						topics,
						count,
					},
				})
				.then((res) => ({
					result: res.data as RandomPhoto[],
					nextPage: pageParam + 1,
					totalPages: 100,
				}));
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		},
		{
			staleTime: 60 * 1000,
			storeInStorage: "local",
		}
	);
};
