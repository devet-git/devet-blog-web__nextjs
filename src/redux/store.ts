import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import authReducer from './authSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

export type RootState = ReturnType<typeof rootReducers>

const persistConfig = {
	key: 'root',
	storage,
	// whitelist: ["userId"]
}
const rootReducers = combineReducers({
	auth: authReducer,

})

const persistedReducer = persistReducer(persistConfig, rootReducers)
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
	devTools: true
})
const wrapper = createWrapper(() => store, { debug: false });

export const persistor = persistStore(store)
export default wrapper
