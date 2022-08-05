import { AxiosError } from "axios";

import { privateAxios } from "../../axios";
import { useInfiniteApi } from "../../hooks/cacheApi/useInfiniteApi";

import { FilterOptions } from "../../types/common";
import { Search } from "../../types/search";

export const useInfiniteSearch = (
	query: string,
	page: number = 1,
	per_page: number = 22,
	order_by?: FilterOptions["order_by"],
	color?: FilterOptions["color"],
	orientation?: FilterOptions["orientation"],
	content_filter?: FilterOptions["content_filter"]
) => {
	return useInfiniteApi<
		{
			result: Search["results"];
			nextPage: number;
			totalPages: Search["total_pages"];
			total: Search["total"];
		},
		AxiosError<string | undefined>
	>(
		[query, page, per_page, order_by, color, orientation, content_filter],
		async ({ pageParam = page }) => {
			return privateAxios
				.get("search/photos", {
					params: {
						query,
						page: pageParam,
						per_page,
						order_by,
						color,
						orientation,
						content_filter,
					},
				})
				.then((res) => ({
					result: res.data.results as Search["results"],
					nextPage: pageParam + 1,
					totalPages: res.data.total_pages,
					total: res.data.total,
				}));
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		},
		{
			staleTime: 60 * 1000,
			storeInStorage: "session",
		}
	);
};
