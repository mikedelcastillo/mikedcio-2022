import "../styles/globals.sass"
import type { AppProps } from "next/app"
import { AppLayout, NextPageWithLayout } from "../layouts/index"

function MyApp({ Component, pageProps }: AppProps) {

    const nextPageWithLayout = (Component as NextPageWithLayout)
    const Layout: AppLayout|undefined = nextPageWithLayout.layout

    if(Layout !== undefined){
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
    } else{
        return <Component {...pageProps} />
    }
}

export default MyApp
