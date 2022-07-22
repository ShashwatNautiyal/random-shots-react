import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { Routes } from "react-router-dom";
import { RouterRoutes } from "./router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterRoutes />
	</Provider>
	// </React.StrictMode>
);
