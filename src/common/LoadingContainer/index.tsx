import { ReactNode } from "react";

type LoadingContainerProps = {
	children: ReactNode;
	loadingLayout?: ReactNode;
	status: "error" | "fetching" | "success";
};

const LoadingContainer = (props: LoadingContainerProps) => {
	const { children, loadingLayout, status } = props;

	if (status === "fetching") {
		return loadingLayout ? (
			<>{loadingLayout}</>
		) : (
			<div
				style={{ borderTopColor: "transparent" }}
				className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
			></div>
		);
	}

	return <>{children}</>;
};

export default LoadingContainer;
