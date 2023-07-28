import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import MyGroupsList from './Homepage'
import GroupsPage from './GroupsPage'
import CreateGroupPage from './CreateAGroupPage'
import GroupDetailsPage from './GroupDetailsPage'
import EditAGroupPage from './EditAGroupPage'

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
                <Route path="group">
                    <Route path="all" element={isLoggedIn ? <GroupsPage /> : <Navigate to="/login" />} />
                    <Route path="create" element={isLoggedIn ? <CreateGroupPage /> : <Navigate to="/login" />} />
                    <Route path=":id" element={isLoggedIn ? <GroupDetailsPage /> : <Navigate to="/login" />} />
                    <Route path=":id/edit" element={isLoggedIn ? <EditAGroupPage /> : <Navigate to="/login" />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />
            </Routes>
        </main>
    )
}