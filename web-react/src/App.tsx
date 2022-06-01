import React, {FC} from "react"

const App: FC = () => {
    return (
        <div className="App">
            { JSON.stringify(process.env) }
        </div>
    )
}

export default App
