import {
	getProfileRequest,
	getProfileSuccess,
	getProfileFail,
} from "./profileRedux";
import {
	getChannelRequest,
	getChannelSuccess,
	getChannelFail,
} from "./channelRedux";
import makeRequest from "../utils/makeRequest";

// Get User profile
export const getProfile = () => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	dispatch(getProfileRequest());
	try {
		const res = await makeRequest.get("/auth/me", config);
		dispatch(getProfileSuccess(res.data));
	} catch (error) {
		console.log(error);
		dispatch(getProfileFail());
	}
};

// Get Channel
export const getChannel = (id) => async (dispatch, getState) => {
	const {
		user: { currentUser },
	} = getState();

	const config = {
		headers: {
			Authorization: `Bearer ${currentUser?.token}`,
		},
	};

	dispatch(getChannelRequest());
	try {
		const res = await makeRequest.get(`/users/find/${id}`, config);
		dispatch(getChannelSuccess(res.data));
	} catch (error) {
		console.log(error);
		dispatch(getChannelFail());
	}
};
