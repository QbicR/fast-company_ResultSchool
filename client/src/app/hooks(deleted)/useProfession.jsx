import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types'
import ProfessionService from '../services/profession.service';
import { toast } from 'react-toastify';

const ProfessionContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionContext)
}

const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [professions, setProfission] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfession()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    function getProfessionById(id) {
        return professions.find((p) => p._id === id)
    }

    async function getProfession() {
        try {
            const { content } = await ProfessionService.get()
            setProfission(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
        setLoading(false)
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfessionById }}
        >
            {children}
        </ProfessionContext.Provider>

    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProfessionProvider;