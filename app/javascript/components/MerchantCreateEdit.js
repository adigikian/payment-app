import React, { useState, useEffect,useContext } from 'react';
import axiosInstance from './axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

const MerchantCreateEdit = () => {
    const [user, setUser] = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('merchant');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchMerchant();
        }
    }, [id]);

    const fetchMerchant = async () => {
        try {
            const response = await axiosInstance.get(`/merchants/${id}`);
            setName(response.data.name);
            setUserName(response.data.user_name);
            setEmail(response.data.email);
            setRole(response.data.role);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                merchant: {
                    status,
                    description,
                    admin_id: user.id,
                    user_attributes: {
                        name: userName,
                        email,
                        role
                    }
                }
            };
            if (id) {
                await axiosInstance.put(`/merchants/${id}`, payload);
            } else {
                await axiosInstance.post('/merchants', payload);
            }
            navigate('/merchants'); // Redirect to Merchant List component
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container text-center">
            <h2>{id ? 'Edit Merchant' : 'Create Merchant'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Merchant Name:</label>
                    <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name:</label>
                    <input type="text" id="userName" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <select id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="merchant">Merchant</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status:</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Save' : 'Create'}</button>
            </form>
        </div>

    );
};

export default MerchantCreateEdit;
