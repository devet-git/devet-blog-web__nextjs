import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import authReducer from './authSlice';

export type RootState = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
	auth: authReducer,

})

const makeStore = () => configureStore({
	reducer: rootReducers,
	devTools: true
})
const wrapper = createWrapper(makeStore, { debug: true });
export default wrapper
