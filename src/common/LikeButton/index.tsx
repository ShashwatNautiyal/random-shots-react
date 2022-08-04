import { CSSProperties, useRef, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { classNames } from "../../utils";

export const LikeButton = ({
	photo,
	style,
}: {
	photo: {
		color: string;
		likes: number;
	};
	style?: CSSProperties;
}) => {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<div
			onClick={() => {
				setIsLiked((prev) => !prev);
			}}
			style={{
				...style,
				background: `${photo.color}aa`,
			}}
			className="backdrop-blur h-fit rounded-md py-2 px-3 gap-2 flex items-center cursor-pointer z-10 w-fit"
		>
			<div className="absolute inset-0 bg-black bg-opacity-10 rounded-md"></div>
			<BsSuitHeartFill
				className={classNames(
					isLiked ? "text-red-500 scale-100" : "text-red-500 scale-0",
					"h-7 w-7 transition-transform duration-500 z-10 "
				)}
			/>
			<BsSuitHeart
				className={classNames("h-6 w-6 transition-all absolute left-[14px] text-white")}
			/>
			<p className="text-white z-10 select-none">{isLiked ? photo.likes + 1 : photo.likes}</p>
		</div>
	);
};
