import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./pages";
import Home from "./pages/home";
import User from "./pages/user";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootPage />}>
					<Route index element={<Home />} />
					<Route path="topic/:topicId" element={<Home />} />
					<Route path="user/:username" element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
	// </React.StrictMode>
);
