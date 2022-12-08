import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentProfile: null,
	loading: false,
	error: null,
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		getProfileRequest: (state) => {
			state.loading = true;
		},
		getProfileSuccess: (state, action) => {
			state.loading = false;
			state.currentProfile = action.payload;
		},
		getProfileFail: (state, action) => {
			state.loading = false;
			state.currentProfile = null;
			state.error = action.payload;
		},
		resetProfile: (state, action) => {
			state.currentProfile = null;
			state.loading = false;
			state.error = null;
		},
		updateProfileRequest: (state) => {
			state.loading = true;
		},
		updateProfileSuccess: (state, action) => {
			state.loading = false;
			state.currentProfile = action.payload;
		},
		updateProfileFail: (state, action) => {
			state.loading = false;
			state.currentProfile = null;
			state.error = action.payload;
		},
	},
});
export const {
	getProfileRequest,
	getProfileSuccess,
	getProfileFail,
	resetProfile,
	updateProfileRequest,
	updateProfileSuccess,
	updateProfileFail,
} = profileSlice.actions;
export default profileSlice.reducer;
