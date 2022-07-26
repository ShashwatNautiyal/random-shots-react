import { useInfiniteRandomPhotos } from "../../../utils/api/randomPhotos";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import { ImageWithLabel } from "./ImageWithLabel";
import Modal from "../../../common/Modal";
import { useState } from "react";
import { RandomPhoto } from "../../../utils/types/random";
import Image from "../../../common/Image";
import { privateAxios } from "../../../utils/axios";
import { AxiosResponse } from "axios";

export const HomeFeed = ({ topicId }: { topicId?: string }) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
		useInfiniteRandomPhotos(18, undefined, topicId);

	const [photo, setPhoto] = useState<RandomPhoto>();
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
		<>
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
			</Modal>
			<InfiniteScroll
				status={status}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				loadingLayout={
					<>
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4  gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto mt-5">
							{Array(5)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											index === 0 ? "col-span-2 row-span-2" : "col-span-1",
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse lg:block hidden"
										)}
									></div>
								))}
							{Array(3)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											index === 0
												? "md:col-span-2 md:row-span-2"
												: "col-span-1",
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse lg:hidden md:block hidden"
										)}
									></div>
								))}
							{Array(4)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											index === 0
												? "md:col-span-2 md:row-span-2"
												: "col-span-1",
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse md:hidden sm:block hidden"
										)}
									></div>
								))}
							{Array(1)
								.fill(0)
								.map((item, index) => (
									<div
										key={index}
										className={classNames(
											index === 0
												? "md:col-span-2 md:row-span-2"
												: "col-span-1",
											"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse sm:hidden block"
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
				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4  gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto">
					{data?.map((item) =>
						item.result.map((randomPhoto, index) => (
							<ImageWithLabel
								style={{ cursor: "pointer" }}
								onClick={() => {
									setPhoto(randomPhoto);
									setShow(true);
								}}
								key={randomPhoto.id}
								randomPhoto={randomPhoto}
								index={index}
							/>
						))
					)}
				</div>
			</InfiniteScroll>
		</>
	);
};
