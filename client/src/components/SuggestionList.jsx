import styled from "styled-components";
import { useState, useEffect } from "react";
import SuggestionListItem from "./SuggestionListItem";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	width: 100%;
`;

const SuggestionList = ({ tags }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetctVideos = async () => {
			const res = await makeRequest.get(`/videos/tags?tags=${tags}`);
			setVideos(res.data);
		};
		fetctVideos();
	}, [tags]);

	return (
		<Container>
			{videos.map((video) => (
				<SuggestionListItem video={video} key={video._id} />
			))}
		</Container>
	);
};

export default SuggestionList;
