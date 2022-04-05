import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { createTicket, reset } from '../features/tickets/ticketSlice';

import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';



export const NewTicket: FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { isError, isLoading, isSuccess, message } = useAppSelector((state) => state.ticket);

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }

        dispatch(reset());
    }, [isError, isSuccess, dispatch, navigate, message]);


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ticketData = {
            product,
            description
        };
        dispatch(createTicket(ticketData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url='/' />
            <section className='heading'>
                <h1>Create new Ticket</h1>
                <p>Please fill out form bellow</p>
            </section>

            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer Name</label>
                    <input type="text" className='form-control' value={name} disabled />
                </div>

                <div className='form-group'>
                    <label htmlFor='name'>Customer Email</label>
                    <input type="text" className='form-control' value={email} disabled />
                </div>

                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Product</label>
                        <select name='product' id='product' onChange={(e) => setProduct(e.target.value)}>
                            <option value='iPhone'>iPhone</option>
                            <option value='iPad'>iPad</option>
                            <option value='iMac'>iMac</option>
                            <option value='MacBook Pro'>MacBook Pro</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='description'>Description of the issue</label>
                        <textarea
                            name='description' id='description' className='form-control'
                            placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
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