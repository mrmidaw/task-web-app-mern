import React, { FC, useState } from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login } from '../features/auth/authSlice';

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
    const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.auth);

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