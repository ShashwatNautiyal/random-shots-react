import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUserProfilePhotos } from "../../../utils/api/user";
import Image from "../../../common/Image";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import Modal from "../../../common/Modal";
import { useState } from "react";
import { UserPhoto } from "../../../utils/types/userPhotos";
import { privateAxios } from "../../../utils/axios";
import { AxiosResponse } from "axios";

export const ProfileFeed = () => {
	const { username } = useParams();
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } = useUserProfilePhotos(
		username,
		undefined,
		18
	);

	const [photo, setPhoto] = useState<UserPhoto>();
	const [show, setShow] = useState(false);

	const handleDownload = async (downloadLocation?: string, name?: string) => {
		try {
			if (!downloadLocation) return;
			const {
				data: { url },
			} = (await privateAxios.get(downloadLocation, { baseURL: "" })) as AxiosResponse<{
				url: string;
			}>;
			const image = await fetch(url);
			const imageBlog = await image.blob();
			const imageURL = URL.createObjectURL(imageBlog);

			const link = document.createElement("a");
			link.href = imageURL;
			link.download = name ?? "unsplash-photo";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col gap-5 w-full">
			<Modal show={show} setShow={() => setShow(false)}>
				<div className="shadow-2xl rounded-lg">
					<Image
						blurHash={photo?.blur_hash}
						className="block w-full h-full"
						imageCustomStyles={{
							borderRadius: "8px",
							maxHeight: "90vh",
						}}
						loading="eager"
						src={photo?.urls.regular ?? ""}
						urls={photo?.urls ?? {}}
					/>
					<div className="absolute bottom-0 flex sm:flex-row flex-col-reverse sm:m-2 m-1 sm:gap-2 gap-1">
						<div
							style={{
								background: `${photo?.color}aa`,
							}}
							className="relative backdrop-blur w-fit rounded-md py-2 px-3 flex items-center"
						>
							<div className="absolute inset-0 bg-black bg-opacity-10 rounded-md"></div>

							<p className="text-white sm:font-medium font-normal sm:text-base text-sm z-20">
								Photo by{" "}
								<a
									target={"_blank"}
									className="text-blue-600 underline"
									href={`https://unsplash.com/@${photo?.user.username}?utm_source=https://unsplash-gram.vercel.app/&utm_medium=referral`}
								>
									@{photo?.user.username}
								</a>{" "}
								on{" "}
								<a
									target={"_blank"}
									className="text-blue-600 underline"
									href="https://unsplash.com/?utm_source=https://unsplash-gram.vercel.app/&utm_medium=referral"
								>
									Unsplash
								</a>
							</p>
						</div>
						<div
							style={{
								background: `${photo?.color}aa`,
							}}
							className="relative backdrop-blur w-fit rounded-md py-2 px-3 flex items-center"
						>
							<div
								onClick={() =>
									handleDownload(
										photo?.links.download_location,
										`${photo?.user.name}-${photo?.id}`
									)
								}
								className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 rounded-md cursor-pointer"
							></div>

							<p className="text-white font-normal z-20 pointer-events-none sm:font-medium  sm:text-base text-sm">
								Download
							</p>
						</div>
					</div>
				</div>
			</Modal>
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
					{data?.map((item, index) =>
						item.result.map((photo, index) => (
							<div
								key={photo.id}
								className="relative min-h-full min-w-full aspect-square"
							>
								<Image
									onClick={() => {
										setPhoto(photo);
										setShow(true);
									}}
									blurHash={photo.blur_hash}
									loading="lazy"
									alt={photo.alt_description ?? ""}
									objectFit="cover"
									src={photo.urls.small}
									urls={photo.urls}
									className={classNames("block h-full w-full")}
								/>
								<LikeBtn photo={photo} />
							</div>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};

const LikeBtn = ({ photo }: { photo: UserPhoto }) => {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<div
			onClick={() => setIsLiked((prev) => !prev)}
			style={{
				background: `${photo.color}aa`,
			}}
			className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2 cursor-pointer"
		>
			<div className="absolute inset-0 bg-black bg-opacity-10 rounded-md"></div>
			<AiFillHeart className={`h-7 w-7 ${isLiked ? "text-red-600" : "text-white"}  z-10`} />
			<p className="text-white text-lg z-10">{isLiked ? photo.likes + 1 : photo.likes}</p>
		</div>
	);
};
