import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { IDevice } from "../../types/models/IDevice";
import { IInfo } from "../../types/models/IInfo";

interface IInfos extends IInfo {
    deviceId: number;
}

export const createDevice = createAsyncThunk(
    "device/create",
    async (data: FormData, thunkAPI) => {
        try {
            console.log("Data", data);
            const response = await $api.post("/device", data);
            console.log("Response", response);
            
            return response.data;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }

    }
);

export const getDevices = createAsyncThunk(
    "device/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await $api.get("/device");
            const infos = response.data.infos as IInfos[];
            
            const devices = response.data.devices.rows as IDevice[];
            const updated = devices.map(device => ({...device, info: infos.filter(info => info.deviceId === device.id)}));
            
            return updated;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }

    }
);