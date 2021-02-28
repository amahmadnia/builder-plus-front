import {MethodType, StatusType} from "src/types";
import {TablesReducerTypes} from '../reducers/tabels.reducer/tables-reducer.types';

export const SET_STATUS = '[global Actions] Set Status';
export type SetStatusActionType = {
    type: typeof SET_STATUS,
    payload: StatusType,
    action: string,
};

export function setStatusAction(actionType: string, status: StatusType): SetStatusActionType {
    return {
        type: SET_STATUS,
        action: actionType,
        payload: status,
    }
}


export const CRUD_EXECUTE = '[global Actions] Crud Execute';

export interface CRUDExecuteActionType {
    type: typeof CRUD_EXECUTE;
    method: MethodType;
    name: keyof TablesReducerTypes;
    action: 'LIST' | 'GET' | 'PATCH' | 'POST' | 'DELETE';
    url: string;
    data?: any;
    multipart?: boolean;
}

export const CRUD_SET_DATA = '[global Actions] Set Data';

export interface CRUDSetDataActionType {
    type: typeof CRUD_SET_DATA,
    name: string,
    action: string,
    data: any;
};

export function setDataAction(name: string, action: string, data: any): CRUDSetDataActionType {
    return {
        type: CRUD_SET_DATA,
        name,
        action,
        data
    }
}


export const CRUD_SET_ERROR = '[global Actions] Set Error';

export interface CRUDSetErrorActionType {
    type: typeof CRUD_SET_ERROR,
    name: string;
    action: string;
    payload: {
        message: string,
        code: number,
        errors?: { [key: string]: string }
    };
};

export function setErrorAction(name: string, action: string, {
    code,
    message,
    errors
}: { code: number, message: string, errors?: { [key: string]: string } }): CRUDSetErrorActionType {
    return {
        type: CRUD_SET_ERROR,
        payload: {
            code,
            message,
            errors
        },
        name,
        action
    }
}



