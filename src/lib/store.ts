import {configureStore} from "@reduxjs/toolkit"
import { AuthReducer } from "./Slices/AuthSlice"
import { postsReducer } from "./Slices/postsSlice"


export const store=configureStore({
    reducer:{
auth:AuthReducer,
posts:postsReducer
    }
})

export type appDispatch=typeof store.dispatch


export  type RootState =ReturnType<typeof store.getState>
