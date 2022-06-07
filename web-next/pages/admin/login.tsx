import { NextPage } from "next"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"

const Login: NextPage & NextPageWithLayout = () => {

    return (
        <>
            hello!
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