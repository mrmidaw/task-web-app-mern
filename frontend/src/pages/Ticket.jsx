import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/store';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote, reset as noteReset } from '../features/notes/noteSlice';

import { FaPlusCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';


import { NoteItem } from '../components/NoteItem';

import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';

import { toast } from 'react-toastify';
import Modal from 'react-modal';

const modalCustomStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
    },
};

// Bind modal to element
Modal.setAppElement('#root');


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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState('');

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

    //Open-Close modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    //Submit note form to backend
    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }));
        closeModal();
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

            {ticket.status !== 'close' &&
                <button className='btn' onClick={openModal}>
                    <FaPlusCircle />Add Note
                </button>
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalCustomStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}><AiFillCloseCircle size={22} /></button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea
                            name='noteText' id='note-text' className='form-control' placeholder='Note text'
                            value={noteText} onChange={((e) => setNoteText(e.target.value))}
                        />
                        <button className='btn' type='submit'>Submit</button>
                    </div>
                </form>
            </Modal>

            {
                notes.map((note: INote) => (
                    <NoteItem key={note._id} note={note} />
                ))
            }

            {
                ticket.status == 'new' && (
                    <button className='btn btn-block btn-danger' onClick={onTicketClose} >
                        Close Ticket
                    </button>
                )
            }
        </div >
    );
};