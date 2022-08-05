import { Link } from "react-router-dom";

import Image from "../Image";
import { LikeButton } from "../LikeButton";

import { downloadPhoto } from "../../utils";
import { RandomPhoto } from "../../utils/types/random";
import { ResultPhoto } from "../../utils/types/search";
import { UserPhoto } from "../../utils/types/userPhoto";

import { ROUTES } from "../../router/webRoutes";

function PhotoPreview({ photo }: { photo: RandomPhoto | UserPhoto | ResultPhoto | undefined }) {
	return (
		<>
			<div className="shadow-2xl rounded-lg relative">
				<Image
					className="block h-full select-none"
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

			<div className="absolute bottom-0 flex sm:flex-row flex-col sm:m-2 m-1 sm:gap-2 gap-1">
				{photo && <LikeButton photo={photo} />}

				<div
					style={{
						background: `${photo?.color}aa`,
					}}
					className="relative backdrop-blur w-fit rounded-md py-2 px-3  items-center md:flex hidden"
				>
					<div className="absolute inset-0 bg-black bg-opacity-10 rounded-md"></div>

					<p className="text-white sm:font-medium font-normal sm:text-base text-sm z-20">
						Photo by{" "}
						<Link
							target={"_blank"}
							className="text-blue-600 underline"
							to={ROUTES.USER.pathName + photo?.user.username}
						>
							@{photo?.user.username}
						</Link>
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
							downloadPhoto(photo?.urls.full, `${photo?.user.name}-${photo?.id}`)
						}
						className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 rounded-md cursor-pointer"
					></div>

					<p className="text-white font-normal z-20 pointer-events-none sm:font-medium  sm:text-base text-sm">
						Download
					</p>
				</div>
			</div>
		</>
	);
}

export default PhotoPreview;
