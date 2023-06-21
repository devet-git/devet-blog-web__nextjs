import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper"
import localStorageNames from "@/constants/local-storage-names";
import { isJwtExpired } from "@/utils/jwt";

type AuthStateType = {
	isAuth: boolean
}


const initialState: AuthStateType = {
	isAuth: !isJwtExpired()
}

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},

	},
	// extraReducers(builder) {
	// 	return builder.addCase(HYDRATE, (state, action) => {
	// 		return { ...state, ...action }
	// 	})
	// },
	// extraReducers: {
	// 	[HYDRATE]: (state, action) => {
	// 		return { ...state, ...action.payload }
	// 	}
	// },
})


const authReducer = authSlice.reducer;
export default authReducer;

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const { setIsAuth } = authSlice.actions;