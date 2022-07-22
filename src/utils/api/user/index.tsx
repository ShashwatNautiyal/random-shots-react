import { AxiosError } from "axios";
import { useCacheApi } from "../../hooks/useCacheApi";
import { useInfiniteApi } from "../../hooks/useInfiniteApi";
import { User } from "../../../types/user";
import { UserPhoto } from "../../../types/userPhotos";
import { privateAxios } from "../../axios";

export const useUserProfile = (username?: string) => {
	if (!username) {
		throw Error("username is not defined");
	}
	return useCacheApi<User, AxiosError>(["user", username], () =>
		privateAxios.get(`/users/${username}`).then((res) => res.data)
	);
};

export const useUserProfilePhotos = (
	username?: string,
	page = 1,
	per_page = 10,
	order_by = "latest" as "latest" | "oldest" | "popular" | "views" | "downloads",
	stats?: false,
	orientation = "landscape" as "landscape" | "portrait" | "squarish"
) => {
	if (!username) {
		throw Error("username is not defined");
	}

	return useInfiniteApi<
		{
			result: UserPhoto[];
			nextPage: number;
			totalPages: number;
		},
		AxiosError
	>(
		["userPhotos", username, page, per_page, order_by, stats, orientation],
		async ({ pageParam = page }) => {
			return privateAxios
				.get(`/users/${username}/photos`, {
					params: {
						username,
						page: pageParam,
						per_page,
						order_by,
						stats,
						orientation,
					},
				})
				.then((res) => ({
					result: res.data as UserPhoto[],
					nextPage: pageParam + 1,
					totalPages: Math.ceil(parseInt(res.headers["x-total"]) / per_page),
				}));
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
		}
	);
};
