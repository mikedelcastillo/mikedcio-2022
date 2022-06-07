import { NextPage } from "next"
import { useState } from "react"
import InputText, { useStateWithValidation } from "../../components/InputText"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"
import * as yup from "yup"
import { useRouter } from "next/router"
import Button from "../../components/Button"
import api, { getAxiosErrorMessage } from "../../services/axios"

const Login: NextPage & NextPageWithLayout = () => {
    const router = useRouter() 

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null|string>(null)
    const [token, setToken] = useState<null|string>(null)
    const [email, setEmail, emailError] = useStateWithValidation("", yup.string().email().required())
  
    const request = () => {
        if([emailError].some(bool => bool)){
            // There is an error
        } else{
            setLoading(true)
            setError(null)
            api.post("/admin/request", { email })
                .then(({ data }) => {
                    setToken(data.token)
                })
                .catch((err) => {
                    setError(getAxiosErrorMessage(err))
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <InputText 
                get={email} 
                set={setEmail}
                error={emailError}/>

            <Button onClick={request}>Request</Button>

            <pre>Error: {error}</pre>
        </>
    )
}

Login.layout = ({ children }) => {
    return (
        <AdminLayout requireLoggedIn={false} requireNotLoggedIn={true}>
            {children}
        </AdminLayout>
    )
}

export default Login