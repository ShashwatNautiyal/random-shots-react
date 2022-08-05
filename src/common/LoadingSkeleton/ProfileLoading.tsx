import { LoadingBox } from "./LoadingBox";

const ProfileLoading = (
	<>
		<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
			<LoadingBox boxes={6} showBig={false} className="md:block hidden " />
			<LoadingBox boxes={4} showBig={false} className="md:hidden sm:block hidden" />
			<LoadingBox boxes={1} showBig={false} className="sm:hidden block" />
		</div>
		<div className="p-2">
			<div
				style={{ borderTopColor: "transparent" }}
				className="w-16 h-16 border-4 border-gray-400 border-solid rounded-full animate-spin mx-auto mt-5"
			></div>
		</div>
	</>
);

export default ProfileLoading;
