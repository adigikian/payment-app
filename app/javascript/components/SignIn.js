import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import UserContext from './UserContext';

axiosInstance.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State variable for error message

    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            email,
            password
        };

        axiosInstance.post('/users/sign_in', { user })
            .then(response => {
                console.log('User signed in successfully', response);
                localStorage.setItem('token', response.headers.get("Authorization"))
                setUser(response.data.user);

                if (response.data.user.role === 'admin') {
                    navigate('/merchants');
                } else {
                    navigate('/transactions');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError('An error occurred. Please try again.'); // Set the error message
            });
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            {error && <div className="alert alert-danger">{error}</div>} {/* Render error message if error exists */}
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
