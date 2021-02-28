import {authReducer, authReducerInit} from "./auth.reducer";
import {tablesReducer, tablesReducerInit} from './tabels.reducer';
//create reducers object
export const reducersObject = {
    authReducer: authReducer,
    tablesReducer: tablesReducer,
}

//initial reducers
export const initialReducers = {
    authReducer: authReducerInit(),
    tablesReducer: tablesReducerInit(),
}

export * from './auth.reducer';