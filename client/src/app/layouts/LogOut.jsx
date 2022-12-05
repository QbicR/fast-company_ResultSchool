import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../store/users';

const LogOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logOut())
        navigate('/')
    }, [])

    return (
        <h3>Loading...</h3>
    );
};

export default LogOut;