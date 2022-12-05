import React from 'react';
import PropTypes from 'prop-types'
import Qualities from './Qualities';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesById, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities';
import { useEffect } from 'react';

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesById(qualities))

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (isLoading) return 'Loading...'

    if (qualities) {
        return <>
            {qualitiesList.map((quality) => (
                <Qualities key={quality._id} {...quality} />
            ))}
        </>
    }

};

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList;