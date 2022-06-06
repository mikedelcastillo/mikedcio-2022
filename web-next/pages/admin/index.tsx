import type {NextPage} from "next"
import { useSelector } from "react-redux"
import Button from "../../components/Button"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"
import { AuthState, authStore, authActions } from "../../stores/auth"

const Admin: NextPage & NextPageWithLayout = () => {
    const loading = useSelector((state: AuthState) => state.loading)

    const toggle = () => {
        console.log("testing", loading, authStore.getState())
        authStore.dispatch(authActions.setLoading(!loading))
    }
    return (
        <>
            <pre>{JSON.stringify({loading})}</pre>
            <Button onClick={toggle}>toggle</Button>
        </>
    )
}

Admin.layout = AdminLayout

export default Admin