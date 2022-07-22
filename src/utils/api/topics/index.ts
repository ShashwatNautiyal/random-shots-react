import { AxiosError } from "axios";
import { useCacheApi } from "../../hooks/useCacheApi";
import { Topic } from "../../types/topic";
import { privateAxios } from "../../axios";

export const useTopicList = (
	page = 1,
	per_page = 10,
	order_by = "featured" as "featured" | "latest" | "oldest" | "position"
) => {
	return useCacheApi<Topic[], AxiosError>(["topicList", page, per_page, order_by], () =>
		privateAxios
			.get("/topics", {
				params: {
					page,
					per_page,
					order_by,
				},
			})
			.then((res) => res.data)
	);
};
