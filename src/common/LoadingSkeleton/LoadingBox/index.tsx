import { classNames } from "../../../utils";

export const LoadingBox = ({
	boxes,
	className,
	showBig = true,
}: {
	boxes: number;
	className: string;
	showBig?: boolean;
}) => {
	return (
		<>
			{Array(boxes)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className={classNames(
							showBig && index === 0 ? "col-span-2 row-span-2" : "col-span-1",
							"min-h-full min-w-full aspect-square relative bg-gray-400 animate-pulse",
							className
						)}
					></div>
				))}
		</>
	);
};
