import { AxiosError } from "axios";

import { useCacheApi } from "../../hooks/cacheApi/useCacheApi";
import { privateAxios } from "../../axios";

import { Topic } from "../../types/topic";

export const useTopicList = (
	page = 1,
	per_page = 10,
	order_by = "featured" as "featured" | "latest" | "oldest" | "position"
) => {
	return useCacheApi<Topic[], AxiosError>(
		["topicList", page, per_page, order_by],
		() =>
			privateAxios
				.get("/topics", {
					params: {
						page,
						per_page,
						order_by,
					},
				})
				.then((res) => res.data),
		{
			staleTime: 60 * 1000,
			storeInStorage: "local",
		}
	);
};
