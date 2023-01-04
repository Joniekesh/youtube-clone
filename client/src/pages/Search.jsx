import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const Search = () => {
	const query = useLocation().search;
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await makeRequest.get(`/videos/search${query}`);
			setVideos(res.data);
		};
		fetchVideos();
	}, [query]);

	return (
		<Container>
			{videos.map((video) => (
				<VideoCard video={video} key={video._id} />
			))}
		</Container>
	);
};

export default Search;
