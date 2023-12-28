import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBasketDevice } from "../../types/models/IBasketDevice";
import { addToBasket, deleteDevice, getDevices } from "../action creators/basketActions";

interface IBasketState {
    id: number;
    devices: IBasketDevice[];
    isLoading: boolean;
    error: string | null;
}

const initialState: IBasketState = {
    id: 0,
    devices: [],
    isLoading: false,
    error: null
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getDevices.pending.type, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDevices.fulfilled.type, (state, action: PayloadAction<IBasketDevice[]>) => {
                state.isLoading = false;
                state.devices = action.payload;
                state.id = action.payload[0]?.basketId;
                state.error = null;
            })
            .addCase(getDevices.rejected.type, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addToBasket.pending.type, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToBasket.fulfilled.type, (state, action: PayloadAction<IBasketDevice>) => {
                state.isLoading = false;
                state.devices = state.devices.find(device => device.deviceId === action.payload.deviceId) ? state.devices : [...state.devices, action.payload];
                state.error = null;
            })
            .addCase(addToBasket.rejected.type, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteDevice.pending.type, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDevice.fulfilled.type, (state, action: PayloadAction<IBasketDevice>) => {
                state.isLoading = false;
                state.devices = state.devices.filter(device => device.deviceId !== action.payload.deviceId);
                state.error = null;
            })
            .addCase(deleteDevice.rejected.type, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
});

export default basketSlice.reducer;