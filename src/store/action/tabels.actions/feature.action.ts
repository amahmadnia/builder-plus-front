import {Dispatch} from "redux";
import {CRUD_EXECUTE, CRUDExecuteActionType} from "../global.actions";
import {FEATURE_URL} from "src/URLS";


export function featureCRUDAction() {
    return (dispatch: Dispatch<CRUDExecuteActionType>) => {
        dispatch({
            type: CRUD_EXECUTE,
            action: 'LIST',
            name: 'feature',
            method: 'GET',
            url: `${FEATURE_URL}`
        });

    }

}
