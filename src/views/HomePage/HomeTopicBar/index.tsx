import React, { useEffect, useRef, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ROUTES } from "../../../router/webRoutes";

import Image from "../../../common/Image";
import LoadingContainer from "../../../common/LoadingContainer";
import { TopicbarLoading } from "../../../common/LoadingSkeleton";

import { useTopicList } from "../../../utils/api/topics";
import { classNames } from "../../../utils";

const HomeTopicBar = () => {
	const { status, data: topicList } = useTopicList();

	const underlineRef = useRef<HTMLAnchorElement>(null);

	const [underlineWidth, setUnderlineWidth] = useState(0);
	const [underlineOffsetWidth, setUnderlineOffsetWidth] = useState(0);

	let resolved = useResolvedPath(window.location.pathname);
	let paramTopicId = resolved.pathname.split("/")[2];

	useEffect(() => {
		if (underlineRef.current) {
			setUnderlineOffsetWidth(underlineRef.current.offsetLeft);
			setUnderlineWidth(underlineRef.current.offsetWidth);
		} else if (!resolved.pathname.includes("topic")) {
			setUnderlineOffsetWidth(0);
			setUnderlineWidth(0);
		}
	}, [status, resolved.pathname]);

	return (
		<LoadingContainer status={status} loadingLayout={TopicbarLoading}>
			<div className="flex xl:justify-center justify-start md:pt-8 pt-4 md:pb-6 pb-3 overflow-x-scroll no-scrollbar">
				<div className={classNames("relative inline-flex py-1")}>
					{topicList?.map((topic) => (
						<Link
							ref={paramTopicId === topic.id ? underlineRef : null}
							onClick={(e) => {
								// @ts-ignore
								setUnderlineOffsetWidth(e.target.offsetLeft);
								// @ts-ignore
								setUnderlineWidth(e.target.offsetWidth);
							}}
							className={"px-3"}
							key={topic.id}
							to={ROUTES.TOPIC.pathName + `${topic.id}`}
						>
							<span className="flex flex-col text-center text-sm gap-3 flex-shrink-0 pointer-events-none">
								<Image
									src={topic.cover_photo.urls.regular}
									imageCustomStyles={{ borderRadius: "4px" }}
									blurHash={topic.cover_photo.blur_hash}
									loading="lazy"
									urls={topic.cover_photo.urls}
									alt={topic.title}
									className={classNames("object-cover h-14 aspect-video w-auto")}
									objectFit={"cover"}
								/>
								<span
									className={classNames(
										paramTopicId === topic.id
											? "dark:text-white  text-gray-900"
											: "dark:text-gray-300  text-gray-600",
										"whitespace-nowrap transition-all duration-500"
									)}
								>
									{topic.title}
								</span>
							</span>
						</Link>
					))}
					{
						<div
							style={{
								width: `${underlineWidth ? underlineWidth - 20 : 0}px`,
								transform: `translateX(${underlineOffsetWidth + 10}px)`,
							}}
							className="block h-0.5 rounded-sm absolute bottom-0 dark:bg-white  bg-gray-900 transition-all duration-500"
						></div>
					}
				</div>
			</div>
		</LoadingContainer>
	);
};

export default HomeTopicBar;
