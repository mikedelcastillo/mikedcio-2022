import React, {
    FC, ForwardRefExoticComponent,
    MouseEventHandler, ReactNode,
} from "react"
import Link from "next/link"
import inputStyles from "../styles/Inputs.module.sass"
import { Url } from "url"

type Props = {
    test?: string,
    className?: string,
    children?: ReactNode,
    href?: string,
    onClick?: MouseEventHandler,
    next?: boolean,
}

const Button: FC<Props> = (props) => {
    let tag: string|ForwardRefExoticComponent<any> = "button"

    const elementProps: Props = {
        className: [inputStyles.button, props.className]
            .filter((c) => c).join(" "),
        onClick: props.onClick,
    }

    if (!props.next && props.href) {
        tag = "a"
        elementProps.href = props.href
    }
    
    const element = React.createElement(tag, elementProps, (
        <>
            {props.children}
        </>
    ))

    if(props.next && props.href){
        return <Link href={props.href} passHref>{element}</Link>
    }

    return element
}

export default Button
