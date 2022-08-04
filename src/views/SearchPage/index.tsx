import { useEffect, useState } from "react";
import { FaSadTear } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomError from "../../common/CustomError";
import InfiniteScroll from "../../common/InfiniteScroll";
import { HomeLoadingSkeleton, ProfileLoadingSkeleton } from "../../common/LoadingSkeleton";
import Modal from "../../common/Modal";
import PhotoPreview from "../../common/PhotoPreview";
import { useInfiniteSearch } from "../../utils/api/search";
import { FILTERS } from "../../utils/types/common";
import { ResultPhoto } from "../../utils/types/search";
import { ImageWithLabel } from "../HomePage/HomeFeed/ImageWithLabel";

import { SearchFilters } from "./SearchFilter";
import { SearchTopbar } from "./SearchTopbar";

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [show, setShow] = useState(false);

	const [photo, setPhoto] = useState<ResultPhoto>();

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!query) {
			navigate("/");
		}
	}, []);

	const query = searchParams.get("query") ? (searchParams.get("query") as string) : undefined;

	const order_by = searchParams.get("order_by")
		? (searchParams.get("order_by") as FILTERS["order_by"])
		: "relevant";
	const orientation = searchParams.get("orientation")
		? (searchParams.get("orientation") as FILTERS["orientation"])
		: undefined;
	const content_filter = searchParams.get("content_filter")
		? (searchParams.get("content_filter") as FILTERS["content_filter"])
		: undefined;
	const color = searchParams.get("color")
		? (searchParams.get("color") as FILTERS["color"])
		: undefined;

	const _searchParams = { query, order_by, color, orientation, content_filter };

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
		useInfiniteSearch(query ?? "", undefined, 18, order_by, color, orientation, content_filter);

	const handleFilter = (filterType: string, filterSelected: string) => {
		for (const [key, value] of Object.entries(_searchParams)) {
			if (value === null || value === undefined) {
				delete _searchParams[key as keyof typeof _searchParams];
			}
		}

		if (_searchParams[filterType as keyof typeof _searchParams] === filterSelected) {
			delete _searchParams[filterType as keyof typeof _searchParams];
			// @ts-ignore
			setSearchParams({ ..._searchParams });
			return;
		}

		// @ts-ignore
		setSearchParams({ ..._searchParams, [filterType]: filterSelected });
	};

	if (status === "error") {
		return (
			<CustomError
				errMessage={error.response?.data ? error.response?.data : error.message}
				statusCode={error.response?.status}
			/>
		);
	}

	return (
		<>
			<Modal show={show} setShow={() => setShow(false)}>
				<PhotoPreview photo={photo} />
			</Modal>

			<div className="xl:w-11/12 w-full max-w-[1500px] mx-auto md:pt-10 pt-5 px-4">
				<SearchTopbar
					handleFilter={handleFilter}
					order_by={order_by}
					query={query}
					setMobileFiltersOpen={setMobileFiltersOpen}
					total={(data && data[0].total) ?? undefined}
				/>

				<div className="flex">
					<SearchFilters
						mobileFiltersOpen={mobileFiltersOpen}
						setMobileFiltersOpen={setMobileFiltersOpen}
						handleFilter={handleFilter}
						searchParams={_searchParams}
					/>
					{data && data[0].result.length === 0 ? (
						<div className="flex justify-center flex-col items-center w-full gap-2">
							<FaSadTear className="h-20 w-20 text-red-500" />
							<p className="text-xl font-medium"> Sorry, No results found!</p>
							<p className="text-lg">
								Please check the spelling or try searching for something else
							</p>
						</div>
					) : (
						<div className="flex flex-col w-full">
							<InfiniteScroll
								status={status}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
								loadingLayout={
									<div className="pt-5 lg:pl-5">{ProfileLoadingSkeleton}</div>
								}
							>
								<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:pl-4 gap-5 w-full pt-5">
									{data?.map((item) =>
										item.result.map((resultPhoto, index) => (
											<ImageWithLabel
												className={"h-full w-full aspect-square relative"}
												style={{ cursor: "pointer" }}
												onClick={() => {
													setPhoto(resultPhoto);
													setShow(true);
												}}
												key={resultPhoto.id}
												photo={resultPhoto}
												index={index}
											/>
										))
									)}
								</div>
							</InfiniteScroll>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default SearchPage;
