import { Link, useLocation } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

import PrimaryButton from "../PrimaryButton";

import { ROUTES } from "../../router/webRoutes";

import networkError from "./assets/networkError.json";
import notFoundError from "./assets/notFoundError.json";

type CustomErrorProps = { statusCode?: number; errMessage: string };

const CustomError = (props: CustomErrorProps) => {
	const { statusCode, errMessage } = props;

	const location = useLocation();

	const isOffline = statusCode === 0;
	const errCode = !isOffline ? statusCode : undefined;
	const lottieSrc = isOffline ? networkError : notFoundError;

	return (
		<div className="flex md:flex-row flex-col-reverse w-full md:justify-around justify-center gap-8 items-center h-[90vh] max-w-7xl mx-auto">
			<div className="flex flex-col gap-2 md:items-start items-center">
				<p className="text-lg">{errCode && `${errCode} Error`} </p>
				<p className="text-3xl font-semibold">{errMessage}</p>
				{isOffline && (
					<PrimaryButton text={"Reload page"} onClick={() => window.location.reload()} />
				)}
				{!isOffline && location.pathname !== "/" && (
					<Link to={ROUTES.HOME.pathName} className="pt-2">
						<PrimaryButton text={"Back to Homepage"} />
					</Link>
				)}
			</div>
			<Player
				autoplay
				loop
				src={lottieSrc}
				style={{ height: "300px", width: "300px" }}
			></Player>
		</div>
	);
};

export default CustomError;
