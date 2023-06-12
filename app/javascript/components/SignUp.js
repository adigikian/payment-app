import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';

axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("merchant");
    const navigate = useNavigate();

    // Get user and setUser from UserContext
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            role
        };

        axios
            .post("/users", { user })
            .then((response) => {
                console.log("User created successfully", response);

                setUser(response.data);  // Set the user in the parent component

                // Redirect to the correct page depending on the user's role
                if (response.data.role === 'admin') {
                    navigate('/merchants');
                } else {
                    navigate('/transactions');
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
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
                <select className="form-select" id="role" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="merchant">Merchant</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
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
