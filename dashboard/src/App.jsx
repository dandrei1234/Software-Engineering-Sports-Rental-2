import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import './App.css';
import Navbar from './Navbar';

import Login from './pages/users/Login';
import Signup from './pages/users/Signup';

import Dashboard from './pages/Dashboard';
import Rentals from './pages/rentals/Rentals';
import BorrowOptions from './pages/rentals/BorrowOptions';

import PopupTest from './popups/PopupTest';
import StaffDashboard from './pages/StaffDashboard';
import ModifyBorrowStatus from './popups/ModifyBorrowStatus';

// 🔹 Protected Layout (Navbar only shows when logged in)
function ProtectedLayout({ user }) {
    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

function App() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        const savedRole = localStorage.getItem('role'); // ✅ fixed key
        if (savedRole) {
            setRole(JSON.parse(savedRole));
        }

        setLoading(false);
    }, []);

    if (loading) return <div style={{ backgroundColor: '#000', height: '100vh' }}></div>;

    return (
        <BrowserRouter>
            <Routes>

                {/* ✅ Protected routes (WITH Navbar) */}
                <Route element={<ProtectedLayout user={user} />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/rentals" element={<Rentals />} />
                    <Route path="/borrow" element={<BorrowOptions />} />
                    <Route path="/staff" element={<StaffDashboard />} />
                    <Route path="/popup" element={<PopupTest />} />
                    <Route path="/modify" element={<ModifyBorrowStatus />} />
                </Route>

                {/* ✅ Public routes (NO Navbar) */}
                <Route path="/login" element={<Login setUser={setUser} setRole={setRole} />} />
                <Route path="/signup" element={<Signup />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;