// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default PublicRoute;
