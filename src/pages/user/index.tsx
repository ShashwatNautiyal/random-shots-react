import React, { useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUserProfile, useUserProfilePhotos } from "../../api/user";
import Image from "../../components/Image";
import PrimaryButton from "../../components/PrimaryButton";
import InfiniteScroll from "../../containers/infiniteScroll";
import { classNames } from "../../utils";

const User = () => {
	return (
		<div className="flex my-8 lg:flex-row flex-col">
			<Sidebar />
			<ProfileFeed />
		</div>
	);
};

const Sidebar = () => {
	const { username } = useParams();

	const { data, status, error } = useUserProfile(username);

	if (status === "error" || status === "fetching") {
		return <div></div>;
	}

	return (
		<div className="flex flex-col xl:w-[400px] lg:w-[300px] w-full flex-shrink-0 px-6 lg:h-screen lg:sticky lg:top-10">
			<div className="flex justify-center">
				<div className="h-16 w-16">
					<Image
						imageCustomStyles={{
							borderRadius: "9999px",
							outline: "2px solid #000000",
							outlineOffset: "2px",
						}}
						urls={data.profile_image}
						loading="eager"
						alt={data.name}
					/>
				</div>
			</div>

			<div className="flex justify-between my-5">
				<div className="flex flex-col text-center flex-1">
					<p className="text-gray-900 text-lg font-semibold">{data.total_photos}</p>
					<p className="text-gray-500">{"posts"}</p>
				</div>

				<div className="flex flex-col text-center flex-1">
					<p className="text-gray-900 text-lg font-semibold">{data.followers_count}</p>
					<p className="text-gray-500">{"followers"}</p>
				</div>

				<div className="flex flex-col text-center flex-1">
					<p className="text-gray-900 text-lg font-semibold">{data.following_count}</p>
					<p className="text-gray-500">{"following"}</p>
				</div>
			</div>
			<PrimaryButton text="Follow" bgColor="bg-blue-600" />

			<div className="mt-8">
				<h1 className="font-semibold">{data.name}</h1>

				<h2 className="my-2">{data.bio}</h2>

				<a href={data.portfolio_url} target="_blank" referrerPolicy="no-referrer">
					<p className="text-blue-600 whitespace-nowrap overflow-hidden xl:w-[380px] lg:w-[280px] w-full text-ellipsis">
						{data.social.portfolio_url}
					</p>
				</a>
			</div>

			<div className="lg:grid lg:grid-cols-3 lg:gap-3 flex gap-10 overflow-scroll py-8">
				{data.tags.aggregated
					.filter((item) => item.source !== undefined)
					.slice(0, 12)
					.map((tag) => {
						if (tag.source) {
							return (
								<div className="flex flex-col text-center gap-2">
									<div className="h-16 w-16 mx-auto">
										<Image
											imageCustomStyles={{
												borderRadius: "9999px",
												outline: "2px solid #9ca3af",
												outlineOffset: "2px",
											}}
											urls={tag.source.cover_photo.urls}
											loading="eager"
											alt={tag.title}
										/>
									</div>
									<h3 className="text-sm text-gray-900">{tag.title}</h3>
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};

const ProfileFeed = () => {
	const { username } = useParams();
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } = useUserProfilePhotos(
		username,
		undefined,
		18
	);

	return (
		<div className="flex flex-col gap-5">
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

export default User;
