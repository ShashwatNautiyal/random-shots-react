import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const RootPage = () => {
	return (
		<div className="dark:bg-black bg-white dark:text-white text-black transition-all duration-500 min-h-screen">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default RootPage;
