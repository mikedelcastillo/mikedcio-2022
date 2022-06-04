import type {NextPage} from "next"
import { NextPageWithLayout } from "../../layouts"
import AdminLayout from "../../layouts/Admin"
import { useAtom } from "jotai"
import { userAtom, isLoggedInAtom } from "../../stores/auth"

const Admin: NextPage & NextPageWithLayout = () => {
    const [user] = useAtom(userAtom)
    const [isLoggedIn] = useAtom(isLoggedInAtom)
    
    return (
        <>
            <pre>{JSON.stringify({isLoggedIn, user})}</pre>
        </>
    )
}

Admin.layout = AdminLayout

export default Admin