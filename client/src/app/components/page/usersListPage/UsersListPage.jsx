import React, { useState, useEffect } from "react";
import _ from 'lodash'
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/Pagination"
import GroupList from "../../common/GroupList";
import SearchStatus from '../../ui/SeachStatus'
import UsersTable from "../../ui/UsersTable";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const UsersListPage = () => {
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [searchQuery, setSearchQuery] = useState('')
    const pageSize = 8;
    const users = useSelector(getUsersList())

    const currentUserId = useSelector(getCurrentUserId())

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
                return user
            }
            return user;
        })
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handlrProfessionSelect = (item) => {
        setSelectedProf(item)
        if (searchQuery !== '') setSearchQuery('')
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item)
    }

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf

                ? data.filter(
                    (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf._id)
                )
                : data;
        return filteredUsers.filter((user) => user._id !== currentUserId)
    }

    const filteredUsers = filterUsers(users)

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf(undefined)
        setSearchQuery('')
    }

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handlrProfessionSelect}
                    />
                    <button
                        className='btn btn-secondary mt-2'
                        onClick={clearFilter}>
                        Сброс
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <div className="input-group flex-nowrap">
                    <input
                        type='text'
                        name='searchQuery'
                        placeholder='Search...'
                        onChange={handleSearchQuery}
                        value={searchQuery}
                        className="form-control"
                    />
                </div>
                {count > 0 && (
                    <UsersTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark} />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );

};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
