import React, { FC } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <BiLogInCircle /> Login
                    </Link>
                </li>

                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </ul>
        </div>
    );
};