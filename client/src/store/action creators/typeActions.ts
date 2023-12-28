import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { ITypeGetResponse } from "../../types/actions/type";
import { IType } from "../../types/models/IType";

export const createType = createAsyncThunk(
    "type/create",
    async (typeName : string, thunkAPI) => {
        try {
            const response = await $api.post<IType>("/type", { name: typeName } );
            return response.data as IType;
        } catch (e) {
            return thunkAPI.rejectWithValue("Create type Error");
        }
    }
);

export const getTypes = createAsyncThunk(
    "type/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await $api.get<ITypeGetResponse>("/type");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Get types Error");
        }
    }
);