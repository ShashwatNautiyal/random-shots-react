import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";

import { classNames } from "../../../utils";
import { FilterOptions, FilterOptionsType } from "../../../utils/types/common";

const sortOptions: FilterOptionsType<FilterOptions["order_by"]> = [
	{ value: "relevant", label: "Relevant" },
	{ value: "latest", label: "Lastest" },
];

type SearchTopbarProps = {
	total?: number;
	query?: string;
	order_by?: "latest" | "relevant";
	handleFilter: (filterType: string, filterSelected: string) => void;
	setMobileFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchTopbar = (props: SearchTopbarProps) => {
	const { total, query, order_by, handleFilter, setMobileFiltersOpen } = props;

	return (
		<div className="relative flex items-baseline flex-wrap justify-between border-b border-gray-200 md:pb-5 ">
			<h1 className="md:text-2xl text-lg font-semibold tracking-tight whitespace-nowrap overflow-clip text-ellipsis max-w-lg">
				{total ?? 0} Results
				<span className="md:inline hidden"> for {query}</span>
			</h1>

			<div className="flex items-center">
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="group inline-flex justify-center items-center text-sm font-medium">
							Sort by:
							<span className="text-sm font-semibold w-20 capitalize">
								{order_by ?? "relevant"}
							</span>
							<BsChevronDown
								className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
							<div className="py-1">
								{sortOptions.map((option) => (
									<Menu.Item key={option.value}>
										{({ active }) => (
											<button
												onClick={() =>
													handleFilter("order_by", option.value)
												}
												className={classNames(
													option.value === order_by
														? "font-medium text-gray-900"
														: "text-gray-500",
													active ? "bg-gray-100" : "",
													"block w-full text-left px-4 py-2 text-sm capitalize"
												)}
											>
												{option.label}
											</button>
										)}
									</Menu.Item>
								))}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>

				<button
					type="button"
					className="p-2 text-gray-400 hover:text-gray-500 lg:hidden ml-2"
					onClick={() => setMobileFiltersOpen(true)}
				>
					<FaFilter className="w-5 h-5" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
};
