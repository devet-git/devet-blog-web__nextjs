import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper"
import localStorageKeys from "@/constants/local-storage-keys";
import { isJwtExpired } from "@/utils/jwt";
import browserUtils from "@/utils/browser";
import { User } from "@/types/api-object";

type AuthStateType = {
	isAuth: boolean
	currentUser: any
}


const initialState: AuthStateType = {
	isAuth: !isJwtExpired(),
	currentUser: {}
	// currentUser: browserUtils.store.get(localStorageKeys.USER) || null
}

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload
		}
	},
	// extraReducers(builder) {
	// 	return builder.addCase(HYDRATE, (state, action) => {
	// 		return { ...state, ...action }
	// 	})
	// },
	extraReducers(builder) {
		builder.addCase<typeof HYDRATE, PayloadAction<any, typeof HYDRATE>>(
			HYDRATE,
			(state, { payload }) => ({ ...state, ...payload.page })
		);
	},
})


const authReducer = authSlice.reducer;
export default authReducer;

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectCurrentUser = (state: RootState) => state.auth.currentUser
export const { setIsAuth, setCurrentUser } = authSlice.actions;