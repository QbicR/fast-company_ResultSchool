import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const ProtectedRoutes = ({ element: Element, children }) => {

    const isLoggedIn = useSelector(getIsLoggedIn())

    if (!isLoggedIn) {
        return <Navigate to={{
            pathname: '/login',
        }} replace />
    }
    return Element ? <Element /> : children

    // return (
    //     <Routes>
    //         <Route
    //             {...rest}
    //             render={(props) => {
    //                 if (!currentUser) {
    //                     return <Navigate to={'/login'} />
    //                 }
    //                 return Element ? <Element /> : children
    //             }}
    //         />
    //     </Routes>

    // );
};

ProtectedRoutes.propTypes = {
    element: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProtectedRoutes;