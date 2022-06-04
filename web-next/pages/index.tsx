import type {NextPage} from "next"
import Button from "../components/Button"
import inputStyles from "../styles/components/Inputs.module.sass"

import Link from "next/link"
import { useEffect, useState } from "react"

const Home: NextPage = () => {
    return (
        <>
            <h1>The number is {number} with {updates} updates</h1>
            <Button onClick={test} href="/" next>Next Link</Button>
            <Button onClick={test}>Normal Button</Button>
            <Button onClick={test} href="/">Anchor Tag</Button>
            <Button onClick={test} className={[inputStyles.red, inputStyles.disabled].join(" ")}>Modified Button</Button>
        </>
    )
}

export default Home
