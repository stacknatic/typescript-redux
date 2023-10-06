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
        geo:  {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name:string;
        catchPhrase: string;
        bs: string;
    }
}

export interface Album {
    userId: number;
    id: number;
    title: string;
}

interface UsersState {
    // Below is an array of User objects that are type defined.
    data: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    usersAlbums: Album[];
}

const initialState: UsersState = {
    data: [],
    status: 'idle',
    error: null,
    usersAlbums: [],
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

export const getUserAlbums = createAsyncThunk('users/getUserAlbums', async (userId: number) => {
    const response = await axios.get<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    return response.data;
});

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
            state.error = action.error.message ?? "Something went wrong.";
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(getUserAlbums.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getUserAlbums.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.usersAlbums = action.payload;
        })
        .addCase(getUserAlbums.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Something went wrong.";
        })
    },

});

export default usersSlice.reducer;