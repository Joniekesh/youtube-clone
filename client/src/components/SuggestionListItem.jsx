import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import makeRequest from "../utils/makeRequest";

const ListItem = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	width: 250px;
	height: 300px;
	cursor: pointer;
`;

const LeftSug = styled.div``;

const ImageSug = styled.img`
	width: 100%;
	height: 200px;
`;

const RightSug = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 8px;
`;

const TextSug = styled.span`
	font-size: 12px;
	font-weight: 300;
	color: ${({ theme }) => theme.textSoft};
	text-align: left;
	width: 100%;
`;

const NameSug = styled.span`
	font-size: 12px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const Views = styled.span`
	font-size: x-small;
	color: ${({ theme }) => theme.textSoft};
`;

const SuggestionListItem = ({ video }) => {
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
			to={`/video/${video._id}`}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			<ListItem>
				<LeftSug>
					<ImageSug src={video?.imgUrl} alt="" />
				</LeftSug>
				<RightSug>
					{video.title.length < 30 ? (
						<TextSug>{video?.title}</TextSug>
					) : (
						<TextSug>{video?.title.slice(0, 30)}...</TextSug>
					)}
					<NameSug>{user.name}</NameSug>
					<Views>
						{video?.views} views {format(video.createdAt)}
					</Views>
				</RightSug>
			</ListItem>
		</Link>
	);
};

export default SuggestionListItem;
