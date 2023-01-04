import styled from "styled-components";
import RightMenu from "../components/RightMenu";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeLike } from "../redux/videoRedux";
import { format } from "timeago.js";
import { useState } from "react";
import { addLike } from "../redux/videoRedux";
import { subscription } from "../redux/userRedux";
import { createComment, getVideo } from "../redux/videoApi";
import { getChannel } from "../redux/profileApi";
import UploadVideo from "../components/UploadVideo";
import { responsive965 } from "../responsive";
import SuggestionList from "../components/SuggestionList";
import { toast } from "react-toastify";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	height: calc(100vh - 70px);
	width: 100%;
`;

const VideoDetails = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Main = styled.div`
	display: flex;
	background-color: ${({ theme }) => theme.bg};
	font-size: 14px;
`;

const Details = styled.div`
	flex: 5;
	display: flex;
	flex-direction: column;
`;

const Top = styled.div``;

const VideoFrame = styled.video`
	max-height: 720px;
	width: 100%;
	object-fit: cover;
`;

const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
`;

const Title = styled.span`
	color: ${({ theme }) => theme.text};
	font-weight: 500;
	margin: 16px 0;
`;

const VideoDescs = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 8px 0 20px 0px;
`;

const Left = styled.span`
	font-size: smaller;
	color: ${({ theme }) => theme.textSoft};
`;

const Right = styled.div`
	display: flex;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	margin-right: 12px;
	font-size: 12px;
	font-weight: 500;
	cursor: pointer;
	color: ${({ theme }) => theme.text};
`;

const Text = styled.span`
	margin-left: 5px;
`;

const UserInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

const InfoLeft = styled.div`
	display: flex;
	align-items: center;
`;

const InfoImg = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 16px;
`;

const InfoRight = styled.div`
	display: flex;
	flex-direction: column;
`;

const InfoText = styled.span`
	margin: 16px 0;
	font-size: 13px;
	text-align: justify;
	color: ${({ theme }) => theme.text};
`;

const DivLeft = styled.div`
	display: flex;
	flex-direction: column;
`;

const Name = styled.span`
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const SubCount = styled.span`
	font-size: small;
	color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.button`
	border: none;
	color: white;
	background-color: crimson;
	padding: 6px;
	cursor: pointer;
	border-radius: 5px;
	font-weight: 500;
`;

const CommentForm = styled.div`
	display: flex;
`;

const AvatarDiv = styled.div``;

const Image = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 16px;
`;

const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 34px;
	width: 100%;
`;

const Input = styled.textarea`
	width: 100%;
	padding: 5px;
	outline: none;
	border: none;
	border-bottom: 1px solid #ddd;
	background-color: transparent;
	color: ${({ theme }) => theme.text};
`;

const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0px;
	font-size: 12px;
`;

const Button1 = styled.span`
	border: none;
	padding: 6px;
	cursor: pointer;
	background-color: green;
	color: white;
	border-radius: 5px;
`;

const CommentCount = styled.span`
	color: ${({ theme }) => theme.text};
`;

const Button2 = styled.button`
	border: none;
	padding: 6px;
	cursor: pointer;
	background-color: #292933;
	color: white;
	border-radius: 5px;
`;

const CommentList = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;
	margin-top: -30px;
`;

const Span = styled.span`
	text-align: center;
	color: ${({ theme }) => theme.textSoft};
	font-size: 20px;
`;

const Suggestions = styled.div`
	width: 100%;
	display: none;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 50px;
	${responsive965({
		display: "flex",
	})}
`;

const SuggestionTitle = styled.span`
	margin-bottom: 10px;
	font-weight: 500;
	font-size: 24px;
	margin-left: 24px;
	color: ${({ theme }) => theme.textSoft};
`;

