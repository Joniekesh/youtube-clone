import styled from "styled-components";
import { useState, useEffect } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteComment,
	dislikeComment,
	likeComment,
} from "../redux/videoRedux";
import { getVideo } from "../redux/videoApi";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	padding: 10px;
	border-bottom: 0.5px solid #ddd;
`;

const AvatarWrapper = styled.div`
	flex: 1;
`;

const Right = styled.div`
	flex: 12;
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;
`;

const Image = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 10px;
`;

const Top = styled.div`
	display: flex;
	flex-direction: column;
`;

const Details = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 100px;
	margin-bottom: 14px;
`;

const Time = styled.div`
	font-size: 11px;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const Name = styled.p`
	color: ${({ theme }) => theme.text};
	font-weight: 500;
	font-size: 12px;
`;

const Desc = styled.span`
	color: ${({ theme }) => theme.text};
	font-size: 12px;
	text-align: justify;
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Items = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const OverflowMenu = styled.div`
	color: ${({ theme }) => theme.text};
	cursor: pointer;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
`;

const Count = styled.span`
	font-size: 12px;
`;

const DeleteModal = styled.div`
	-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	padding: 10px;
	width: 100px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	position: absolute;
	right: 0px;
	top: 80px;
	z-index: 5;
	font-size: 12px;
`;

const Delete = styled.span`
	cursor: pointer;
`;

const Cancel = styled.span`
	cursor: pointer;
`;

const Comment = ({ comment, videoId }) => {
	const [user, setUser] = useState({});
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { currentUser } = useSelector((state) => state.user);
	const TOKEN = currentUser?.token;

	const isLiked = comment.likes?.some(
		(like) => like._id === currentUser?.user._id
	);

	const isDisliked = comment.dislikes?.some(
		(dislike) => dislike._id === currentUser?.user._id
	);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await makeRequest.get(`/users/find/${comment.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [comment?.userId]);

	const addRemoveLike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		try {
			await makeRequest.put(
				`/videos/comments/addRemoveLikes/${videoId}/${comment._id}`,
				{ userId: currentUser?.user._id },
				config
			);
			dispatch(
				likeComment({
					payload: {
						currentUserId: currentUser?.user._id,
						commentId: comment._id,
					},
				})
			);
			dispatch(getVideo(videoId));
		} catch (error) {
			console.log(error);
		}
	};

	const addRemoveDislike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		try {
			await makeRequest.put(
				`/videos/comments/addRemoveDislikes/${videoId}/${comment._id}`,
				{ userId: currentUser?.user._id },
				config
			);
			dispatch(
				dislikeComment({
					payload: {
						currentUserId: currentUser?.user._id,
						commentId: comment._id,
					},
				})
			);

			dispatch(getVideo(videoId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			await makeRequest.delete(
				`/videos/comments/${videoId}/${comment._id}`,
				config
			);
			dispatch(deleteComment(comment._id));
			dispatch(getVideo(videoId));
			setOpen(false);
			navigate(`/video/${videoId}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<AvatarWrapper>
				<Image src={user.img} alt="" />
			</AvatarWrapper>
			<Right>
				<Top>
					<Details>
						<Name>{user.name}</Name>
						<Time>{format(comment.date)}</Time>
					</Details>
					<Desc>{comment.text}</Desc>
				</Top>
				<Bottom>
					<Items>
						<Item onClick={addRemoveLike}>
							{isLiked ? (
								<ThumbUpOutlinedIcon
									style={{ fontSize: "14px", color: "teal" }}
								/>
							) : (
								<ThumbUpOutlinedIcon style={{ fontSize: "14px" }} />
							)}
							<Count>{comment?.likes?.length}</Count>
						</Item>

						<Item onClick={addRemoveDislike}>
							{isDisliked ? (
								<ThumbDownOutlinedIcon
									style={{ fontSize: "14px", color: "teal" }}
								/>
							) : (
								<ThumbDownOutlinedIcon style={{ fontSize: "14px" }} />
							)}
						</Item>
					</Items>
					{currentUser?.user._id === comment.userId && (
						<OverflowMenu>
							<MoreVertIcon onClick={() => setOpen(!open)} />
						</OverflowMenu>
					)}
				</Bottom>
				{open && (
					<DeleteModal>
						<Delete onClick={handleDelete}>Delete</Delete>
						<Cancel onClick={() => setOpen(false)}>Cancel</Cancel>
					</DeleteModal>
				)}
			</Right>
		</Container>
	);
};

export default Comment;
