import {CRUDType, ProjectTeamType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {PROJECT_TEAM_URL} from "src/URLS";


export function projectTeamCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: ProjectTeamType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'project_team',
                method: 'GET',
                url: `${PROJECT_TEAM_URL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'project_team',
                method: 'GET',
                url: `${PROJECT_TEAM_URL}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'project_team',
                method: 'POST',
                url: `${PROJECT_TEAM_URL}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'project_team',
                method: 'PATCH',
                url: `${PROJECT_TEAM_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'project_team',
                method: 'DELETE',
                url: `${PROJECT_TEAM_URL}/${id}`,
                data: id!,
            });


    }
}
