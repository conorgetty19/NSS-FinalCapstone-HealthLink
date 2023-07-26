import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import MyGroupsList from './Homepage'

export default function ApplicationViews({ isLoggedIn }) {

    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <MyGroupsList /> : <Navigate to="/login" />}
                    />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Routes>
        </main>
    )
}