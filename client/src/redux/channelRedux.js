import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentChannel: null,
	loading: false,
	error: null,
};

export const channelSlice = createSlice({
	name: "channel",
	initialState,
	reducers: {
		getChannelRequest: (state) => {
			state.loading = true;
		},
		getChannelSuccess: (state, action) => {
			state.loading = false;
			state.currentChannel = action.payload;
		},
		getChannelFail: (state, action) => {
			state.loading = false;
			state.currentChannel = null;
			state.error = action.payload;
		},
	},
});
export const { getChannelRequest, getChannelSuccess, getChannelFail } =
	channelSlice.actions;
export default channelSlice.reducer;
