import React, {
    FC, ForwardRefExoticComponent,
    MouseEventHandler, ReactNode,
} from "react"
import {NavLink} from "react-router-dom"
import "../assets/styles/inputs.sass"

type Props = {
    test?: string,
    className?: string,
    children?: ReactNode,
    href?: string,
    to?: string,
    onClick?: MouseEventHandler,
}

const Button: FC<Props> = (props) => {
    let tag: string|ForwardRefExoticComponent<any> = "button"

    const elementProps: Props = {
        className: ["app-button", props.className]
            .filter((c) => c).join(" "),
        onClick: props.onClick,
    }

    if (props.href) {
        tag = "a"
        elementProps.href = props.href
    } else if (props.to) {
        tag = NavLink
        elementProps.to = props.to
    }

    return React.createElement(tag, elementProps, (
        <>
            {props.children}
        </>
    ))
}

export default Button
