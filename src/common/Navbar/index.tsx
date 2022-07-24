import { BiHeart, BiHome, BiSearch } from "react-icons/bi";
import { CgAbstract, CgYoutube } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { TbSend } from "react-icons/tb";
import { RiMovieLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/webRoutes";

const Navbar = () => {
	return (
		<div className="px-2 max-w-[1400px] mx-auto flex justify-between py-6">
			<Link to={ROUTES.HOME}>
				<p className="flex gap-3 items-center">
					<CgAbstract className="h-8 w-8" />
					<span className="font-satisfy text-3xl">Growwgram</span>
				</p>
			</Link>
			<div className="lg:flex gap-6 items-center hidden">
				<BiHome className="h-7 w-8" />
				<RiMovieLine className="h-7 w-8" />
				<input
					type={"search"}
					className="bg-gray-200/50 focus:outline-none px-3 py-2 rounded-md placeholder:text-center placeholder:text-gray-400 w-72"
					placeholder="Search"
				/>
				<BiSearch className="h-7 w-8" />
				<BiHeart className="h-7 w-8" />
			</div>
			<div className="flex gap-5 items-center">
				<TbSend className="h-7 w-7" />
				<img
					className="h-7 w-7 rounded-full object-cover"
					src="https://www.financialexpress.com/wp-content/uploads/2021/09/MyGlamm-With-Shraddha-Kapoor.jpeg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default Navbar;
