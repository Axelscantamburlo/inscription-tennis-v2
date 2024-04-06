import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const adminKey = localStorage.getItem('admin')
    return adminKey ? children : <Navigate to='/connexion-admin' />
};

export default PrivateRoute;