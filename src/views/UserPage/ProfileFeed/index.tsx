import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useUserProfilePhotos } from "../../../utils/api/user";
import Image from "../../../common/Image";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import Modal from "../../../common/Modal";
import { useState } from "react";
import { UserPhoto } from "../../../utils/types/userPhotos";

export const ProfileFeed = () => {
	const { username } = useParams();
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } = useUserProfilePhotos(
		username,
		undefined,
		18
	);

	const [photo, setPhoto] = useState<UserPhoto>();
	const [show, setShow] = useState(false);

	return (
		<div className="flex flex-col gap-5 w-full">
			<Modal show={show} setShow={() => setShow(false)}>
				<div className="shadow-2xl rounded-lg">
					<Image
						className="block h-full"
						imageCustomStyles={{
							borderRadius: "8px",
							maxHeight: "90vh",
							width: "100%",
						}}
						loading="eager"
						src={photo?.urls.regular ?? ""}
						urls={photo?.urls ?? {}}
					/>
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
								<div
									style={{
										background: `${photo.color}aa`,
									}}
									className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2"
								>
									<div className="absolute inset-0 bg-black bg-opacity-10 rounded-md"></div>
									<AiFillHeart className="h-7 w-7 text-white z-10" />
									<p className="text-white text-lg z-10">{photo.likes}</p>
								</div>
							</div>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
