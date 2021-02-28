import {BaselineType, CRUDType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {BASELINE_URL} from "src/URLS";


export function baselineCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: BaselineType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'baseline',
                method: 'GET',
                url: `${BASELINE_URL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'baseline',
                method: 'GET',
                url: `${BASELINE_URL}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'baseline',
                method: 'POST',
                url: `${BASELINE_URL}`,
                multipart: true,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'baseline',
                method: 'PATCH',
                url: `${BASELINE_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'baseline',
                method: 'DELETE',
                url: `${BASELINE_URL}/${id}`,
                data: id!,
            });


    }
}
