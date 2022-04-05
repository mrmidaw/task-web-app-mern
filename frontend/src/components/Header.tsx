import React, { FC } from 'react';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {  logout, reset } from '../features/auth/authSlice';

export const Header: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);

    const onLogOut = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                {user ?
                    (<li>
                        <button className='btn' onClick={onLogOut}>
                            <BiLogOutCircle /> Logout
                        </button>
                    </li>)
                    :
                    (<>
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
                    </>)
                }
            </ul >
        </div >
    );
};