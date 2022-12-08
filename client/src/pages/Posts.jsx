import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PostItem from "../components/PostItem";
import { getPosts } from "../redux/postApi";

const Container = styled.div`
	width: 400px;
	height: 100vh;
`;

const PostList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Posts = () => {
	const dispatch = useDispatch();
	const { posts, loading, error } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container>
			<PostList>
				{loading ? (
					<p>Loading...</p>
				) : (
					posts.map((post) => <PostItem post={post} key={post._id} />)
				)}
			</PostList>
		</Container>
	);
};

export default Posts;
