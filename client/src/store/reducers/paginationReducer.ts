import { createSlice } from "@reduxjs/toolkit";

interface IPaginationState {
    page: number;
    limit: number;
}

const initialState : IPaginationState = {
    page: 1,
    limit: 4,
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setLimit(state, action) {
            state.limit = action.payload;
        },
    }
});

const paginationReducer = paginationSlice.reducer;

export default paginationReducer;