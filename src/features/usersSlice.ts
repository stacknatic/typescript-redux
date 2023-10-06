import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

interface UserState {
    data: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed' 
    error: string | null;
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users/')
    return response.data;
})


const initialState: UserState = {
    data: [],
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? "Something went wrong";
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
    },
});

export default usersSlice.reducer;