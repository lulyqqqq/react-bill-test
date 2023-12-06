import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider} from "react-router-dom";
// 1.导入路由Router
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //2.路由绑定
    <RouterProvider router={router}/>
);

