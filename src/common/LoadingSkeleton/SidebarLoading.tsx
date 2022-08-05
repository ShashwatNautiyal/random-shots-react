import PrimaryButton from "../PrimaryButton";

const SidebarLoading = (
	<div className="flex flex-col xl:w-[400px] lg:w-[300px] w-full flex-shrink-0 px-6 lg:h-screen lg:sticky lg:top-10 animate-pulse">
		<div className="flex justify-center">
			<div className="h-[70px] w-[70px] bg-gray-400 rounded-full"></div>
		</div>

		<div className="flex justify-around my-6">
			<div className="flex flex-col text-center w-10 bg-gray-400 h-10 rounded-md"></div>

			<div className="flex flex-col text-center w-10 bg-gray-400 h-10 rounded-md"></div>

			<div className="flex flex-col text-center w-10 bg-gray-400 h-10 rounded-md"></div>
		</div>
		<PrimaryButton text="EMPTY" bgColor="bg-gray-400 text-transparent" />

		<div className="mt-8 w-full flex flex-col">
			<div className="bg-gray-400 font-semibold h-4 w-1/3 rounded-md"></div>

			<div className="bg-gray-400 my-3 h-10 w-11/12 rounded-md"></div>
			<div className="bg-gray-400 h-4 w-1/2 rounded-md"></div>
		</div>

		<div className="lg:grid lg:grid-cols-3 lg:gap-5 flex gap-10 overflow-scroll py-8 no-scrollbar">
			{Array(9)
				.fill(0)
				.map((_, index) => {
					return (
						<div
							key={index}
							className="h-[70px] w-[70px] mx-auto bg-gray-400 rounded-full flex-shrink-0"
						></div>
					);
				})}
		</div>
	</div>
);

export default SidebarLoading;
