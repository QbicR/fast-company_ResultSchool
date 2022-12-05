import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ data, colomns }) => {

    const renderContent = (item, colomn) => {
        if (colomns[colomn].component) {
            const component = colomns[colomn].component
            if (typeof component === 'function') {
                return component(item)
            }
            return component
        }
        return _.get(item, colomns[colomn].path)
    }

    return (
        <tbody>
            {data.map((item) =>
                <tr key={item._id}>
                    {Object.keys(colomns).map((colomn) => (
                        <td key={colomn}>
                            {renderContent(item, colomn)}
                        </td>
                    ))}
                </tr>)}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    colomns: PropTypes.object.isRequired
}



export default TableBody;