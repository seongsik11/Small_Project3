import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import React, {useState} from "react";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import styled from "styled-components";


export default function App() {
    const [clicks, setClicks] = useState([]);

    const handlePointerClick = (e) => {
        const {clientX, clientY} = e;
        const click = {
            x: clientX,
            y: clientY,
            id: new Date().getTime(),
            timer: null,
        };

        setClicks((prevClicks) => [...prevClicks, click]);

        click.timer = setTimeout(() => {
            setClicks((prevClicks) => prevClicks.filter((c) => c.id !== click.id));
        }, 1000);
    };

    return (
        <div className="App" onClick={handlePointerClick}>
            {clicks &&
                clicks.map((click) => (
                    <div
                        key={click.id}
                        className="pointer"
                        style={{left: click.x, top: click.y}}
                    ></div>
                ))}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </div>
    )
}



