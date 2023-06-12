import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';

axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            email,
            password
        };

        axios
            .post('/users/sign_in', { user })
            .then(response => {
                console.log('User signed in successfully', response);
                setUser(response.data.user);

                if (response.data.user.role === 'admin') {
                    navigate('/merchants');
                } else {
                    navigate('/transactions');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    );
};

export default SignIn;
