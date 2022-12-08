import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	video: null,
};

export const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		getVideoRequest: (state) => {
			state.loading = true;
		},

		getVideoSuccess: (state, action) => {
			state.loading = false;
			state.video = action.payload;
		},

		getVideoFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.video = null;
		},

		updateVideoRequest: (state) => {
			state.loading = true;
		},

		updateVideoSuccess: (state, action) => {
			state.loading = false;
			state.video = action.payload;
		},

		updateVideoFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.video = null;
		},

		addLike: (state, action) => {
			if (!state.video.likes.includes(action.payload)) {
				state.video.likes.push(action.payload);
				state.video.dislikes.splice(
					state.video.dislikes.findIndex((id) => id === action.payload),
					1
				);
			} else {
				state.video.likes.splice(
					state.video.likes.findIndex((id) => id === action.payload),
					1
				);
			}
		},

		removeLike: (state, action) => {
			if (state.video.likes.includes(action.payload)) {
				state.video.likes.splice(
					state.video.likes.findIndex((id) => id === action.payload),
					1
				);
				state.video.dislikes.push(action.payload);
			} else {
				state.video.dislikes.splice(
					state.video.dislikes.findIndex((id) => id === action.payload),
					1
				);
			}
		},

		addComment: (state, action) => {
			state.video.comments.push(action.payload);
		},

		deleteComment: (state, action) => {
			state.video?.comments.splice(
				state.video.comments.findIndex((id) => id === action.payload),
				1
			);
		},

		likeComment: (state, action) => {
			const comment = state.video.comments.find(
				(comment) => comment._id === action.payload.commentId
			);
			if (!comment?.likes.includes(action.payload.currentUserId)) {
				comment?.likes.push(action.payload.currentUserId);
			} else {
				comment?.likes.splice(
					comment?.likes.findIndex((id) => id === action.payload.currentUserId),
					1
				);
			}
		},

		dislikeComment: (state, action) => {
			const comment = state.video.comments.find(
				(comment) => comment._id === action.payload.commentId
			);
			if (!comment?.dislikes.includes(action.payload.currentUserId)) {
				comment?.dislikes.push(action.payload.currentUserId);

				if (comment?.likes.includes(action.payload.currentUserId)) {
					comment.likes.splice(
						comment.likes.findIndex(
							(id) => id === action.payload.currentUserId
						),
						1
					);
				}
			} else {
				comment?.dislikes.splice(
					comment.dislikes.findIndex(
						(id) => id === action.payload.currentUserId
					),
					1
				);
			}
		},
	},
});

export const {
	getVideoRequest,
	getVideoSuccess,
	getVideoFail,
	updateVideoRequest,
	updateVideoSuccess,
	updateVideoFail,
	addLike,
	removeLike,
	addComment,
	deleteComment,
	likeComment,
	dislikeComment,
} = videoSlice.actions;
export default videoSlice.reducer;
