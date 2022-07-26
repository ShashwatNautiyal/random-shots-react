import { useParams } from "react-router-dom";
import { useUserProfile } from "../../../utils/api/user";
import Image from "../../../common/Image";
import PrimaryButton from "../../../common/PrimaryButton";
import LoadingLayout from "../../../common/LoadingLayout";

export const Sidebar = () => {
	const { username } = useParams();

	const { data, status, error } = useUserProfile(username);

	return (
		<LoadingLayout status={status} loadingLayout={Loading}>
			{({ isError }) =>
				isError ? (
					<div>{error?.message}</div>
				) : (
					<div className="flex flex-col xl:w-[400px] lg:w-[300px] w-full flex-shrink-0 px-6 lg:h-screen lg:sticky lg:top-10">
						<div className="flex justify-center">
							<div className="h-16 w-16">
								<Image
									imageCustomStyles={{
										borderRadius: "9999px",
										border: "2px solid black",
										padding: "2px",
									}}
									urls={data!.profile_image}
									src={data!.profile_image.medium}
									loading="eager"
									alt={data?.name}
								/>
							</div>
						</div>

						<div className="flex justify-between my-5">
							<div className="flex flex-col text-center flex-1">
								<p className="text-gray-900 text-lg font-semibold">
									{data?.total_photos}
								</p>
								<p className="text-gray-500">{"posts"}</p>
							</div>

							<div className="flex flex-col text-center flex-1">
								<p className="text-gray-900 text-lg font-semibold">
									{data?.followers_count}
								</p>
								<p className="text-gray-500">{"followers"}</p>
							</div>

							<div className="flex flex-col text-center flex-1">
								<p className="text-gray-900 text-lg font-semibold">
									{data?.following_count}
								</p>
								<p className="text-gray-500">{"following"}</p>
							</div>
						</div>
						<PrimaryButton text="Follow" bgColor="bg-blue-600" />

						<div className="mt-8">
							<h1 className="font-semibold">{data?.name}</h1>

							<h2 className="my-1">{data?.bio}</h2>

							<a
								href={data?.portfolio_url}
								target="_blank"
								referrerPolicy="no-referrer"
							>
								<p className="text-blue-600 whitespace-nowrap overflow-hidden xl:w-[380px] lg:w-[280px] w-full text-ellipsis">
									{data?.social.portfolio_url}
								</p>
							</a>
						</div>

						<div className="lg:grid lg:grid-cols-3 lg:gap-3 flex gap-10 overflow-scroll py-8">
							{data?.tags.aggregated
								.filter((item) => item.source !== undefined)
								.slice(0, 12)
								.map((tag, index) => {
									if (tag.source) {
										return (
											<div
												key={index}
												className="flex flex-col text-center gap-2"
											>
												<div className="h-16 w-16 mx-auto">
													<Image
														imageCustomStyles={{
															borderRadius: "9999px",
															border: "2px solid #cccccc",
															padding: "2px",
														}}
														urls={tag.source.cover_photo.urls}
														loading="eager"
														alt={tag.title}
														src={tag.source.cover_photo.urls.small}
													/>
												</div>
												<h3 className="text-sm text-gray-900">
													{tag.title}
												</h3>
											</div>
										);
									}
								})}
						</div>
					</div>
				)
			}
		</LoadingLayout>
	);
};

const Loading = (
	<div className="flex flex-col xl:w-[400px] lg:w-[300px] w-full flex-shrink-0 px-6 lg:h-screen lg:sticky lg:top-10 animate-pulse">
		<div className="flex justify-center">
			<div className="h-[70px] w-[70px] bg-gray-400 rounded-full"></div>
		</div>

		<div className="flex justify-around my-6">
			<div className="flex flex-col text-center w-10 bg-gray-400 h-10"></div>

			<div className="flex flex-col text-center w-10 bg-gray-400 h-10"></div>

			<div className="flex flex-col text-center w-10 bg-gray-400 h-10"></div>
		</div>
		<PrimaryButton text="EMPTY" bgColor="bg-gray-400 text-transparent" />

		<div className="mt-8 w-full flex flex-col">
			<div className="bg-gray-400 font-semibold h-4 w-1/3"></div>

			<div className="bg-gray-400 my-3 h-10 w-11/12"></div>
			<div className="bg-gray-400 h-4 w-1/2"></div>
		</div>

		<div className="lg:grid lg:grid-cols-3 lg:gap-5 flex gap-10 overflow-scroll py-8 no-scrollbar">
			{Array(9)
				.fill(0)
				.map((_, index) => {
					return (
						<div
							key={index}
							className="h-[70px] w-[70px] mx-auto bg-gray-400 rounded-full flex-shrink-0"
						></div>
					);
				})}
		</div>
	</div>
);
