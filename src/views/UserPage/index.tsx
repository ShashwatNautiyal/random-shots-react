import { Sidebar } from "./Sidebar";
import { ProfileFeed } from "./ProfileFeed";

const User = () => {
	return (
		<div className="flex my-8 lg:flex-row flex-col">
			<Sidebar />
			<ProfileFeed />
		</div>
	);
};

export default User;
