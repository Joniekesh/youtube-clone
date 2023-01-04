import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 260px;
	height: 300px;
	font-size: 14px;
	cursor: pointer;
	margin-bottom: -30px;
`;

const Top = styled.div`
	margin-bottom: 8px;
`;

const VideoImg = styled.img`
	width: 100%;
	height: 150px;
`;

const Bottom = styled.div`
	display: flex;
`;

const VideoDesc = styled.div`
	display: flex;
	flex-direction: column;
`;

const ChannelImg = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 5px;
`;

const ChannelText = styled.span`
	font-weight: 500;
	font-size: small;
	color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
	margin: 10px 0;
	font-weight: 500;
	color: ${({ theme }) => theme.textSoft};
`;

const Views = styled.span`
	font-size: x-small;
	color: ${({ theme }) => theme.textSoft};
`;

const VideoCard = ({ video }) => {
	const [channel, setChannel] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchChannel = async () => {
			const res = await makeRequest.get(`/users/find/${video.userId}`);
			setChannel(res.data);
		};
		fetchChannel();
	}, [video.userId]);

	const handleNavigate = async () => {
		try {
			const res = await makeRequest.put(`/videos/views/${video._id}`);

			res.status === 200 && navigate(`/video/${video._id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<div onClick={handleNavigate}>
				<Top>
					<VideoImg src={video.imgUrl} alt="" />
				</Top>
				<Bottom>
					<ChannelImg src={channel?.img} alt="" />
					<VideoDesc>
						{video.title.length < 70 ? (
							<ChannelText>{video.title}</ChannelText>
						) : (
							<ChannelText>{video.title.slice(0, 80)}...</ChannelText>
						)}
						<ChannelName>{channel.name}</ChannelName>
						<Views>
							{video.views} view{video.views > 1 ? "s" : ""} {""}
							{format(video.createdAt)}
						</Views>
					</VideoDesc>
				</Bottom>
			</div>
		</Container>
	);
};

export default VideoCard;
