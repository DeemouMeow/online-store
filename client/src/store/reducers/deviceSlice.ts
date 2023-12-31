import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDevice } from "../../types/models/IDevice";
import { createDevice, getDevices } from "../action creators/deviceActions";

interface IDeviceState {
    devices: IDevice[];
    count: number;
    error: string | null;
    isLoading: boolean;
}

const initialState: IDeviceState = {
    devices: [],
    count: 0,
    error: null,
    isLoading: false
};

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(createDevice.pending.type, state => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createDevice.fulfilled.type, (state, action: PayloadAction<IDevice>) => {
            state.isLoading = false;
            state.error = null;
            state.devices = [...state.devices, action.payload]; // probably need to be a comment*
        })
        .addCase(createDevice.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(getDevices.pending.type, state => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getDevices.fulfilled.type, (state, action: PayloadAction<{devices: IDevice[], count: number}>) => {
            state.isLoading = false;
            state.error = null;
            state.devices = action.payload.devices;
            state.count = action.payload.count;
        })
        .addCase(getDevices.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

const deviceReducer = deviceSlice.reducer;

export default deviceReducer;