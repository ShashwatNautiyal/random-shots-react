import { Link, useParams } from "react-router-dom";
import { useInfiniteRandomPhotos } from "../../utils/api/randomPhotos";
import ImageComponent from "../../common/Image";
import Topbar from "../../common/Topbar";
import InfiniteScroll from "../../common/InfiniteScroll";
import { RandomPhoto } from "../../types/random";
import { classNames } from "../../utils";
import { HomeFeed } from "./HomeFeed";

const Home = () => {
	const { topicId } = useParams();

	return (
		<>
			<Topbar />
			<HomeFeed topicId={topicId} />
		</>
	);
};

export default Home;
