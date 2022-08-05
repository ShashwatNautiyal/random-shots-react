import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { RouterRoutes } from "./router";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterRoutes />
	</Provider>
	// </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
