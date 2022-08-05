import { Outlet } from "react-router-dom";

import Navbar from "../common/Navbar";

import "./rootPage.css";

const RootPage = () => {
	return (
		<div className="rp001Container">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default RootPage;
