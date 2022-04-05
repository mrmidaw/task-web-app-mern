import React, { FC } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface IUrl {
    url: string;
}

export const BackButton: FC<IUrl> = ({ url }) => {
    return (
        <Link to={url} className="btn btn-reverse btn-back">
            <FaArrowAltCircleLeft /> Back
        </Link>
    );
};