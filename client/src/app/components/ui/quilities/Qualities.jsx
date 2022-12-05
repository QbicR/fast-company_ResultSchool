import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ _id, color, name }) => {

    return (
        <span
            className={`badge m-1 bg-${color}`}
            key={_id}
        >
            {name}
        </span>
    )
};

export default Qualities;

Qualities.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
};
