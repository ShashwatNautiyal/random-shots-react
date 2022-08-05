import { useEffect, useState } from "react";
import { FaSadTear } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

import CustomError from "../../common/CustomError";
import InfiniteScroll from "../../common/InfiniteScroll";
import { ProfileLoading } from "../../common/LoadingSkeleton";
import Modal from "../../common/Modal";
import { ImageWithLabel } from "../../common/ImageWithLabel";
import PhotoPreview from "../../common/PhotoPreview";

import { useInfiniteSearch } from "../../utils/api/search";
import { ResultPhoto } from "../../utils/types/search";
import { FilterOptions } from "../../utils/types/common";

import { SearchTopbar } from "./SearchTopbar";
import { SearchFilter } from "./SearchFilter";

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [show, setShow] = useState(false);
	const [photo, setPhoto] = useState<ResultPhoto>();
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// Navigate to previous page if query is empty
		if (_searchParams.query === "") {
			navigate(-1);
		}
	}, []);

	const getSearchParamsFromUrl = () => {
		const query = searchParams.get("query") ? (searchParams.get("query") as string) : undefined;
		const order_by = searchParams.get("order_by")
			? (searchParams.get("order_by") as FilterOptions["order_by"])
			: "relevant";
		const orientation = searchParams.get("orientation")
			? (searchParams.get("orientation") as FilterOptions["orientation"])
			: undefined;
		const content_filter = searchParams.get("content_filter")
			? (searchParams.get("content_filter") as FilterOptions["content_filter"])
			: undefined;
		const color = searchParams.get("color")
			? (searchParams.get("color") as FilterOptions["color"])
			: undefined;

		return { query, order_by, color, orientation, content_filter };
	};

	const _searchParams = getSearchParamsFromUrl();
	const { color, content_filter, order_by, orientation, query } = _searchParams;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } =
		useInfiniteSearch(query ?? "", undefined, 18, order_by, color, orientation, content_filter);

	const handleFilter = (filterType: string, filterSelected: string) => {
		// Delete undefined or null objects from _searchParams
		for (const [key, value] of Object.entries(_searchParams)) {
			if (value === null || value === undefined) {
				delete _searchParams[key as keyof typeof _searchParams];
			}
		}

		// Deselect selected filter
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
					<SearchFilter
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
								loadingLayout={<div className="pt-5 lg:pl-5">{ProfileLoading}</div>}
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
