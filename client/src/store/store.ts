import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import deviceReducer from "./reducers/deviceSlice";
import brandReducer from "./reducers/brandSlice";
import typeReducer from "./reducers/typeSlice";
import basketReducer from "./reducers/basketSlice";
import paginationReducer from "./reducers/paginationReducer";

const rootReducer = combineReducers({
    userReducer,
    deviceReducer,
    brandReducer,
    typeReducer,
    basketReducer,
    paginationReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];