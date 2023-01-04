import makeRequest from "../utils/makeRequest";
import {
	addComment,
	getVideoFail,
	getVideoRequest,
	getVideoSuccess,
	updateVideoFail,
	updateVideoRequest,
	updateVideoSuccess,
} from "./videoRedux";

export const getVideo = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	dispatch(getVideoRequest());
	try {
		const res = await makeRequest.get(`/videos/find/${id}`, config);
		dispatch(getVideoSuccess(res.data));
	} catch (error) {
		dispatch(getVideoFail());
	}
};
export const updateVideo = (id, data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	dispatch(updateVideoRequest());
	try {
		const res = await makeRequest.put(
			`/videos/find/${id}/update`,
			data,
			config
		);
		dispatch(updateVideoSuccess(res.data));
	} catch (error) {
		dispatch(updateVideoFail());
	}
};

export const createComment = (id, data) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	try {
		const res = await makeRequest.post(`/videos/comments/${id}`, data, config);
		dispatch(addComment(res.data));
	} catch (error) {
		console.log(error);
	}
};
