import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './UserProvider';

export function LogOut() {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const Logout = async () => {
            await logout();
            navigate('/');
        };
        Logout();
    }, []);
}