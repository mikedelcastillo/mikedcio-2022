import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode,
}

const AdminLayout: FC<Props> = (props) => {
    return (
        <>
            <h1>this is the admin layout</h1>
            {props.children}
        </>
    )
}

export default AdminLayout