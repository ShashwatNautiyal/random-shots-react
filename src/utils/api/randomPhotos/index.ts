import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useCacheApi } from "../../hooks/useCacheApi";
import { useInfiniteApi } from "../../hooks/useInfiniteApi";
import { RandomPhoto } from "../../../types/random";
import { privateAxios } from "../../axios";

export const useInfiniteRandomPhotos = (count = 22, collections?: string, topics?: string) => {
	return useInfiniteApi<
		{
			result: RandomPhoto[];
			nextPage: number;
			totalPages: number;
		},
		AxiosError
	>(
		["randomPhotos", collections, topics, count],
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
		}
	);
};
