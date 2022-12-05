import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckboxField from '../common/form/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { singUp } from '../../store/users';
import { useNavigate } from 'react-router-dom';
import { getProfessions } from '../../store/professions';

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false,
    })

    const qualities = useSelector(getQualities())
    const professions = useSelector(getProfessions())
    const [errors, setErrors] = useState({})

    const qualitiesList = qualities.map((q) => ({ label: q.name, value: q._id }))
    const professionList = professions.map((p) => ({ label: p.name, value: p._id }))

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
                { message: "Имя обязательно для заполнения" },
            minLength:
            {
                message: 'Имя должно быть длиннее 3 символов',
                value: 3
            }
        },
        password:
        {
            isRequired:
                { message: "Поле обязательно для заполнения" },
            isCapitalSymbol:
                { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
            isContainDigit:
                { message: 'Пароль должен содержать хотя бы одну цифру' },
            minLength:
            {
                message: 'Пароль должен быть длиннее 8 символов',
                value: 8
            }
        },
        profession:
        {
            isRequired:
                { message: 'Обязательно выберите вашу профессию' }
        },
        licence:
        {
            isRequired:
                { message: 'Подтвердите лицензионное соглашение' }
        }
    }

    useEffect(() => {
        validate()
        // eslint-disable-next-line
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) }
        dispatch(singUp(newData))
        navigate('/users')
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label='Password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professionList}
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
                options={qualitiesList}
                defaultValue={data.qualities}
                onChange={handleChange}
                name="qualities"
                label='Выберите ваши качества'
            />
            <CheckboxField
                value={data.licence}
                onChange={handleChange}
                name='licence'
                error={errors.licence}>
                Подтверить лицензионное соглашение
            </CheckboxField >
            <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto mb-2'>
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;