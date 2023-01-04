import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { addPostLike } from "../redux/postApi";
import { useDispatch, useSelector } from "react-redux";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	background-color: white;
	border: 1px solid #ddd;
	border-radius: 10px;
	padding: 10px;
`;

const Top = styled.h4`
	color: teal;
	font-weight: 500;
`;

const Middle = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
`;

const Text = styled.span``;

const Image = styled.img`
	width: 100%;
	height: 150px;
`;

const Reaction = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
`;

const Hr = styled.hr`
	background-color: #ddd;
	width: 100%;
	height: 0.5px;
`;

const Left = styled.span``;

const Right = styled.span``;

const BLeft = styled.span`
	cursor: pointer;
`;

const BRight = styled.span`
	cursor: pointer;
`;

const PostItem = ({ post }) => {
	const dispatch = useDispatch();

	const [user, setUser] = useState({});
	const {
		currentUser: { user: user1 },
	} = useSelector((state) => state.user);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await makeRequest.get(`/users/find/${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const hanleLikes = () => {
		dispatch(addPostLike(post._id, user1._id));
	};

	return (
		<Container>
			<Top>{user.name}</Top>
			<Middle>
				<Text>{post.text}</Text>
				<Link to={`/post/${post._id}`}>
					<Image
						src="https://firebasestorage.googleapis.com/v0/b/jonietube-730a8.appspot.com/o/1662644114281chat-app-landing-page.webp?alt=media&token=1971446d-1fdb-4280-9c69-6c6c05f157c7"
						alt=""
					/>
				</Link>
				<Reaction>
					<Left>{post.likes.length}</Left>
					<Right>{post.comments.length} Comments</Right>
				</Reaction>
				<Hr />
			</Middle>
			<Bottom>
				<BLeft onClick={hanleLikes}>Like</BLeft>
				<BRight>Comment</BRight>
			</Bottom>
		</Container>
	);
};

export default PostItem;
