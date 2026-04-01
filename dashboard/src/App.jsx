import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {Button} from "@mui/material";

import './App.css';
import Navbar from './Navbar';

import Login from './pages/users/Login';
import Signup from './pages/users/Signup';

import Dashboard from './pages/Dashboard';
import Rentals from './pages/rentals/Rentals';
import BorrowOptions from './pages/rentals/BorrowOptions';

import Popup from './popups/Popup';
import PopupTest from './popups/PopupTest';
import StaffDashboard from './pages/StaffDashboard';
import ModifyBorrowStatus from './popups/ModifyBorrowStatus';

function App() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(JSON.parse(savedRole));
        }

        setLoading(false);
    }, []);

    if (loading) return <div style={{ backgroundColor: '#000', height: '100vh' }}></div>;

    function test() {
        alert(user);
    }
    return (
        <>
        <Navbar />
<BrowserRouter>
<Routes>
    <Route element={user? <Navbar /> : <Navigate to="/login" replace />} >
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/rentals" element={<Rentals />} />

        <Route path="/audit-log" element={<AuditLog />} /> */}
    </Route>

    <Route path="/login" element={<Login setUser={setUser} setRole={setRole} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/borrow" element={<BorrowOptions />} />
    <Route path="/popup" element={<PopupTest />} />
    <Route path="/staff" element={<StaffDashboard />} />
    <Route path="/rentals" element={<Rentals />} />


    <Route path="/modify" element={<ModifyBorrowStatus />} />

    
</Routes>
</BrowserRouter>
        </>
    )
}

export default App
