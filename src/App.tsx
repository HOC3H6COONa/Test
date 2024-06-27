import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Test from "./Components/Test/Test";
import Main from "./Components/Main/Main";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route index element={<Main/>}></Route>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;