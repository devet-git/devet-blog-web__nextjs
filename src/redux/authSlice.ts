import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper"
import storageKeys from "@/constants/local-storage-keys";
import { isJwtExpired } from "@/utils/jwt";
import browserUtils from "@/utils/browser";
import { User } from "@/types/api-object";

type AuthStateType = {
	isAuth: boolean
	userId: string
}


const initialState: AuthStateType = {
	isAuth: !isJwtExpired(),
	userId: "cascb"
	// currentUser: browserUtils.store.get(localStorageKeys.USER) || null
}

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},
		setUserId: (state, action) => {
			state.userId = action.payload
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
			(state, action) => ({ ...state, ...action.payload })
		);
	},
})


const authReducer = authSlice.reducer;
export default authReducer;

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUserId = (state: RootState) => state.auth.userId
export const { setIsAuth, setUserId } = authSlice.actions;