import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import "./index.css";

function App() {
    const [result, setResult] = useState({});

    return (
        <HashRouter>
            <Routes>
                <Route
                    exact={true}
                    path='/'
                    element={<Main />}
                />
                <Route
                    exact={true}
                    path='/quiz'
                    element={<Quiz setResult={setResult} />}
                />
                <Route
                    exact={true}
                    path='/result'
                    element={<Result result={result} />}
                />
            </Routes>
        </HashRouter>
    )
}

export default App;
