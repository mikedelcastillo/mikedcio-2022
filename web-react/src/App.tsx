import React, {FC} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Button from "./components/Button"

const App: FC = () => {
    const test = () => console.log("nice!")

    return (
        <>
            <BrowserRouter>

                <Button>This is a test</Button>
                <Button href="#">This is a test</Button>
                <Button href="#" className="test">This is a test</Button>
                <Button to="/" className="test">This is a test</Button>
                <Button onClick={test}>console</Button>

                <Routes>
                    <Route path="/">
                        <Route index element={<>hi</>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
