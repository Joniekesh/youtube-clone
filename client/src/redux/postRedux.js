import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
	post: {},
	loading: false,
	error: null,
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		getPostsRequest: (state) => {
			state.loading = true;
			state.posts = {};
			state.error = null;
		},
		getPostsSuccess: (state, action) => {
			state.loading = false;
			state.posts = action.payload;
			state.error = null;
		},
		getPostsFail: (state, action) => {
			state.loading = false;
			state.posts = [];
			state.error = action.payload;
		},
		likeUnlikePost: (state, action) => {
			state.posts.find((post) =>
				post._id === action.payload.id
					? post.likes.includes(
							action.payload.user._id
								? post.likes.splice(
										post.likes.findIndex(
											(likeId) => likeId === action.payload.user._id
										),
										1
								  )
								: post.likes.push(action.payload.user._id)
					  )
					: post
			);
		},
	},
});
export const {
	getPostsFail,
	getPostsRequest,
	getPostsSuccess,
	likeUnlikePost,
} = postSlice.actions;
export default postSlice.reducer;
