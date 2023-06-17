import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper"
import localStorageNames from "@/constants/local-storage-names";

type AuthStateType = {
	isAuth: boolean
}
const initialState: AuthStateType = {
	isAuth: (typeof window !== "undefined" && localStorage.getItem(localStorageNames.JWT_TOKEN)) ? true : false
}

const authSlice = createSlice({
	initialState,
	name: "auth",
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},

	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return { ...state, ...action.payload }
		}
	},
})


const authReducer = authSlice.reducer;
export default authReducer;

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const { setIsAuth } = authSlice.actions;