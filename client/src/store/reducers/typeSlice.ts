import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IType } from "../../types/models/IType";
import { getTypes, createType } from "../action creators/typeActions";

interface ITypeState {
    types: IType[],
    selectedType: IType | null;
    isLoading: boolean;
    error: string | null;
}

const initialState : ITypeState = {
    types: [],
    selectedType: null,
    isLoading: false,
    error: null
}

export const typeSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        selectType(state, action) {
            state.selectedType = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getTypes.pending.type, state => {
            state.isLoading = true;
        })
        .addCase(getTypes.fulfilled.type, (state, action : PayloadAction<IType[]>) => {
            state.isLoading = false;
            state.error = null;
            state.types = [...action.payload];
        })
        .addCase(getTypes.rejected.type, (state, action : PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(createType.pending.type, state => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createType.fulfilled.type, (state, action : PayloadAction<IType>) => {
            console.log("Action", action.payload);
            state.isLoading = false;
            state.error = null;
            state.types = [...state.types, action.payload];
            
        })
        .addCase(createType.rejected.type, (state, action : PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        
    }
});

export default typeSlice.reducer;