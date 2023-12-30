import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBrand } from "../../types/models/IBrand";
import { createBrand, getBrands } from "../action creators/brandActions";

interface IBrandState {
    brands: IBrand[],
    selectedBrand: IBrand | null;
    isLoading: boolean;
    error: string | null;
}

const initialState : IBrandState = {
    brands: [],
    selectedBrand: null,
    isLoading: false,
    error: null
}

export const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        selectBrand(state, action) {
            state.selectedBrand = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getBrands.pending.type, state => {
            state.isLoading = true;
        })
        .addCase(getBrands.fulfilled.type, (state, action : PayloadAction<IBrand[]>) => {
            state.isLoading = false;
            state.error = null;
            state.brands = [...action.payload];
        })
        .addCase(getBrands.rejected.type, (state, action : PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(createBrand.pending.type, state => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createBrand.fulfilled.type, (state, action : PayloadAction<IBrand>) => {
            state.isLoading = false;
            state.error = null;
            state.brands = [...state.brands, action.payload];
        })
        .addCase(createBrand.rejected.type, (state, action : PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        
    }
});

const brandReducer = brandSlice.reducer;

export default brandReducer;