import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import { userApi } from '../services/user.service'
import { videosApi } from '../services/videos.service'

export const store = configureStore({
  reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
      [videosApi.reducerPath]: videosApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware, videosApi.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch