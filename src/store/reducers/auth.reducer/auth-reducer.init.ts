import {AuthReducerType} from "./auth-reducer.types";

export const authReducerInit = (): AuthReducerType => {
    const storage: any = localStorage.getItem('auth_data');
    const project = localStorage.getItem('project');
    const initData: AuthReducerType = storage ? {status: 'ok', ...JSON.parse(storage)} : {
        status: undefined,
    };
    initData['project'] = project ? +project : undefined;

    return initData
}