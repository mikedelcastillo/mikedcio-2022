import type { User } from "@prisma/client"

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AuthState = {
    loading: boolean,
    firstCheck: boolean,
    user: null|User,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        firstCheck: false,
        user: null,
    } as AuthState,
    reducers: {
        setLoading: (state: AuthState, value: PayloadAction<boolean>) => {
            state.loading = value.payload
        }
    },
})

export const authActions = authSlice.actions

export const authStore = configureStore({
    reducer: authSlice.reducer,
})

authStore.subscribe(() => console.log(authStore.getState()))