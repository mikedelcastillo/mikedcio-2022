import type {NextPage} from "next"
import Button from "../components/Button"
import inputStyles from "../styles/Inputs.module.sass"

import Link from "next/link"

const Home: NextPage = () => {
    const test = () => {
        console.log("hello!")
    }

    return (
        <>
            <Button onClick={test} href="/" next>Next Link</Button>
            <Button onClick={test}>Normal Button</Button>
            <Button onClick={test} href="/">Anchor Tag</Button>
            <Button onClick={test} className={[inputStyles.red, inputStyles.disabled].join(" ")}>Modified Button</Button>
        </>
    )
}

export default Home
