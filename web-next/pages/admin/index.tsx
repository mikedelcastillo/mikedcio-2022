import type {NextPage} from "next"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"

const Admin: NextPage & NextPageWithLayout = () => {
    return (
        <>
            this is the admin page hehe secret stuff
        </>
    )
}

Admin.layout = AdminLayout

export default Admin