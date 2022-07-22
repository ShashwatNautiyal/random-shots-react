import React, { useEffect, useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useTopicList } from "../../utils/api/topics";
import { classNames } from "../../utils";
import Image from "../Image";

const Topbar = () => {
	const { status, data: topicList, error } = useTopicList();

	const ref = useRef<HTMLAnchorElement>(null);

	const [underlineWidth, setUnderlineWidth] = useState(0);
	const [underlineOffsetWidth, setUnderlineOffsetWidth] = useState(0);

	let resolved = useResolvedPath(window.location.pathname);
	let paramTopicId = resolved.pathname.split("/")[2];

	useEffect(() => {
		if (ref.current) {
			console.log(ref.current);
			// @ts-ignore
			setUnderlineOffsetWidth(ref.current.offsetLeft);
			// @ts-ignore
			setUnderlineWidth(ref.current.offsetWidth);
		} else if (!resolved.pathname.includes("topic")) {
			// @ts-ignore
			setUnderlineOffsetWidth(0);
			// @ts-ignore
			setUnderlineWidth(0);
		}
	}, [status, resolved.pathname]);

	if (status === "fetching") {
		return (
			<div className="flex xl:justify-center justify-start my-8 overflow-x-auto no-scrollbar py-1">
				{Array(10)
					.fill(0)
					.map((_, index) => (
						<span
							key={index}
							className="aspect-video mx-3 flex-col h-14 rounded animate-pulse bg-gray-400"
						></span>
					))}
			</div>
		);
	}

	return (
		<div className="flex xl:justify-center justify-start my-8 overflow-x-scroll no-scrollbar">
			<div className={classNames("relative inline-flex py-1")}>
				{topicList?.map((topic) => (
					<Link
						ref={paramTopicId === topic.id ? ref : null}
						onClick={(e) => {
							// @ts-ignore
							setUnderlineOffsetWidth(e.target.offsetLeft);
							// @ts-ignore
							setUnderlineWidth(e.target.offsetWidth);
						}}
						className={"px-3"}
						key={topic.id}
						to={`/topic/${topic.id}`}
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
									paramTopicId === topic.id ? "text-gray-900" : "text-gray-600",
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
						className="block h-0.5 rounded-sm absolute bottom-0 bg-gray-900 transition-all duration-500"
					></div>
				}
			</div>
		</div>
	);
};

export default Topbar;
