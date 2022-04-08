import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';

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

export const Ticket: FC = () => {

    const { ticket, isLoading, isError, message } = useAppSelector((state) => state.tickets);
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
    }, [dispatch, isError]);

    // Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Close');
        navigate('/tickets');
    };


    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        <h3>Something going wrong</h3>;
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>

                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-us')}
                </h3>

                <h3>
                    Product: {ticket.product}
                </h3>
                <hr />

                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            {ticket.status == 'new' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose} >
                    Close Ticket
                </button>
            )}
        </div>
    );
};