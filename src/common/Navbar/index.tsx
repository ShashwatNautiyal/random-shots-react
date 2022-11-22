import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BiHome, BiSearch } from "react-icons/bi";
import { CgAbstract } from "react-icons/cg";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { classNames } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reducer";

import { ROUTES } from "../../router/webRoutes";
import { setMode } from "../../store/reducers/theme";

const Navbar = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const themeMode = useAppSelector((state) => state.theme.mode);

	if (themeMode === "dark") document.documentElement.classList.add("dark");
	else if (themeMode === "light") document.documentElement.classList.remove("dark");

	const [searchParams] = useSearchParams();
	const [searchInput, setSearchInput] = useState(searchParams.get("query") ?? "");
	const [showNavBg, setShowNavBg] = useState(false);

	useEffect(() => {
		const handleNavbarEffect = () => {
			if (window.scrollY > 30) {
				setShowNavBg(true);
			} else {
				setShowNavBg(false);
			}
		};

		window.addEventListener("scroll", handleNavbarEffect);

		return () => {
			window.removeEventListener("scroll", handleNavbarEffect);
		};
	}, []);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate("/search?query=" + searchInput);
	};

	return (
		<div
			className={classNames(
				showNavBg
					? "dark:backdrop-brightness-50 dark:bg-transparent dark:bg-opacity-100 bg-gray-300 bg-opacity-75 shadow-lg"
					: "dark:backdrop-brightness-100 dark:bg-opacity-100",
				"sticky top-0 z-30 backdrop-blur-md transition-[background] duration-500 px-4 md:py-5 py-3"
			)}
		>
			<div className={classNames("")}>
				<div className={classNames("max-w-[1400px]   mx-auto flex justify-between ")}>
					<Link to={ROUTES.HOME.pathName}>
						<p className="flex md:gap-3 gap-1 items-center">
							<CgAbstract className="md:h-8 md:w-8 h-6 w-6" />
							<span className="font-satisfy text-3xl">Random Shots</span>
						</p>
					</Link>
					<form onSubmit={handleSearch} className="flex gap-6 items-center">
						<Link to={ROUTES.HOME.pathName}>
							<BiHome className="h-7 w-7 cursor-pointer md:block hidden" />
						</Link>
						<input
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							type={"search"}
							name="search"
							className={classNames(
								"bg-gray-200/80",
								"focus:outline-none md:block hidden px-3 py-2 rounded-md placeholder:text-center dark:placeholder:text-gray-200 placeholder:text-gray-400 w-72"
							)}
							placeholder="Search"
						/>
						<button disabled={!searchInput} type="submit">
							<BiSearch className="h-7 w-7 md:block hidden" />
						</button>
					</form>
					<div className="flex gap-5 items-center">
						{themeMode === "dark" ? (
							<MdOutlineDarkMode
								className="h-7 w-7 cursor-pointer"
								onClick={() => dispatch(setMode("light"))}
							/>
						) : (
							<MdOutlineLightMode
								className="h-7 w-7 cursor-pointer"
								onClick={() => dispatch(setMode("dark"))}
							/>
						)}
						<img
							className="h-7 w-7 rounded-full object-cover"
							src="https://www.financialexpress.com/wp-content/uploads/2021/09/MyGlamm-With-Shraddha-Kapoor.jpeg"
							alt=""
						/>
					</div>
				</div>
			</div>
			<form onSubmit={handleSearch} className="flex mt-2 gap-2">
				<input
					value={searchInput}
					name="search"
					onChange={(e) => setSearchInput(e.target.value)}
					type={"search"}
					className={classNames(
						"bg-gray-200/80",
						"focus:outline-none md:hidden block  px-2 py-1 rounded-md dark:placeholder:text-gray-200 placeholder:text-gray-400 w-full"
					)}
					placeholder="Search"
				/>
				<button disabled={!searchInput} type="submit">
					<BiSearch className="md:h-7 md:w-7 h-6 w-6 md:hidden block " />
				</button>
			</form>
		</div>
	);
};

export default Navbar;
