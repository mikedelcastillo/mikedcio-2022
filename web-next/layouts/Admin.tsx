import Head from "next/head"
import { FC, ReactNode } from "react"
import {Provider} from "jotai"
import adminStyles from "../styles/layouts/Admin.module.sass"
import layoutStyles from "../styles/layouts/Layout.module.sass"

type Props = {
    children: ReactNode,
}

const AdminLayout: FC<Props> = (props) => {
    return (
        <>
            <Provider>
                <div className={layoutStyles.layout} id={adminStyles.admin_layout}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim architecto accusamus maxime vero dolores dolorem esse optio a rem nemo facilis deserunt, cumque modi voluptates deleniti soluta assumenda voluptatibus incidunt.
                    {props.children}
                </div>
            </Provider>
        </>
    )
}

export default AdminLayout