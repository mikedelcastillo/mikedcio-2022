import type {NextPage} from "next"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"

const Admin: NextPage & NextPageWithLayout = () => {
    return <>hi</>
}

Admin.layout = AdminLayout

export default Admin