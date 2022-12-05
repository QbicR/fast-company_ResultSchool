import React from "react";

const seachStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number >= 5 && number <= 14) return "человек встретятся";
        if (number >= 2 && number <= 4) return "человека встретятся";
        if (number.toString().slice(-1) === "1") return "человек встретится";
        return "человек встретятся"
    };

    return (
        <h3>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `${length} ${renderPhrase(length)} с тобой`
                    : "Никто не встретится с тобой"}
            </span>
        </h3>
    );
};

export default seachStatus;
