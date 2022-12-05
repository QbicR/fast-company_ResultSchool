import React from 'react';
import { useParams, useLocation } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage';

import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UsersLoader from '../components/ui/HOC/UsersLoader';

const Users = () => {
    const { pathname } = useLocation()
    const params = useParams();
    const userId = params['*']

    return (
        <>
            <UsersLoader>
                {pathname !== `/users`
                    ?
                    (
                        (pathname.includes('/edit'))
                            ?
                            <EditUserPage userId={userId} />
                            :
                            < UserPage userId={userId} />
                    )
                    :
                    <UsersListPage />
                }
            </UsersLoader>
        </>
    );
}

export default Users;