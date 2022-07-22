import { useInfiniteRandomPhotos } from "../../../utils/api/randomPhotos";
import InfiniteScroll from "../../../common/InfiniteScroll";
import { classNames } from "../../../utils";
import { ImageWithLabel } from "./ImageWithLabel";

export const HomeFeed = ({ topicId }: { topicId?: string }) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
		useInfiniteRandomPhotos(18, undefined, topicId);

	return (
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
										index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1",
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
										index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1",
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
										index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1",
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
							key={randomPhoto.id}
							randomPhoto={randomPhoto}
							index={index}
						/>
					))
				)}
			</div>
		</InfiniteScroll>
	);
};
