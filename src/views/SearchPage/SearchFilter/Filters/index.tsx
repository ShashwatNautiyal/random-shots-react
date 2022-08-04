import { RadioGroup } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsSquareFill } from "react-icons/bs";
import { IoCloseCircle, IoTabletLandscape, IoTabletPortrait } from "react-icons/io5";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { classNames } from "../../../../utils";
import { FILTERS } from "../../../../utils/types/common";
import { FilterOptionsType } from "../../SearchTopbar";

type FilterType = {
	id: string;
	name: string;
	options: FilterOptionsType<FILTERS[Exclude<keyof FILTERS, "order_by">]>;
}[];

const filterOptions: FilterType = [
	{
		id: "color",
		name: "Color",
		options: [
			{ value: "black", label: "Black", Icon: BsSquareFill },
			{ value: "black_and_white", label: "Black and White", Icon: AiFillCaretUp },
			{ value: "green", label: "Green", Icon: BsSquareFill },
			{ value: "magenta", label: "Magenta", Icon: BsSquareFill },
			{ value: "orange", label: "Orange", Icon: BsSquareFill },
			{ value: "purple", label: "Purple", Icon: BsSquareFill },
			{ value: "red", label: "Red", Icon: BsSquareFill },
			{ value: "teal", label: "Teal", Icon: BsSquareFill },
			{ value: "white", label: "White", Icon: BsSquareFill },
		],
	},
	{
		id: "orientation",
		name: "Orientation",
		options: [
			{ value: "portrait", label: "Portrait", Icon: IoTabletPortrait },
			{ value: "landscape", label: "Landscape", Icon: IoTabletLandscape },
			{ value: "squarish", label: "Squarish", Icon: BsSquareFill },
		],
	},
	{
		id: "content_filter",
		name: "Content Safety",
		options: [
			{ value: "low", label: "Low", Icon: BsFillArrowDownCircleFill },
			{ value: "high", label: "High", Icon: BsFillArrowUpCircleFill },
		],
	},
];

export const Filters = ({
	handleFilter,
	searchParams,
	setMobileFiltersOpen,
}: {
	handleFilter: (filterType: string, filterSelected: string) => void;
	searchParams: Partial<FILTERS & { query: string }>;
	setMobileFiltersOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
	const [_, setSearchParams] = useSearchParams();

	const _searchParams = { ...searchParams };
	delete _searchParams["query"];

	const showResetFilters = Object.values(_searchParams).filter(Boolean).length;

	return (
		<form className="xl:w-[250px] lg:w-[220px] w-full border-r lg:pr-4 px-4 lg:h-[92vh] dark:bg-black bg-white dark:text-white text-black transition-all duration-500 h-screen">
			<div className="flex items-center justify-between border-b py-5 pr-2">
				<h2 className="font-semibold">Filters</h2>
				<div className="flex gap-2">
					{!!showResetFilters && (
						<button
							onClick={(e) => {
								e.preventDefault();
								setSearchParams({ query: searchParams.query ?? "" });
							}}
							className=" text-sm rounded-md flex items-center justify-center dark:text-gray-300 text-gray-500"
						>
							Reset Filters
						</button>
					)}
					{setMobileFiltersOpen && (
						<button
							type="button"
							className="-mr-2 w-10 h-10 p-2 rounded-md flex items-center justify-center text-gray-400"
							onClick={() => setMobileFiltersOpen(false)}
						>
							<IoCloseCircle className="h-8 w-8" />
						</button>
					)}
				</div>
			</div>
			{filterOptions.map((filter) => (
				<div key={filter.id}>
					<h3 className="font-semibold pt-6 pb-3">{filter.name}</h3>
					<div className="font-medium flex flex-col gap-2">
						{filter.options.map((option, optionIdx) => (
							<RadioGroup
								key={option.value}
								onClick={() => handleFilter(filter.id, option.value)}
								value={
									searchParams &&
									searchParams[filter.id as keyof typeof searchParams]
								}
								onChange={() => {}}
							>
								<RadioGroup.Option value={option.value}>
									{({ checked }) => (
										<div className="flex items-center cursor-pointer">
											{checked ? (
												<MdCheckBox className="flex-shrink-0 h-6 w-6 mr-2" />
											) : (
												<MdOutlineCheckBoxOutlineBlank className="flex-shrink-0 h-6 w-6 mr-2" />
											)}
											<label
												htmlFor={option.value}
												className={classNames(
													"text-base flex items-center gap-2 cursor-pointer"
												)}
											>
												<span>
													{option.Icon ? (
														option.value === "black_and_white" ? (
															<>
																<div className="h-2 w-4 bg-gray-800 rounded-t-sm"></div>
																<div className="h-2 w-4 bg-gray-200 rounded-b-sm"></div>
															</>
														) : (
															<option.Icon
																className="h-4 w-4 rounded-sm"
																color={
																	option.value === "white"
																		? "#f0f0f0"
																		: option.value === "black"
																		? "#1f1f1f"
																		: option.label
																}
															/>
														)
													) : null}
												</span>
												<span>{option.label}</span>
											</label>
										</div>
									)}
								</RadioGroup.Option>
							</RadioGroup>
						))}
					</div>
				</div>
			))}
		</form>
	);
};
