import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-quill/dist/quill.snow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "./context";

const renderApp = () => (
    <StoreProvider>
        <BrowserRouter basename={"/"}>
            <App/>
        </BrowserRouter>
    </StoreProvider>
);

ReactDOM.render(renderApp(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
