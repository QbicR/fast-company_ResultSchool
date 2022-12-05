import React from 'react';
import PropTypes from 'prop-types'
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ onSort, selectedSort, colomns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, colomns }} />
                    <TableBody {...{ colomns, data }} />
                </>
            )}
        </table>
    )
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    colomns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
}

export default Table;