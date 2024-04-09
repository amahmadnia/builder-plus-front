import {CRUDType, CalendarType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {CALENDAR_TYPE} from "src/URLS";


export function calendarCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: CalendarType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'calendar',
                method: 'GET',
                url: `${CALENDAR_TYPE}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'calendar',
                method: 'GET',
                url: `${CALENDAR_TYPE}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'calendar',
                method: 'POST',
                url: `${CALENDAR_TYPE}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'calendar',
                method: 'PATCH',
                url: `${CALENDAR_TYPE}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'calendar',
                method: 'DELETE',
                url: `${CALENDAR_TYPE}/${id}`,
                data: id!,
            });


    }
}
