import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MerchantTransactions from './MerchantTransactions';
import AdminMerchantListing from './AdminMerchantListing';
import Landing from "./Landing";
import UserContext from './UserContext';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '@popperjs/core';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Router>
                <Routes>
                    <Route path="*" element={<Landing />} />
                    <Route path="/signup" element={user ? <Navigate to="/" replace={true} /> : <SignUp />} />
                    <Route path="/signin" element={user ? <Navigate to="/" replace={true} /> : <SignIn />} />
                    <Route path="/transactions" element={user && user.role === 'merchant' ? <MerchantTransactions /> : <Navigate to="/signin" replace={true} />} />
                    <Route path="/merchants" element={user && user.role === 'admin' ? <AdminMerchantListing /> : <Navigate to="/signin" replace={true} />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
};

export default App;
