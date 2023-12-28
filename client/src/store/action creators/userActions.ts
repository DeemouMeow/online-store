import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { IAuthParams, IAuthResponse, ILogoutResponse } from "../../types/actions/user";

export const registration = createAsyncThunk(
    "user/registration",
    async (data : IAuthParams, thunkAPI) => {
        try {
            const response = await $api.post<IAuthResponse>("/user/registration", data, { withCredentials: true });
            
            localStorage.setItem("token", response.data.tokens.accessToken);
            localStorage.setItem("current_user", JSON.stringify(response.data.user));

            return response.data.user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (data : IAuthParams, thunkAPI) => {
        try {
            const response = await $api.post<IAuthResponse>("/user/login", data, { withCredentials: true });

            localStorage.setItem("token", response.data.tokens.accessToken);
            localStorage.setItem("current_user", JSON.stringify(response.data.user));

            return response.data.user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (data, thunkAPI) => {
        try {
            const response = await $api.post<ILogoutResponse>("/user/logout", {}, { withCredentials: true });

            localStorage.removeItem("token");
            localStorage.removeItem("current_user");

            return response.data.user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);