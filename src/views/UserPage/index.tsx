import { Sidebar } from "./Sidebar";
import { ProfileFeed } from "./ProfileFeed";
import { useUserProfile } from "../../utils/api/user";
import { useParams } from "react-router-dom";
import CustomError from "../../common/CustomError";

const UserPage = () => {
	const { username } = useParams();

	const { data, status, error } = useUserProfile(username);

	const errMessage =
		typeof error?.response?.data === "object"
			? error.response?.data.errors && error.response?.data.errors[0]
			: error?.response?.data;

	if (status === "error") {
		return (
			<CustomError
				errMessage={errMessage ?? error.message}
				statusCode={error.response?.status}
			/>
		);
	}

	return (
		<div className="flex py-8 lg:flex-row flex-col">
			<Sidebar data={data} status={status} />
			<ProfileFeed />
		</div>
	);
};

export default UserPage;
