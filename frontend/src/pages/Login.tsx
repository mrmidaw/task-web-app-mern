import React, { FC, useEffect, useState } from 'react';
import { BiLogInCircle } from 'react-icons/bi';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login, reset } from '../features/auth/authSlice';

import { useNavigate } from 'react-router-dom';

import { Spinner } from '../components/Spinner';
import { toast } from 'react-toastify';

interface IForm {
    email: string;
    password: string;
}

export const Login: FC = () => {
    const [formData, setFormData] = useState<IForm>({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // Redirect when logged in 
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <h1><BiLogInCircle />Login</h1>
                <p>Please log in to get support</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className='form-group'>
                        <input
                            className='form-control' type='email' name='email' id='email' value={email}
                            onChange={onChange} placeholder='Enter your email' required
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            className='form-control' type='password' name='password' id='password' value={password}
                            onChange={onChange} placeholder='Enter password' required
                        />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};