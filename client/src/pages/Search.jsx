import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";

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
			const res = await axios.get(`/videos/search${query}`);
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
