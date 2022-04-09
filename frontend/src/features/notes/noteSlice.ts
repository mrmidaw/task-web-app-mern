import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface iNoteState {
    notes: [];
    isError: boolean;
    isSuccess: boolean,
    isLoading: boolean,
    message: any | string;
}

const initialState: iNoteState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};


// Get ticket notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (ticketId: string | undefined, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(`/api/tickets/${ticketId}/notes`, config);
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Note Reducer
export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;