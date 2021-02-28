import {AuthReducerType} from "./auth-reducer.types";
import {authReducerInit} from "./auth-reducer.init";
import {AuthActionType, LOGIN, LOGOUT, PROJECT_SELECT} from "../../action";
import {SET_STATUS} from "../../action/global.actions";


export function authReducer(state: AuthReducerType = authReducerInit(), action: AuthActionType): AuthReducerType {

    switch (action.type) {
        case LOGIN:
            return {...action.payload, status: 'ok'};
        case LOGOUT:
            return authReducerInit();
        case PROJECT_SELECT:
            return {...state, project: action.payload};
        case SET_STATUS:
            switch (action.action) {
                case LOGIN:
                    return {...state, status: action.payload};
            }
        default :
            return state;
    }
}