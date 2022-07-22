import { useParams } from "react-router-dom";
import Topbar from "../../common/Topbar";
import { HomeFeed } from "./HomeFeed";

const Home = () => {
	const { topicId } = useParams();

	return (
		<div>
			<Topbar />
			<HomeFeed topicId={topicId} />
		</div>
	);
};

export default Home;
