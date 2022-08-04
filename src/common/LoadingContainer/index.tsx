import { AxiosError } from "axios";
import React, { ReactNode } from "react";

const LoadingContainer = ({
	children,
	loadingLayout,
	status,
}: {
	children: ReactNode;
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

	return <>{children}</>;
};

export default LoadingContainer;
