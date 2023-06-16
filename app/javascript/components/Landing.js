import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
    }, []);

    const getUser = () => {
        axiosInstance.get('/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setUser(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const logoutUser = () => {
        axiosInstance.delete('/users/sign_out', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content // for Rails CSRF protection
                },
            })
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('token');
                    // handle successful logout here
                    console.log('User logged out');
                    setUser(null);
                    navigate('/'); // navigate to the landing page
                }
            })
            .catch(error => {
                console.log('Logout error', error);
            });
    };

    return (
        <div className="container text-center">
            <h1 className="mt-5">Welcome to Payment System</h1>
            {!user && (
                <>
                    <p className="mt-3">
                        <Link className="btn btn-primary me-2" to="/signup">
                            Sign Up
                        </Link>
                        <Link className="btn btn-secondary ms-2" to="/signin">
                            Sign In
                        </Link>
                    </p>
                </>
            )}

            {user && (
                <>
                    <p className="mt-3">
                        <button className="btn btn-danger" onClick={logoutUser}>
                            Logout
                        </button>
                    </p>

                    {user.role === 'merchant' && (
                        <p className="mt-3">
                            <Link className="btn btn-primary mr-2" to="/transactions">
                                Transactions
                            </Link>
                        </p>
                    )}

                    {user.role === 'admin' && (
                        <p className="mt-3">
                            <Link className="btn btn-primary mr-2" to="/merchants">
                                Merchants
                            </Link>
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Landing;
