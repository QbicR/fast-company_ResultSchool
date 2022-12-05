import React, { useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';

import TextField from '../../common/form/TextField';
import SelectField from '../../common/form/SelectField';
import RadioField from '../../common/form/RadioField';
import MultiSelectField from '../../common/form/MultiSelectField';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import BackHistoryButton from '../../common/BackHistoryButton';
import { useDispatch, useSelector } from 'react-redux';
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities';
import { getCurrentUserData, updateUser } from '../../../store/users';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';


const EditUserPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const currentUser = useSelector(getCurrentUserData())
    const dispatch = useDispatch()
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        dispatch(updateUser({ ...data, qualities: data.qualities.map((q) => q.value) }))
        navigate(`/users/${currentUser._id}`, { replace: true })
    }

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }

    const transformDataQuality = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }))
    };

    const transformData = (data) => {
        return data.map((d) => ({ label: d.name, value: d._id }));
    };

    const trasformQualities = transformData(qualities)
    const trasformProfessions = transformData(professions)

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformDataQuality(currentUser.qualities)
            })
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email:
        {
            isRequired:
                { message: "Поле обязательно для заполнения" },
            isEmail:
                { message: 'Email введен некорректно' }
        },
        name:
        {
            isRequired:
                { message: 'Введите ваше имя' }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 rounded-3">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label='Имя'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label='Электронная почта'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={trasformProfessions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, { name: 'Other', value: 'other' }]}
                                name='sex'
                                onChange={handleChange}
                                value={data.sex}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={trasformQualities}
                                defaultValue={data.qualities}
                                onChange={handleChange}
                                name="qualities"
                                label='Выберите ваши качества'
                            />
                            <button
                                type='submit'
                                disabled={!isValid}
                                className='btn btn-primary w-100 mx-auto mb-2'>
                                Изменить
                            </button>
                        </form>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserPage;