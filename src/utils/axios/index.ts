import axios from "axios";

export const privateAxios = axios.create({
	baseURL: "https://api.unsplash.com",
	headers: {
		Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID ?? ""}`,
	},
});
