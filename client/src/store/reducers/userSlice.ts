import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../types/UserState";
import { IUser } from "../../types/models/IUser";
import { login, logout, registration } from "../action creators/userActions";

const initialState : IUserState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        auth(state, action) {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuth = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(registration.pending.type, state => {
            state.error = null;
            state.isLoading = true;
        })
        .addCase(registration.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.error = null;
            state.isAuth = true;
            state.isLoading = false;
            state.user = action.payload;
        })
        .addCase(registration.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(login.pending.type, state => {
            state.error = null;
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.isAuth = true;
            state.error = null;
            state.isLoading = false;
            state.user = action.payload;
        })
        .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(logout.pending.type, state => {
            state.error = null;
            state.isLoading = true;
        })
        .addCase(logout.fulfilled, state => {
            state.error = null;
            state.isAuth = false;
            state.isLoading = false;
            state.user = null;
        })
        .addCase(logout.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        
    }
});

const userReducer = userSlice.reducer;

export default userReducer;