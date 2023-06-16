import React, { useState } from 'react';
import axiosInstance from './axiosInstance';

const TransactionItem = ({transaction,onEdit }) => {
    const [status, setStatus] = useState(transaction.status);

    const handleStatusChange = event => {
        const newStatus = event.target.value;

        axiosInstance.put(`/payments/${transaction.id}`, { status: newStatus })
            .then(response => {
                const data = response.data;
                console.log('Payment status updated successfully', data);
                // Perform any necessary actions after status update
                setStatus(newStatus);
                onEdit();
            })
            .catch(error => console.error(error));
    };

    return (
        <li className="list-group-item" key={transaction.id}>
            <div>Transaction ID: {transaction.id}</div>
            <div>Amount: {transaction.amount}</div>
            <div>Status: {status}</div>
            <div className="mb-3">
                <label htmlFor={`statusSelect-${transaction.id}`} className="form-label">
                    Update Status:
                </label>
                <select
                    id={`statusSelect-${transaction.id}`}
                    className="form-select"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approve</option>
                    <option value="error">Error</option>
                </select>
            </div>
        </li>
    );
};

export default TransactionItem;
