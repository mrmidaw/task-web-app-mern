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
            });
    }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;