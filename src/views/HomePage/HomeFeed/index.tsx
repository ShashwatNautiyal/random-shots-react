import { useInfiniteRandomPhotos } from "../../../utils/api/randomPhotos";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import { ImageWithLabel } from "./ImageWithLabel";
import Modal from "../../../common/Modal";
import { Fragment, useEffect, useState } from "react";
import { RandomPhoto } from "../../../utils/types/random";
import PhotoPreview from "../../../common/PhotoPreview";
import PrimaryButton from "../../../common/PrimaryButton";
import { HomeLoadingSkeleton } from "../../../common/LoadingSkeleton";
import CustomError from "../../../common/CustomError";

export const HomeFeed = ({ topicId }: { topicId?: string }) => {
	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		status,
		isRefetching,
		refetch,
		expiresIn,
		error,
	} = useInfiniteRandomPhotos(18, undefined, topicId);

	const [photo, setPhoto] = useState<RandomPhoto>();
	const [showModal, setShowModal] = useState(false);
	const [showNewPhotosBtn, setShowNewPhotosBtn] = useState(false);

	useEffect(() => {
		if (!expiresIn) return;
		const expiresInMiliseconds = new Date(expiresIn).getTime() - new Date().getTime();

		console.log(expiresInMiliseconds);

		if (expiresInMiliseconds < 1) {
			setShowNewPhotosBtn(false);
			return;
		}

		const timeout = setTimeout(() => {
			setShowNewPhotosBtn(true);
		}, expiresInMiliseconds);

		return () => {
			clearTimeout(timeout);
		};
	}, [expiresIn]);

	useEffect(() => {
		if (status === "fetching" || status === "error") setShowNewPhotosBtn(false);
	}, [status]);

	if (status === "error") {
		return (
			<CustomError
				errMessage={error.response?.data ?? error.message}
				statusCode={error.response?.status}
			/>
		);
	}

	return (
		<>
			<Modal show={showModal} setShow={() => setShowModal(false)}>
				<PhotoPreview photo={photo} />
			</Modal>
			<InfiniteScroll
				status={status}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				loadingLayout={
					<div className="xl:w-10/12 w-full max-w-[1400px] mx-auto">
						{HomeLoadingSkeleton}
					</div>
				}
			>
				<div className="text-center">
					<div
						style={{ borderTopColor: "transparent" }}
						className={classNames(
							isRefetching ? "w-16 h-16 border-4 mt-5" : "w-0 h-0 border-0 mt-0",
							"border-gray-400 border-solid rounded-full animate-spin mx-auto transition-all"
						)}
					></div>
				</div>
				<div
					className={classNames(
						showNewPhotosBtn ? "md:top-24 top-28" : "-top-10",
						"fixed mx-auto left-1/2 -translate-x-1/2 z-20 transition-all"
					)}
				>
					<PrimaryButton
						customStyle={{
							borderRadius: "9999px",
							paddingLeft: "1rem",
							paddingRight: "1rem",
							boxShadow: "none",
						}}
						text="New Photos"
						onClick={() => {
							window.scroll({ top: 0, behavior: "auto" });
							refetch();
							setShowNewPhotosBtn(false);
						}}
					/>
				</div>
				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4 gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto pt-5">
					{data?.map((item) =>
						item.result.map((randomPhoto, index) => (
							<Fragment key={randomPhoto.id}>
								<ImageWithLabel
									className={classNames(
										index === 0 || index === 11
											? "col-span-2 row-span-2"
											: "col-span-1",
										"h-full w-full aspect-square relative cursor-pointer lg:block hidden"
									)}
									onClick={() => {
										setPhoto(randomPhoto);
										setShowModal(true);
									}}
									photo={randomPhoto}
									index={index}
								/>
								<ImageWithLabel
									className={classNames(
										index === 0 || index === 10
											? "md:col-span-2 md:row-span-2"
											: "col-span-1",
										"h-full w-full aspect-square relative cursor-pointer lg:hidden block"
									)}
									onClick={() => {
										setPhoto(randomPhoto);
										setShowModal(true);
									}}
									photo={randomPhoto}
									index={index}
								/>
							</Fragment>
						))
					)}
				</div>
			</InfiniteScroll>
		</>
	);
};
