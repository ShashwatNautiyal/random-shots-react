import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import RootPage from "../views";
import Home from "../views/HomePage/HomePage";
import User from "../views/UserPage";

export const RouterRoutes = () => {
	return (
		<BrowserRouter>
			<ResetPageScroll />
			<Routes>
				<Route path="/" element={<RootPage />}>
					<Route index element={<Home />} />
					<Route path="topic/:topicId" element={<Home />} />
					<Route path="user/:username" element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

const ResetPageScroll = () => {
	let location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location]);

	return null;
};
