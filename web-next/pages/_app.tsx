import "../styles/globals.sass"
import type { AppProps } from "next/app"
import { AppLayout, NextPageWithLayout } from "../layouts/index"
import { Provider } from "react-redux"
import { store } from "../stores"

function MyApp({ Component, pageProps }: AppProps) {

    const nextPageWithLayout = (Component as NextPageWithLayout)
    const Layout: AppLayout|undefined = nextPageWithLayout.layout

    const mainContent = (
        <Component {...pageProps} />
    )

    if(Layout !== undefined){
        return (
            <Provider store={store}>
                <Layout>
                    {mainContent}
                </Layout>
            </Provider>
        )
    } else{
        return (
            <Provider store={store}>
                {mainContent}
            </Provider>
        )
    }
}

export default MyApp
