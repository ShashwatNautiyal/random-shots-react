import { useParams } from "react-router-dom";
import { useUserProfilePhotos } from "../../../utils/api/user";
import Image from "../../../common/Image";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import Modal from "../../../common/Modal";
import { useState } from "react";
import { UserPhoto } from "../../../utils/types/userPhoto";
import PhotoPreview from "../../../common/PhotoPreview";
import { LikeButton } from "../../../common/LikeButton";
import { ProfileLoadingSkeleton } from "../../../common/LoadingSkeleton";

export const ProfileFeed = () => {
	const { username } = useParams();
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status, error } =
		useUserProfilePhotos(username, undefined, 18);

	const [photo, setPhoto] = useState<UserPhoto>();
	const [show, setShow] = useState(false);

	if (data && data[0].totalPages === 0) {
		return <p className="text-lg">This user has not posted anything yet</p>;
	}

	return (
		<div className="flex flex-col gap-5 w-full">
			<Modal show={show} setShow={() => setShow(false)}>
				<PhotoPreview photo={photo} />
			</Modal>
			<InfiniteScroll
				status={status}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				loadingLayout={<div className="px-4">{ProfileLoadingSkeleton}</div>}
			>
				<div className="grid md:grid-cols-3 sm:grid-cols-2 px-4 gap-5 max-w-[1500px]">
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
									className={classNames("block h-full w-full cursor-pointer")}
								/>
								<LikeButton
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										margin: "0.5rem",
									}}
									photo={photo}
								/>
							</div>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
