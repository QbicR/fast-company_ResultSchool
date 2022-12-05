import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuthErrors, logIn } from '../../store/users';
import { validator } from '../../utils/validator';
import CheckboxField from '../common/form/CheckboxField';
import TextField from '../common/form/TextField';

const LoginForm = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    })
    const loginError = useSelector(getAuthErrors())
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

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
        },
        password:
        {
            isRequired:
                { message: "Поле обязательно для заполнения" }
        },
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
        dispatch(logIn({ payload: data }))
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
                label='Password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckboxField
                value={data.stayOn}
                onChange={handleChange}
                name='stayOn'>
                Оставаться в системе
            </CheckboxField >
            {loginError && <p className='text-danger'>{loginError}</p>}
            <button
                type='submit'
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto mb-2'>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;