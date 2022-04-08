import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface iTicketState {
    tickets: [];
    ticket: Record<string, never>;
    isError: boolean;
    isSuccess: boolean,
    isLoading: boolean,
    message: any | string;
}

const initialState: iTicketState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData: Record<string, unknown>, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post('/api/tickets/', ticketData, config);
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get('/api/tickets/', config);
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Get user ticket
export const getTicket = createAsyncThunk(
    'ticket/get',
    async (ticketId: string | undefined, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`/api/tickets/${ticketId}`, config);
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Close user ticket
export const closeTicket = createAsyncThunk(
    'ticket/close',
    async (ticketId: string | undefined, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.put(`/api/tickets/${ticketId}`, { status: 'close' }, config);
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets.map((ticket: any) => ticket._id === action.payload._id ? (ticket.status = 'close') : ticket);
            });
    }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;