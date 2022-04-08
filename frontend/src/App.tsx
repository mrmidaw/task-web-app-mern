import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NewTicket } from './pages/NewTicket';
import { Tickets } from './pages/Tickets';
import { Ticket } from './pages/Ticket';

import { Header } from './components/Header';
import { PrivateRoute } from './components/PrivateRoute';


export const App: FC = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/new-ticket" element={<PrivateRoute />} >
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>

          <Route path="/tickets" element={<PrivateRoute />} >
            <Route path="/tickets" element={<Tickets />} />
          </Route>

          <Route path="/ticket/:ticketId" element={<PrivateRoute />} >
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;