import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-star" + (status ? "-fill" : "")}></i>
        </button>
    );
};

export default BookMark;

BookMark.propTypes = {
    status: PropTypes.bool
};
