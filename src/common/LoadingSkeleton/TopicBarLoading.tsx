const TopicbarLoading = (
	<div className="flex xl:justify-center justify-start mt-8 overflow-x-auto no-scrollbar py-1">
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

export default TopicbarLoading;
