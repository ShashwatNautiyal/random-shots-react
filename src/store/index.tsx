import { configureStore } from "@reduxjs/toolkit";
import apiCache from "./reducers/apiCache.reducer";
import themeReducer from "./reducers/theme.reducer";

const store = configureStore({
	reducer: {
		apiCache: apiCache,
		theme: themeReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
