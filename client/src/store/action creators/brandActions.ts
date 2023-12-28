import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { IBrandGetResponse } from "../../types/actions/brand";
import { IBrand } from "../../types/models/IBrand";

export const createBrand = createAsyncThunk(
    "brand/create",
    async (brandName : string, thunkAPI) => {
        try {
            const response = await $api.post<IBrand>("/brand", { name: brandName } );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getBrands = createAsyncThunk(
    "brand/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await $api.get<IBrandGetResponse>("/brand");
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);