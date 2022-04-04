import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Get user from localStorage 
const localUser = JSON.parse(localStorage.getItem('user') || '');


interface IAuthState {
    user: string | null;
    isError: boolean;
    isSuccess: boolean,
    isLoading: boolean,
    message: any | string;
}

const initialState: IAuthState = {
    user: localUser ? localUser : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const register = createAsyncThunk(
    'auth/register',
    async (user: Record<string, unknown>, thunkAPI) => {
        try {
            const response = await axios.post('/api/users', user);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error: any) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Register new user
export const login = createAsyncThunk(
    'auth/login',
    async (user: Record<string, unknown>, thunkAPI) => {
        console.log(user);
    }
);

// Login user
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;