import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = ({
	children,
	loadingLayout,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	status,
}: {
	children: ReactNode;
	loadingLayout?: ReactNode;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	status: "error" | "fetching" | "success";
}) => {
	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	console.log(inView, hasNextPage, isFetchingNextPage);

	return (
		<>
			{children}
			{status === "fetching" && <>{loadingLayout}</>}
			{hasNextPage && <div ref={ref}>{loadingLayout}</div>}
		</>
	);
};

export default InfiniteScroll;
