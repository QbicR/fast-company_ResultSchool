import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
    const { error, inizialize, progress, status } = useMockData()

    const handleClick = () => {
        inizialize()
    }

    return (
        <div className='container mt-5'>
            <h1>
                Main page
            </h1>
            <h3>Инициальзация данных в fireBase</h3>
            <ul>
                <li>status: {status}</li>
                <li>progress: {progress}%</li>
                {error && <li>error: {error}</li>}
            </ul>
            <button
                className="btn btn-primary"
                onClick={handleClick}
            >
                Инициализация
            </button>
        </div>
    );
};

export default Main;