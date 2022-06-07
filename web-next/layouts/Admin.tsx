import Head from "next/head"
import { FC, ReactNode, useEffect, useState } from "react"
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

    const [ready, setReady] = useState(false)

    useEffect(() => {
        const loginPage = {
            pathname: "/admin/login",
            query: {
                to: router.asPath,
            },
        }
        const adminPage = "/admin"

        const guard = () => {
            if(user === null){
                // User not logged in
                if(requireLoggedIn){
                    router.push(loginPage)
                } else if(requireNotLoggedIn){
                    // In the right page
                    setReady(true)
                }
            } else{
                // User logged in
                if(requireLoggedIn){
                    // In the right page
                    setReady(true)
                } else if(requireNotLoggedIn){
                    router.push(adminPage)
                }
            }
        }

        if(firstCheck === false && loading === false){
            verifyToken().then(guard)
        } else if(firstCheck === true && loading === false){
            guard()
        }
    }, [router.asPath])

    return (
        <>
            <div className={layoutStyles.layout} id={adminStyles.admin_layout}>
                <pre>
                    {JSON.stringify(store.getState(), null, 2)}
                </pre>
                {ready ? children : (
                    <>
                        not ready...
                    </>
                )}
            </div>
        </>
    )
}

export default AdminLayout