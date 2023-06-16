import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';

const MerchantList = () => {
    const [merchants, setMerchants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMerchants();
    }, []);

    const fetchMerchants = async () => {
        try {
            const response = await axiosInstance.get('/merchants');
            setMerchants(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/merchants/${id}`);
            fetchMerchants(); // Refresh the merchant list
            alert('Merchant deleted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/merchants/${id}/edit`); // Redirect to Merchant Edit component
    };

    return (
        <div className="container text-center">
            <button className="btn btn-primary mt-3" onClick={() => navigate('/merchants/create')}>
                Create Merchant
            </button>
            <h2>Merchant List</h2>
            <ul className="list-group">
                {merchants.map((merchant) => (
                    <li key={merchant.id} className="list-group-item">
                        <p>ID: {merchant.id}</p>
                        <p>Description: {merchant.description}</p>
                        <p>Status: {merchant.status}</p>
                        <p>User ID: {merchant.user_id}</p>
                        <p>Admin ID: {merchant.admin_id}</p>
                        <p>Created At: {merchant.created_at}</p>
                        <p>Updated At: {merchant.updated_at}</p>
                        <p>Total Transaction Sum: {merchant.total_transaction_sum}</p>
                        <div className="btn-group" role="group" aria-label="Merchant Actions">
                            <button className="btn btn-primary" onClick={() => handleEdit(merchant.id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(merchant.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MerchantList;
