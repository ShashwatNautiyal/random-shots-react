import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps = {
	children: ReactNode;
	loadingLayout?: ReactNode;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	status: "error" | "fetching" | "success";
};

const InfiniteScroll = (props: InfiniteScrollProps) => {
	const { children, loadingLayout, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		props;

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView]);

	return (
		<>
			{status === "success" && <>{children}</>}
			{status === "fetching" && <>{loadingLayout}</>}
			{hasNextPage && <div ref={ref}>{loadingLayout}</div>}
		</>
	);
};

export default InfiniteScroll;
