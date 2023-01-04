import { useEffect, useState } from "react";
import styled from "styled-components";
import RightMenuItem from "./RightMenuItem";
import { responsive965 } from "../responsive";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	flex: 1.5;
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.text};
	min-width: 300px;
	gap: 20px;
	margin-left: 10px;
	${responsive965({
		display: "none",
	})}
`;

const RightMenu = ({ tags }) => {
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
				<RightMenuItem video={video} key={video._id} />
			))}
		</Container>
	);
};

export default RightMenu;
