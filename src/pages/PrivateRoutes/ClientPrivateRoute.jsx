import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// CONTEXT
import { UidUserConnected } from '../../context/UidUserConnected';

const ClientPrivateRoute = ({children}) => {
    const userKey = localStorage.getItem('user')
    return userKey ? children : <Navigate to='/' />
};

export default ClientPrivateRoute;