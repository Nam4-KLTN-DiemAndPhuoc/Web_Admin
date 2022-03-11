import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

export default function Root() {
    const { user, token } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />}></Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
