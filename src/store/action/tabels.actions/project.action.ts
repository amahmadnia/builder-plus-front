import {ProjectType, CRUDType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {PROJECT_UEL} from "src/URLS";


export function projectCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: ProjectType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'project',
                method: 'GET',
                url: `${PROJECT_UEL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'project',
                method: 'GET',
                url: `${PROJECT_UEL}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'project',
                method: 'POST',
                url: `${PROJECT_UEL}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'project',
                method: 'PATCH',
                url: `${PROJECT_UEL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'project',
                method: 'DELETE',
                url: `${PROJECT_UEL}/${id}`,
                data: id!,
            });


    }
}
