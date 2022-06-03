import React, {FC} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

const App: FC = () => {
    return (
        <>
            <BrowserRouter>
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