const Video = ({ setOpen, open }) => {
	const [text, setText] = useState("");
	const [show, setShow] = useState(false);

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isUpdate, setIsUpdate] = useState(false);

	const { video } = useSelector((state) => state.video);
	const { currentProfile } = useSelector((state) => state.profile);
	const { currentChannel } = useSelector((state) => state.channel);

	const { currentUser } = useSelector((state) => state.user);
	const user = currentUser?.user;
	const TOKEN = currentUser?.token;
	const [isSubscribed, setIsSubscribed] = useState(
		currentChannel?.subscribers?.includes(user?._id)
	);

	useEffect(() => {
		setIsSubscribed(isSubscribed);
	}, [isSubscribed]);

	useEffect(() => {
		dispatch(getVideo(id));
	}, [id, dispatch]);

	useEffect(() => {
		dispatch(getChannel(video?.userId));
	}, [video?.userId, dispatch]);

	const handleLike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			if (TOKEN) {
				await makeRequest.put(
					`/videos/addRemoveVideoLikes/${id}`,
					user?._id,
					config
				);
				dispatch(addLike(user?._id));
			} else {
				toast.error("Please login to add a like.", { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			toast.error("Error occured", { theme: "colored" });
		}
	};

	const handleDislike = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			if (TOKEN) {
				await makeRequest.put(
					`/videos/addRemoveVideoDislikes/${video._id}`,
					user._id,
					config
				);
				dispatch(removeLike(user._id));
			} else {
				toast.error("Please log in to dislike a post.", { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			toast.error("Error occured", { theme: "colored" });
		}
	};

	const subscribeHandler = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			if (TOKEN) {
				await makeRequest.put(
					`/users/subunsub/${currentChannel._id}`,
					{ id: currentChannel._id },
					config
				);
				dispatch(subscription(currentChannel._id));
				dispatch(getChannel(video.userId));
			} else {
				toast.error("Please log in to subscribe.", { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			toast.error("Error occured", { theme: "colored" });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (TOKEN) {
			const newComment = {
				userId: user._id,
				videoId: id,
				text,
			};

			dispatch(createComment(video._id, newComment));
			setText("");
		} else {
			toast.error("Please log in to add a comment.", { theme: "colored" });
		}
	};

	const handleOpenVideoEdit = () => {
		setOpen(true);
		setIsUpdate(true);
	};

	const handleDelete = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOKEN}`,
			},
		};

		try {
			if (window.confirm("Are you SURE? This cannot be UNDONE!")) {
				const res = await makeRequest.delete(`/videos/${video._id}`, config);
				res.status === 200 && navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<VideoDetails>
				<Main>
					<Details>
						<Top>
							<VideoFrame src={video?.videoUrl} controls alt="" />
						</Top>
						<Bottom>
							<Title>{video?.title}</Title>
							<VideoDescs>
								<Left>
									{video?.views} view{video?.views > 1 ? "s" : ""} .{" "}
									{format(video?.createdAt)}
								</Left>
								<Right>
									<Item onClick={handleLike}>
										{video?.likes?.includes(user?._id) ? (
											<ThumbUpIcon style={{ fontSize: "18px" }} />
										) : (
											<ThumbUpOutlinedIcon style={{ fontSize: "18px" }} />
										)}
										<Text>{video?.likes.length}</Text>
									</Item>
									<Item onClick={handleDislike}>
										{video?.dislikes.includes(user?._id) ? (
											<ThumbDownIcon style={{ fontSize: "18px" }} />
										) : (
											<ThumbDownOutlinedIcon style={{ fontSize: "18px" }} />
										)}
										<Text>Dislike</Text>
									</Item>
									<Item>
										<ReplyOutlinedIcon style={{ fontSize: "18px" }} />
										<Text>Share</Text>
									</Item>
									<Item>
										<SaveAltOutlinedIcon style={{ fontSize: "18px" }} />
										<Text>Save</Text>
									</Item>
								</Right>
							</VideoDescs>
							<UserInfo>
								<InfoLeft>
									<InfoImg src={currentChannel?.img} />
									<DivLeft>
										<Name>{currentChannel?.name}</Name>
										<SubCount>
											{currentChannel?.subscribers?.length} Subscriber
											{currentChannel?.subscribers?.length > 1 ? "s" : ""}
										</SubCount>
									</DivLeft>
								</InfoLeft>
								{video?.userId !== user?._id ? (
									<InfoRight>
										<Button onClick={subscribeHandler}>
											{currentChannel?.subscribers?.includes(user?._id)
												? "UNSUBSCRIBE"
												: "SUBSCRIBE"}
										</Button>
									</InfoRight>
								) : (
									<Buttons
										style={{
											display: "flex",
											alignItems: "center",
											gap: "30px",
										}}
									>
										<Button onClick={handleDelete}>Delete Video</Button>
										<Button1 onClick={handleOpenVideoEdit}>Edit Video</Button1>
									</Buttons>
								)}
							</UserInfo>
							<InfoText>{video?.desc}</InfoText>
						</Bottom>
						<CommentForm>
							<AvatarDiv>
								<Image src={currentProfile?.img} alt="" />
							</AvatarDiv>
							<Wrapper onSubmit={handleSubmit}>
								<Input
									type="text"
									placeholder="Add Comment"
									rows={3}
									onChange={(e) => setText(e.target.value)}
									required
									value={text}
								/>
								<Buttons>
									<Button1 onClick={() => setShow(!show)}>
										{show ? "Hide" : "Show"}
									</Button1>
									<CommentCount>
										{video?.comments.length} Comment
										{video?.comments.length > 1 ? "s" : ""}
									</CommentCount>
									<Button2 type="submit">COMMENT</Button2>
								</Buttons>
							</Wrapper>
						</CommentForm>
						{show && (
							<CommentList>
								{video?.comments.length > 0 ? (
									video?.comments.map((comment, key) => (
										<Comment key={key} comment={comment} videoId={video._id} />
									))
								) : (
									<Span>No Comments for this video yet.</Span>
								)}
							</CommentList>
						)}
					</Details>

					<RightMenu tags={video?.tags} />
				</Main>
				<Suggestions>
					{video?.tags.length > 0 && (
						<SuggestionTitle>Related Videos</SuggestionTitle>
					)}
					<SuggestionList tags={video?.tags} />
				</Suggestions>
			</VideoDetails>
			{open && (
				<UploadVideo
					isUpdate={isUpdate}
					setIsUpdate={setIsUpdate}
					setOpen={setOpen}
					currentVideo={video}
				/>
			)}
		</Container>
	);
};

export default Video;
