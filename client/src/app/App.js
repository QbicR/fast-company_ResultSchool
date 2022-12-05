import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import Users from "./layouts/Users";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import NavBar from './components/ui/NavBar'
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import LogOut from "./layouts/LogOut";
import AppLoader from "./components/ui/HOC/AppLoader";

const App = () => {

    return (
        <>
            <AppLoader>
                <NavBar />
                <Routes>
                    <Route
                        path='users/*'
                        element={
                            <ProtectedRoutes>
                                <Users />
                            </ProtectedRoutes>
                        }
                    />
                    <Route path='login/*' element={<Login />} />
                    <Route path='/' element={<Main />} />
                    <Route path='logout' element={<LogOut />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </AppLoader>
            <ToastContainer />
        </>
    );
};

export default App;
