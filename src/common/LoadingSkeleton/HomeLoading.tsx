import { LoadingBox } from "./LoadingBox";

const HomeLoading = (
	<>
		<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 lg:grid-cols-4 gap-5 w-full pt-5">
			<LoadingBox boxes={5} className="lg:block hidden" />
			<LoadingBox boxes={3} className="lg:hidden md:block hidden" />
			<LoadingBox boxes={4} showBig={false} className="md:hidden sm:block hidden" />
			<LoadingBox boxes={1} className="sm:hidden block" />
		</div>
		<div className="p-2">
			<div
				style={{ borderTopColor: "transparent" }}
				className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
			></div>
		</div>
	</>
);

export default HomeLoading;
