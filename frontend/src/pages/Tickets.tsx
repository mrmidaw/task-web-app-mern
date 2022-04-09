import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/store';
import { getTickets, reset } from '../features/tickets/ticketSlice';

import { TicketItem } from '../components/TicketItem';

import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

import { toast } from 'react-toastify';

interface ITicket {
    _id: string;
    user: string;
    product: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Tickets: FC = () => {
    const { tickets, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.tickets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch,]);


    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        toast.error(message);
    }

    return (
        <div >
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket: ITicket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};