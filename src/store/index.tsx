import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import querySlice from "../reducers/query.reducer";

const store = configureStore({
	reducer: {
		query: querySlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
