import { useParams } from "react-router-dom";
import { HomeFeed } from "./HomeFeed";
import HomeTopicBar from "./HomeTopicBar";

const Home = () => {
	const { topicId } = useParams();

	return (
		<>
			<HomeTopicBar />
			<HomeFeed topicId={topicId} />
		</>
	);
};

export default Home;
