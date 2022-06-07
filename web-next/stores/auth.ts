import type { User } from "@prisma/client"

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "../services/axios"
import { TOKEN_KEY } from "../services/env"
import axios, {AxiosError} from "axios"
import { store } from "."

export type AuthState = {
    loading: boolean,
    firstCheck: boolean,
    user: null|User,
    token: null|string,
    error: null|string,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        firstCheck: false,
        user: null,
        token: null,
        error: null,
    } as AuthState,
    reducers: {
        setLoading: (state: AuthState, value: PayloadAction<AuthState["loading"]>) => {
            state.loading = value.payload
        },
        setFirstCheck: (state: AuthState, value: PayloadAction<AuthState["firstCheck"]>) => {
            state.firstCheck = value.payload
        },
        setError: (state: AuthState, value: PayloadAction<AuthState["error"]>) => {
            state.error = value.payload
        },
        setToken: (state: AuthState, value: PayloadAction<AuthState["token"]>) => {
            state.token = value.payload
            if(value.payload === null){
                localStorage.removeItem(TOKEN_KEY)
            } else{
                localStorage.setItem(TOKEN_KEY, value.payload)
            }
        },
    },
})

export const authActions = authSlice.actions

export const syncStore = () => {
    const token = localStorage.getItem(TOKEN_KEY)

    if(typeof token === "string" && token.length > 0){
        store.dispatch(authActions.setToken(token))
    }
}

export const verifyToken = async () => {
    store.dispatch(authActions.setError(null))
    store.dispatch(authActions.setLoading(true))
    // get/set token
    syncStore()

    // check if token valid
    try{
        const {data} = await api.get("/admin/verify")
        store.dispatch(authActions.setFirstCheck(true))
    } catch(err){
        if(axios.isAxiosError(err)){
            console.log(err)
            store.dispatch(authActions.setError(`${err.code}: ${err.message}`))
            if(err.response?.status === 401){
                store.dispatch(authActions.setFirstCheck(true))
            }
        } else{
            // normal
            store.dispatch(authActions.setError("Something went wrong"))
            console.warn(err)
        }
    }

    store.dispatch(authActions.setLoading(false))
}