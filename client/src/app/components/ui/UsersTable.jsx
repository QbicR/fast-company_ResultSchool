import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Bookmark from '../common/Bookmark'
import Qualities from './quilities';
import Table from '../common/table';
import Profession from './Profession';

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    ...rest
}) => {
    const colomns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
        },
        qualities: {
            name: 'Качества',
            component: (user) => (<Qualities qualities={user.qualities} />)
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession}
            />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    }

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            colomns={colomns}
            data={users}
        />
    )
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
}

export default UsersTable;