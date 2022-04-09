import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/store';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as noteReset } from '../features/notes/noteSlice';

import { NoteItem } from '../components/NoteItem';

import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

import { toast } from 'react-toastify';


interface INote {
    _id: string;
    user: string;
    ticket: string;
    text: string;
    isStaff: boolean;
    createdAt: Date;
    updatedAt: Date;
}

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
    const { notes, isLoading: notesIsLoading } = useAppSelector((state) => state.notes);
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [dispatch, isError]);

    // Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Close');
        navigate('/tickets');
    };


    if (isLoading || notesIsLoading) {
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
                <h2>Notes</h2>
            </header>

            {notes.map((note: INote) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status == 'new' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose} >
                    Close Ticket
                </button>
            )}
        </div>
    );
};