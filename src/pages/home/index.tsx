import { Link, useParams } from "react-router-dom";
import { useInfiniteRandomPhotos } from "../../api/randomPhotos";
import ImageComponent from "../../components/Image";
import Topbar from "../../components/Topbar";
import InfiniteScroll from "../../containers/infiniteScroll";
import { RandomPhoto } from "../../types/random";
import { classNames } from "../../utils";

const Home = () => {
	const { topicId } = useParams();

	return (
		<>
			<Topbar />
			<HomeFeed topicId={topicId} />
		</>
	);
};

const HomeFeed = ({ topicId }: { topicId?: string }) => {
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, status } =
		useInfiniteRandomPhotos(18, undefined, topicId);

	return (
		<div className="flex flex-col gap-5">
			<InfiniteScroll
				status={status}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				loadingLayout={
					<>
						<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4  gap-5 xl:w-10/12 w-full max-w-[1400px] mx-auto">
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
								key={randomPhoto.id}
								randomPhoto={randomPhoto}
								index={index}
							/>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};

const ImageWithLabel = ({ randomPhoto, index }: { randomPhoto: RandomPhoto; index: number }) => {
	return (
		<>
			<div
				className={classNames(
					index === 0 || index === 11 ? "col-span-2 row-span-2" : "col-span-1",
					"h-full w-full aspect-square relative lg:block hidden"
				)}
			>
				<ImageComponent
					blurHash={randomPhoto.blur_hash}
					loading="lazy"
					alt={randomPhoto.description}
					objectFit="cover"
					urls={randomPhoto.urls}
				/>
				<div
					style={{
						backdropFilter: "blur(40px)",
						WebkitMask: `linear-gradient(transparent, ${randomPhoto.color} 70%)`,
						mask: `linear-gradient(transparent, ${randomPhoto.color} 70%)`,
					}}
					className="absolute inset-x-0 h-1/2 bottom-0"
				/>
				<Link to={`/user/${randomPhoto.user.username}`}>
					<div className="absolute w-full py-4 px-6 bottom-0 flex items-center font-satisfy gap-2">
						<div className="h-10 w-10">
							<ImageComponent
								imageCustomStyles={{ borderRadius: "9999px" }}
								loading="lazy"
								alt={randomPhoto.user.name}
								objectFit="cover"
								urls={randomPhoto.user.profile_image}
							/>
						</div>
						<p className="text-white">{randomPhoto.user.name}</p>
					</div>
				</Link>
			</div>
			<div
				className={classNames(
					index === 0 || index === 10 ? "md:col-span-2 md:row-span-2" : "col-span-1",
					"h-full w-full aspect-square relative lg:hidden block"
				)}
			>
				<ImageComponent
					blurHash={randomPhoto.blur_hash}
					loading="lazy"
					alt={randomPhoto.description}
					objectFit="cover"
					urls={randomPhoto.urls}
				/>
				<div
					style={{
						backdropFilter: "blur(40px)",
						WebkitMask: `linear-gradient(transparent, ${randomPhoto.color} 70%)`,
						mask: `linear-gradient(transparent, ${randomPhoto.color} 70%)`,
					}}
					className="absolute inset-x-0 h-1/2 bottom-0"
				/>
				<Link to={`/user/${randomPhoto.user.username}`}>
					<div className="absolute w-full py-4 px-6 bottom-0 flex items-center font-satisfy gap-2">
						<div className="h-10 w-10">
							<ImageComponent
								imageCustomStyles={{ borderRadius: "9999px" }}
								loading="lazy"
								alt={randomPhoto.user.name}
								objectFit="cover"
								urls={randomPhoto.user.profile_image}
							/>
						</div>
						<p className="text-white">{randomPhoto.user.name}</p>
					</div>
				</Link>
			</div>
		</>
	);
};

export default Home;
