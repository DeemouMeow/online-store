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
            const response = await $api.post("/device", data);
            
            return response.data.device;
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
            console.log("Response", response);
            
            return updated;
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }

    }
);