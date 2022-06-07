import { NextPage } from "next"
import { useState } from "react"
import InputText, { useStateWithValidation } from "../../components/InputText"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"
import * as yup from "yup"

const Login: NextPage & NextPageWithLayout = () => {
    const [email, setEmail, emailError] = useStateWithValidation("", yup.string().email().required())
    const [number, setNumber, numberError] = useStateWithValidation("5", yup.number().lessThan(5))

    return (
        <>
                
                data: { JSON.stringify({ email, number, emailError, numberError }) }
           
            <InputText 
                get={email} 
                set={setEmail}
                error={emailError}/>
                
            <InputText 
                type="range"
                get={number} 
                set={setNumber}
                error={numberError}/>
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