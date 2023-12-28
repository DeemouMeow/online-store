import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { IBasketDevice } from "../../types/models/IBasketDevice";

export const getDevices = createAsyncThunk(
    "basket/get",
    async (_, thunkAPI) => {
        try {
            const response = await $api.get("/basket");
            return response.data;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const addToBasket = createAsyncThunk(
    "basket/add",
    async (deviceId: number, thunkAPI) => {
        try {
            const response = await $api.post("/basket/append", { deviceId });
            return await response.data;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteDevice = createAsyncThunk(
    "basket/delete",
    async (deviceData: IBasketDevice, thunkAPI) => {
        try {
            const response = await $api.post("/basket/remove", { deviceId: deviceData.deviceId, basketId: deviceData.basketId });
            console.log("Response", response.data);
            console.log("Data", deviceData);
            return deviceData;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }

    }
);