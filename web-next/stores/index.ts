import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authSlice, AuthState } from "./auth"

export type State = {
    auth: AuthState,
}

const reducer = combineReducers({
    auth: authSlice.reducer,
})

export const store = configureStore({
    reducer,
})