import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { FILTERS } from "../../../utils/types/common";
import { Filters } from "./Filters";

export const SearchFilters = ({
	mobileFiltersOpen,
	setMobileFiltersOpen,
	handleFilter,
	searchParams,
}: {
	mobileFiltersOpen: boolean;
	setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
	handleFilter: (filterType: string, filterSelected: string) => void;
	searchParams: Partial<FILTERS & { query: string }>;
}) => {
	return (
		<div>
			{/* Mobile filter dialog */}
			<Transition.Root show={mobileFiltersOpen} as={Fragment}>
				<Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 dark:bg-white bg-black dark:bg-opacity-40 bg-opacity-40 backdrop-blur-md" />
					</Transition.Child>

					<div className="fixed inset-0 flex z-40">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<Dialog.Panel className="ml-auto relative max-w-xs w-full h-full shadow-xl flex flex-col overflow-y-auto">
								<Filters
									setMobileFiltersOpen={setMobileFiltersOpen}
									handleFilter={handleFilter}
									searchParams={searchParams}
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<div className="lg:sticky lg:block hidden lg:top-[70px]">
				<Filters handleFilter={handleFilter} searchParams={searchParams} />
			</div>
		</div>
	);
};
