import { AxiosError } from "axios";
import React, { ReactNode } from "react";

const LoadingLayout = ({
	children,
	loadingLayout,
	status,
}: {
	children: ({ isError }: { isError: boolean }) => ReactNode;
	loadingLayout?: ReactNode;
	status: "error" | "fetching" | "success";
}) => {
	if (status === "fetching") {
		if (loadingLayout) {
			return <>{loadingLayout}</>;
		}
		return (
			<div
				style={{ borderTopColor: "transparent" }}
				className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
			></div>
		);
	}

	return <>{children({ isError: status === "error" })}</>;
};

export default LoadingLayout;
