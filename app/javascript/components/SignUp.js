import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import UserContext from './UserContext';

axiosInstance.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [role, setRole] = useState('merchant');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active'); // Set default status to 'active'
    const navigate = useNavigate();

    // Get user and setUser from UserContext
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            role,
            merchant_attributes: {
                description,
                status
            }
        };

        axiosInstance.post('/users', { user: userData })
            .then((response) => {
                localStorage.setItem('token', response.headers.get("Authorization"));
                alert("User created successfully");
                navigate('/');
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        // Reset merchant attributes when role changes
        setDescription('');
        setStatus('active');
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Name" onChange={e => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select className="form-select" id="role" value={role} onChange={handleRoleChange}>
                    <option value="merchant">Merchant</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {role === 'merchant' && (
                <div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Description" onChange={e => setDescription(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            )}
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={e => setPasswordConfirmation(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignUp;
