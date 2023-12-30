import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api";
import { IDevice } from "../../types/models/IDevice";
import { IInfo } from "../../types/models/IInfo";

interface IInfos extends IInfo {
    deviceId: number;
}

interface IGetDeviceParams {
    typeId: number | null;
    brandId: number | null;
    limit: number;
    page: number;
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
    async (data: IGetDeviceParams | null, thunkAPI) => {
        try {
            const response = await $api.get("/device", { params: { ...data } });
            const infos = response.data.infos as IInfos[];

            const devices = response.data.devices.rows as IDevice[];
            const count = response.data.devices.count;
            const updated = devices.map(device => ({ ...device, info: infos.filter(info => info.deviceId === device.id) }));
            
            return { devices: updated, count };
        } catch (e: any) {
            thunkAPI.rejectWithValue(e.response.data.message);
        }

    }
);