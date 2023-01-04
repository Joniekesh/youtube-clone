import { useState, useEffect } from "react";
import styled from "styled-components";
import HomeDetails from "../components/HomeDetails";
import { useSelector } from "react-redux";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
`;

const Home = ({ type }) => {
	const [videos, setVideos] = useState([]);

	const { currentUser } = useSelector((state) => state.user);
	const TOKEN = currentUser?.token;

	useEffect(() => {
		const fetchVideos = async () => {
			const config = {
				headers: {
					Authorization: `Bearer ${TOKEN}`,
				},
			};

			const res = await makeRequest.get(`/videos/${type}`, config);
			setVideos(res.data);
		};
		fetchVideos();
	}, [type]);

	return (
		<Container>
			<HomeDetails videos={videos} />
		</Container>
	);
};

export default Home;
