import React from 'react';
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, colomns }) => {

    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    };

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(colomns).map((colomn) => (
                    <th
                        key={colomn}
                        onClick={
                            colomns[colomn].path
                                ? () => handleSort(colomns[colomn].path)
                                : undefined}
                        {...{ role: colomns[colomn].path && 'button' }}
                        scope="col"
                    >
                        {colomns[colomn].name}{" "}
                        {renderSortArrow(selectedSort, colomns[colomn].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object,
    colomns: PropTypes.object
}

export default TableHeader;