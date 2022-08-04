import { Link } from "react-router-dom";
import Image from "../../../../common/Image";
import { RandomPhoto } from "../../../../utils/types/random";
import { classNames } from "../../../../utils";
import { ROUTES } from "../../../../router/webRoutes";
import { ResultPhoto } from "../../../../utils/types/search";
import { LikeButton } from "../../../../common/LikeButton";

export const ImageWithLabel = ({
	photo,
	index,
	onClick,
	className,
	...rest
}: {
	photo: RandomPhoto | ResultPhoto;
	index: number;
	onClick: () => void;
} & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...rest} className={className}>
			<Image
				onClick={onClick}
				className="block h-full select-none"
				src={photo.urls.regular}
				blurHash={photo.blur_hash}
				loading="lazy"
				alt={photo.description}
				objectFit={"cover"}
				urls={photo.urls}
			/>

			<Link to={ROUTES.USER.pathName + `${photo.user.username}`}>
				<div
					style={{
						background: `${photo.color}aa`,
					}}
					className="absolute backdrop-blur w-fit rounded-md m-2 py-2 px-3 bottom-0 flex items-center gap-2"
				>
					<div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-40 transition-all rounded-md"></div>
					<div className="h-10 w-10 pointer-events-none">
						<Image
							imageCustomStyles={{ borderRadius: "9999px" }}
							loading="lazy"
							alt={photo.user.name}
							objectFit="cover"
							urls={photo.user.profile_image}
							src={photo.user.profile_image.medium}
						/>
					</div>
					<p className="text-white z-10 font-medium text-sm pointer-events-none">
						{photo.user.name}
					</p>
				</div>
			</Link>
		</div>
	);
};
