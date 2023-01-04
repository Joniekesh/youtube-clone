import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import makeRequest from "../utils/makeRequest";

const ListItem = styled.div`
	display: flex;
	gap: 10px;
	width: 300px;
	height: 100px;
	cursor: pointer;
`;

const Left = styled.div`
	flex: 2;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 8px;
`;

const Text = styled.span`
	font-size: 12px;
	font-weight: 300;
	color: ${({ theme }) => theme.text};
	text-align: left;
	width: 100%;
`;

const Name = styled.span`
	font-size: 12px;
	font-weight: 500;
`;

const Views = styled.span`
	font-size: x-small;
`;

const RightMenuItem = ({ video }) => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			const res = await makeRequest.get(`/users/find/${video.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [video.userId]);

	return (
		<Link
			to={`/video/${video._id} `}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			<ListItem>
				<Left>
					<Image src={video?.imgUrl} alt="" />
				</Left>
				<Right>
					{video.title.length < 30 ? (
						<Text>{video?.title}</Text>
					) : (
						<Text>{video?.title.slice(0, 30)}...</Text>
					)}
					<Name>{user.name}</Name>
					<Views>
						{video?.views} views {format(video.createdAt)}
					</Views>
				</Right>
			</ListItem>
		</Link>
	);
};

export default RightMenuItem;
