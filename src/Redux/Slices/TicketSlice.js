import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    ticketList: []
};

export const getAllTicketsforTheUser = createAsyncThunk('tickets/getAllTicketsforTheUser', async () => {
    try {
        const response = axiosInstance.get("getMyAssignedTickets", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully loaded all the tickets',
            loading: 'Fetching tickets belonging to you',
            error: 'Something went wrong'
        });
        return await response;
    } catch(error) {
        console.log(error);
        
    }
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsforTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
        });
    }
});

export default ticketSlice.reducer;