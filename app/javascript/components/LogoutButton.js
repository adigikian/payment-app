import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

const LogoutButton = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <button onClick={logoutUser}>Logout</button>
    );
}

export default LogoutButton;
