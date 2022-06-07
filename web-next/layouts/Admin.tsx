import Head from "next/head"
import { FC, ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import adminStyles from "../styles/layouts/Admin.module.sass"
import layoutStyles from "../styles/layouts/Layout.module.sass"
import { AuthState, verifyToken } from "../stores/auth"
import { State, store } from "../stores"
import { useRouter } from "next/router"

type Props = {
    children: ReactNode,
    requireLoggedIn?: boolean,
    requireNotLoggedIn?: boolean,
}

const AdminLayout: FC<Props> = ({
    children = [],
    requireLoggedIn = true,
    requireNotLoggedIn = false,
}) => {
    const router = useRouter()
    const firstCheck = useSelector((state: State) => state.auth.firstCheck)
    const loading = useSelector((state: State) => state.auth.loading)
    const user = useSelector((state: State) => state.auth.user)

    useEffect(() => {
        const loginPage = "/admin/login"
        const adminPage = "/admin"
        if(firstCheck === false && loading === false){
            verifyToken().then(() => {
                console.log(user, requireLoggedIn, requireNotLoggedIn)
                if(user === null){
                    // User not logged in
                    if(requireLoggedIn){
                        router.push(loginPage)
                        console.log("go to login page!")
                    } else if(requireNotLoggedIn){
                        // In the right page
                    }
                } else{
                    // User logged in
                    if(requireLoggedIn){
                        // In the right page
                    } else if(requireNotLoggedIn){
                        router.push(adminPage)
                        console.log("go to admin!")
                    }
                }
            })
        }
    }, [])

    return (
        <>
            <div className={layoutStyles.layout} id={adminStyles.admin_layout}>
                <pre>
                    {JSON.stringify(store.getState(), null, 2)}
                </pre>
                {children}
            </div>
        </>
    )
}

export default AdminLayout