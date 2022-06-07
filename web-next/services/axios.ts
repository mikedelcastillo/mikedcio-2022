import axios, {AxiosError} from "axios"
import { API_URL, TOKEN_KEY } from "./env"

export const getAxiosErrorMessage = (err: Error) => {
    let message = err.message
    if(axios.isAxiosError(err)){
        const axiosError = err as AxiosError
        const data = axiosError.response?.data as { message: string }
        message = data.message ?? message
    }
    return message
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if(
        config.headers !== undefined && 
        typeof token === "string" && 
        token.length > 0
    ) {
        config.headers.authorization = token
    }

    if (config.method?.toLowerCase() !== "get") {
        // start event
    }

    return config
})

api.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error.response?.data?.message) {
            // toast(error.response.data.message, {
            //     type: "error",
            // });
        }

        return Promise.reject(error)
    }
)

export default api
