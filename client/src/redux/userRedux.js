import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		registerRequest: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
		},
		registerFail: (state, action) => {
			state.loading = false;
			state.currentUser = null;
			state.error = action.payload;
		},
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.currentUser = action.payload;
		},
		loginFail: (state, action) => {
			state.loading = false;
			state.currentUser = null;
			state.error = action.payload;
		},
		logout: (state) => {
			state.loading = false;
			state.currentUser = null;
			state.error = null;
		},

		subscription: (state, action) => {
			if (!state.currentUser.subscribedUsers?.includes(action.payload)) {
				state.currentUser.subscribedUsers?.push(action.payload);
			} else {
				state.currentUser.subscribedUsers?.pull(action.payload);
			}
		},
	},
});
export const {
	registerRequest,
	registerSuccess,
	registerFail,
	loginRequest,
	loginSuccess,
	loginFail,
	logout,
	subscription,
} = userSlice.actions;
export default userSlice.reducer;
