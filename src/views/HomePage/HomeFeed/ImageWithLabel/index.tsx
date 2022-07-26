import { Link } from "react-router-dom";
import Image from "../../../../common/Image";
import { RandomPhoto } from "../../../../utils/types/random";
import { classNames } from "../../../../utils";
import { ROUTES } from "../../../../router/webRoutes";

export const ImageWithLabel = ({
	randomPhoto,
	index,
	...rest
}: {
	randomPhoto: RandomPhoto;
	index: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<>
			<div
				{...rest}
				className={classNames(
					index === 0 || index === 11 ? "col-span-2 row-span-2" : "col-span-1",
					"h-full w-full aspect-square relative lg:block hidden"
				)}
			>
				<Image
					className="block h-full"
					src={randomPhoto.urls.regular}
					blurHash={randomPhoto.blur_hash}
					loading="lazy"
					alt={randomPhoto.description}
					objectFit={"cover"}
					urls={randomPhoto.urls}
				/>

				<Link to={ROUTES.USER + `${randomPhoto.user.username}`}>
					<div
						style={{
							background: `${randomPhoto.color}aa`,
						}}
						className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2"
					>
						<div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-40 transition-all rounded-md"></div>
						<div className="h-10 w-10 pointer-events-none">
							<Image
								imageCustomStyles={{ borderRadius: "9999px" }}
								loading="lazy"
								alt={randomPhoto.user.name}
								objectFit="cover"
								urls={randomPhoto.user.profile_image}
								src={randomPhoto.user.profile_image.medium}
							/>
						</div>
						<p className="text-white z-10 font-medium text-sm pointer-events-none">
							{randomPhoto.user.name}
						</p>
					</div>
				</Link>
			</div>
			<div
				{...rest}
				className={classNames(
					index === 0 || index === 10 ? "md:col-span-2 md:row-span-2" : "col-span-1",
					"h-full w-full aspect-square relative lg:hidden block"
				)}
			>
				<Image
					blurHash={randomPhoto.blur_hash}
					loading="lazy"
					alt={randomPhoto.description}
					objectFit="cover"
					urls={randomPhoto.urls}
					src={randomPhoto.urls.small}
				/>

				<Link to={ROUTES.USER + `${randomPhoto.user.username}`}>
					<div
						style={{
							background: `${randomPhoto.color}aa`,
						}}
						className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2"
					>
						<div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-40 transition-all rounded-md"></div>

						<div className="h-10 w-10">
							<Image
								imageCustomStyles={{ borderRadius: "9999px" }}
								loading="lazy"
								alt={randomPhoto.user.name}
								objectFit="cover"
								urls={randomPhoto.user.profile_image}
								src={randomPhoto.user.profile_image.medium}
							/>
						</div>
						<p className="text-white z-10 font-medium text-sm pointer-events-none">
							{randomPhoto.user.name}
						</p>
					</div>
				</Link>
			</div>
		</>
	);
};
