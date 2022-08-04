import { AxiosError } from "axios";
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

	return (
		<>
			{status === "success" && <>{children}</>}
			{status === "fetching" && <>{loadingLayout}</>}
			{hasNextPage && <div ref={ref}>{loadingLayout}</div>}
		</>
	);
};

export default InfiniteScroll;
