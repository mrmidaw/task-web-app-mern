import React, { FC } from 'react';

import { Link } from 'react-router-dom';

interface ITicket {
    _id: string;
    user: string;
    product: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IProps {
    ticket: ITicket;
}

export const TicketItem: FC<IProps> = ({ ticket }) => {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('en-us')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>
                {ticket.status}
            </div>
            <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
                View
            </Link>
        </div>
    );
};
