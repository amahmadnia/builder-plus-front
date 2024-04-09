import {CRUDType, AttendanceType} from "src/types";
import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {ATTENDANCE_URL} from "src/URLS";


export function attendanceCRUDAction
({data, type, id}: {
    type: CRUDType;
    data?: AttendanceType & { id?: number };
    id?: number;
}) {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        if (type === 'one')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'GET',
                name: 'attendance',
                method: 'GET',
                url: `${ATTENDANCE_URL}/${id}`
            });
        else if (type === 'list')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'LIST',
                name: 'attendance',
                method: 'GET',
                url: `${ATTENDANCE_URL}`
            });
        else if (type === 'new')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'POST',
                name: 'attendance',
                method: 'POST',
                url: `${ATTENDANCE_URL}`,
                data
            });
        else if (type === 'edit')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'PATCH',
                name: 'attendance',
                method: 'PATCH',
                url: `${ATTENDANCE_URL}/${id}`,
                data
            });
        else if (type === 'delete')
            dispatch({
                type: CRUD_EXECUTE,
                action: 'DELETE',
                name: 'attendance',
                method: 'DELETE',
                url: `${ATTENDANCE_URL}/${id}`,
                data: id!,
            });


    }
}
