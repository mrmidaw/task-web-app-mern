import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Get user from localStorage 
const localUser = JSON.parse(localStorage.getItem('user') || '{}');

// Logout use
const logoutLocalUser = () => localStorage.removeItem('user');

interface IAuthState {
    user: any;
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

// Register new user
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

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (user: Record<string, unknown>, thunkAPI) => {
        try {
            const response = await axios.post('/api/users/login', user);
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

// Logout user
export const logout = createAsyncThunk(
    'auth/logout', async () => {
        await logoutLocalUser();
    }
);

// Reducer
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
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;