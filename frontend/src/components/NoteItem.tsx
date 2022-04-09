import React, { FC } from 'react';

import { useAppSelector } from '../store/store';

interface INote {
    _id: string;
    user: string;
    ticket: string;
    text: string;
    isStaff: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IProps {
    note: INote
}


export const NoteItem: FC<IProps> = ({ note }) => {

    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className='note' style={{
            backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
            color: note.isStaff ? '#fff' : '#000',
        }}>
            <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
            <p>{note.text}</p>
            <div className='note-date'>
                {new Date(note.createdAt).toLocaleString('en-us')}
            </div>
        </div>
    );
};