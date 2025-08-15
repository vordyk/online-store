import React, {Component, useContext} from 'react'
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import {authRoutes, publicRoutes} from '../routes'
import {Context} from "../index";

export const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth &&
                authRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}

            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>}/>
            ))}
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};
