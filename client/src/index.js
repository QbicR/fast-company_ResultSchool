import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./app/App";
import "bootstrap/dist/css/bootstrap.css";
import { createStore } from "./app/store/createStore";
import { Provider } from "react-redux";

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);

reportWebVitals();
