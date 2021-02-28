import {TablesReducerTypes} from "./tables-reducer.types";
import {tablesReducerInit} from "./tables-reducer.init";
import {LOGOUT, UserActionsType} from '../../action'
import {CRUD_EXECUTE, CRUD_SET_DATA, CRUD_SET_ERROR} from "../../action/global.actions";

export function tablesReducer(state: TablesReducerTypes = tablesReducerInit(), action: UserActionsType) {
    switch (action.type) {
        case CRUD_EXECUTE:
            if (Object.keys(state).includes(action.name))
                return {
                    ...state,
                    [action.name]: {
                        ...state[action.name as keyof TablesReducerTypes],
                        [action.action]: {status: 'loading', data: action.data}
                    }
                }
            return state;
        case CRUD_SET_DATA:
            if (Object.keys(state).includes(action.name))
                switch (action.action) {
                    case 'GET':
                    case 'LIST':
                    case 'POST':
                    case  'PATCH':
                        return {
                            ...state,
                            [action.name]: {
                                ...state[action.name as keyof TablesReducerTypes],
                                [action.action]: {
                                    status: 'ok',
                                    data: action.data
                                }
                            }
                        }
                    case 'DELETE': {
                        const name: keyof TablesReducerTypes = action.name as keyof TablesReducerTypes;
                        return {
                            ...state,
                            [name]: {
                                ...state[name],
                                DELETE: {
                                    ...state[name].DELETE,
                                    status: 'ok',
                                },
                                LIST: {
                                    ...state[name].LIST,
                                    //@ts-ignore
                                    data: state[name].LIST?.data?.filter(value => value.id !== +state[name].DELETE.data),
                                },
                            }
                        }
                    }
                }
            return state
        case CRUD_SET_ERROR:
            if (Object.keys(state).includes(action.name))
                return {
                    ...state,
                    [action.name]: {
                        ...state[action.name as keyof TablesReducerTypes],
                        [action.action]: {status: 'error', ...action.payload}
                    }
                }
            return state;
        case LOGOUT:
            return tablesReducerInit();
        default:
            return state;
    }
}