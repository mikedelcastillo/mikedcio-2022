import { Attributes, FC, ReactNode } from "react"

export type AppLayout = FC<{children:ReactNode}>

export type NextPageWithLayout = {
    layout?: AppLayout,
}