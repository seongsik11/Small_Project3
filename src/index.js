import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import styled from "styled-components";
import {UserProvider} from "./UserContext";

ReactDOM.render(
    <BrowserRouter id="root">
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
