import {CRUDType, UserTypeType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {USER_TYPE_URL} from "src/URLS";


export function userTypeCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: UserTypeType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'user_type',
                method: 'GET',
                url: `${USER_TYPE_URL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'user_type',
                method: 'GET',
                url: `${USER_TYPE_URL}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'user_type',
                method: 'POST',
                url: `${USER_TYPE_URL}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'user_type',
                method: 'PATCH',
                url: `${USER_TYPE_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'user_type',
                method: 'DELETE',
                url: `${USER_TYPE_URL}/${id}`,
                data: id!,
            });


    }
}
