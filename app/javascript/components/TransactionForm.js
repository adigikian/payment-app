import React, { useState, useContext } from 'react';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

const TransactionForm = ({ onCancel, onTransactionCreate }) => {
    const [amount, setAmount] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [transactionType, setTransactionType] = useState('AuthorizeTransaction');
    const [parentTransactionId, setParentTransactionId] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = event => {
        setError('');
        event.preventDefault();

        const payload = {
            payment: {
                amount,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                merchant_id: user.merchant_id,
                type: transactionType,
                status: 'pending',
                parent_id: parentTransactionId ? parseInt(parentTransactionId) : null,
            },
        };

        axiosInstance.post('/payments', payload)
            .then(response => {
                console.log('Payment processed successfully', response.data);
                onTransactionCreate(response.data);
                navigate('/transactions');
            })
            .catch(error => {
                if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
                    setError(error.response.data.errors.join(', '));
                } else {
                    setError('An error occurred. Please try again later.');
                }
                console.error(error);
            });
        setAmount('');
        setCustomerEmail('');
        setCustomerPhone('');
        setTransactionType('AuthorizeTransaction');
        setParentTransactionId('');
    };

    return (
        <div className="container text-center">
            <h2>Create Transaction</h2>
            {error && <div className="text-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Amount:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customerEmail" className="form-label">
                        Customer Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="customerEmail"
                        value={customerEmail}
                        onChange={event => setCustomerEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="customerPhone" className="form-label">
                        Customer Phone:
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="customerPhone"
                        value={customerPhone}
                        onChange={event => setCustomerPhone(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="transactionType" className="form-label">
                        Transaction Type:
                    </label>
                    <select
                        className="form-control"
                        id="transactionType"
                        value={transactionType}
                        onChange={event => setTransactionType(event.target.value)}
                    >
                        <option value="AuthorizeTransaction">Authorize Transaction</option>
                        <option value="ChargeTransaction">Charge Transaction</option>
                        <option value="RefundTransaction">Refund Transaction</option>
                        <option value="ReversalTransaction">Reversal Transaction</option>
                    </select>
                </div>
                {['ChargeTransaction', 'RefundTransaction', 'ReversalTransaction'].includes(transactionType) && (
                    <div className="mb-3">
                        <label htmlFor="parentTransactionId" className="form-label">
                            Parent Transaction ID:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="parentTransactionId"
                            value={parentTransactionId}
                            onChange={event => setParentTransactionId(event.target.value)}
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;