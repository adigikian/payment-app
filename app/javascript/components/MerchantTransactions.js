import React, { useEffect, useState, useContext } from 'react';
import TransactionForm from './TransactionForm';
import TransactionItem from './TransactionItem';
import axios from 'axios';
import UserContext from './UserContext';

const MerchantTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isCreateMode, setCreateMode] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        fetchMerchantTransactions();
    }, []);

    const fetchMerchantTransactions = () => {
        axios
            .get(`/payments?merchant_id=${user.merchant_id}`)
            .then(response => {
                const data = response.data;
                setTransactions(data);
            })
            .catch(error => console.error(error));
    };

    const handleCreateMode = () => {
        setCreateMode(true);
        setEditingTransaction(null);
    };

    const handleEditTransaction = () => {
        fetchMerchantTransactions();
    };

    const handleCancelEdit = () => {
        setCreateMode(false);
        setEditingTransaction(null);
    };

    const handleTransactionUpdate = updatedTransaction => {
        const updatedTransactions = transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        );
        setTransactions(updatedTransactions);
        setEditingTransaction(null);
    };

    const handleTransactionCreate = transaction => {
        setTransactions(prevTransactions => [...prevTransactions, transaction]);
        setCreateMode(null);
    };

    const filteredTransactions = {
        AuthorizeTransaction: transactions.filter(transaction => transaction.type === 'AuthorizeTransaction'),
        ChargeTransaction: transactions.filter(transaction => transaction.type === 'ChargeTransaction'),
        RefundTransaction: transactions.filter(transaction => transaction.type === 'RefundTransaction'),
        ReversalTransaction: transactions.filter(transaction => transaction.type === 'ReversalTransaction'),
    };

    return (
        <div className="container text-center">
            <h2>Transaction List</h2>
            {isCreateMode ? (
                <TransactionForm onCancel={handleCancelEdit} onTransactionCreate={handleTransactionCreate} />
            ) : (
                <>
                    <button onClick={handleCreateMode} className="btn btn-primary mb-3">
                        Create Transaction
                    </button>
                    <div className="row">
                        {Object.entries(filteredTransactions).map(([transactionType, transactionList]) => (
                            <div className="col" key={transactionType}>
                                <h3>{transactionType} Transactions</h3>
                                <ul className="list-group">
                                    {transactionList.map(transaction => (
                                        <TransactionItem
                                            key={transaction.id}
                                            transaction={transaction}
                                            onEdit={handleEditTransaction}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {editingTransaction && (
                <TransactionForm
                    transaction={editingTransaction}
                    onCancel={handleCancelEdit}
                    onTransactionUpdate={handleTransactionUpdate}
                />
            )}
        </div>
    );
};

export default MerchantTransactions;