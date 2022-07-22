import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUserProfilePhotos } from "../../../utils/api/user";
import Image from "../../../common/Image";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";

export const ProfileFeed = () => {
	const { username } = useParams();
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } = useUserProfilePhotos(
		username,
		undefined,
		18
	);

	return (
		<div className="flex flex-col gap-5 w-full">
			<InfiniteScroll
				status={status}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				loadingLayout={
					<>
						<div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 gap-5 max-w-[1500px]">
							{Array(3)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse xl:block hidden"
										)}
									></div>
								))}
							{Array(2)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse xl:hidden block"
										)}
									></div>
								))}
						</div>
						<div
							style={{ borderTopColor: "transparent" }}
							className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
						></div>
					</>
				}
			>
				<div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 gap-5 max-w-[1500px]">
					{data?.map((item) =>
						item.result.map((photo, index) => (
							<div className="relative min-h-full min-w-full aspect-square">
								<Image
									blurHash={photo.blur_hash}
									loading="lazy"
									alt={photo.alt_description ?? ""}
									objectFit="cover"
									src={photo.urls.small}
									key={photo.id}
									urls={photo.urls}
									className={classNames("")}
								/>
								<div
									style={{
										backdropFilter: "blur(40px)",
										WebkitMask: `linear-gradient(transparent, ${photo.color} 70%)`,
										mask: `linear-gradient(transparent, ${photo.color} 70%)`,
									}}
									className="absolute inset-x-0 h-1/2 bottom-0"
								/>
								<div className="absolute w-full py-4 px-6 bottom-0 flex items-center font-satisfy gap-2">
									<AiFillHeart className="h-8 w-8 text-white" />
									<p className="text-white text-lg">{photo.likes}</p>
								</div>
							</div>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
