import styled from "styled-components";
import VideoCard from "./VideoCard";

const Container = styled.div`
	height: calc(100vh - 70px);
`;

const VideoList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
`;

const HomeDetails = ({ videos }) => {
	return (
		<Container>
			<VideoList>
				{videos?.map((video) => (
					<VideoCard video={video} key={video._id} />
				))}
			</VideoList>
		</Container>
	);
};

export default HomeDetails;
