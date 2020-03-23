import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import "./css/style.css"
import "./mock/mock.js"
import 'antd-mobile/dist/antd-mobile.css';
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import { BrowserRouter } from "react-router-dom"
import "./font/font_9u92hx24jqp/iconfont.css"
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
