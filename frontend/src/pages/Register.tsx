import React, { FC, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
interface IForm {
    name: string;
    email: string;
    password: string;
    password2: string;
}

export const Register: FC = () => {
    const [formData, setFormData] = useState<IForm>({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not match");
        }

    };

    return (
        <>
            <section className='heading'>
                <h1><FaUser />Register</h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            className='form-control' type='text' name='name' id='name' value={name}
                            onChange={onChange} placeholder='Enter your name' required
                        />
                    </div>

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
                        <input
                            className='form-control' type='password' name='password2' id='password2' value={password2} onChange={onChange} placeholder='Confirm password' required
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