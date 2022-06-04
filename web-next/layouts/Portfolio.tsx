import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode,
}

const PortfolioLayout: FC<Props> = (props) => {
    return (
        <>
            <h1>this is the admin layout</h1>
            {props.children}
        </>
    )
}

export default PortfolioLayout