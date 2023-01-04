import makeRequest from "../utils/makeRequest";
import {
	getPostsFail,
	getPostsRequest,
	getPostsSuccess,
	likeUnlikePost,
} from "./postRedux";

export const getPosts = () => async (dispatch) => {
	dispatch(getPostsRequest());
	try {
		const res = await makeRequest.get("/posts");
		dispatch(getPostsSuccess(res.data));
	} catch (error) {
		dispatch(getPostsFail());
	}
};

export const addPostLike = (id, data) => async (dispatch, getState) => {
	const {
		user: { currentUser: user1 },
	} = getState();
	const { user, token } = user1;

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		await makeRequest.put(`/posts/likes/${id}`, config);
		dispatch(likeUnlikePost(id, data, user));
	} catch (error) {}
};
