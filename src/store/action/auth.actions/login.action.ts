import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {LOGIN_URL, SELF_URL} from "src/URLS";
import {PermissionsType, UserType} from "src/types";
import {setStatusAction} from "../global.actions";
import {Modal} from "antd";

export const LOGIN = '[auth reducer] Login Action';
export type LoginType = { type: typeof LOGIN, payload: { token: string, user: UserType, permissions: PermissionsType } }

export function loginAction({username, password, remember}: { username: string, password: string, remember: boolean }) {
    return async (dispatch: Dispatch) => {
        dispatch(setStatusAction(LOGIN, "loading"));
        try {
            const response = await axios.post(LOGIN_URL, {username, password});
            const response2 = await axios.get(SELF_URL, {headers: {'Authorization': `JWT ${response.data.token}`}});
            response.data.user = response2.data;
            if (remember)
                localStorage.setItem('auth_data', JSON.stringify(response.data));
            dispatch({type: LOGIN, payload: response.data});
        } catch (e) {
            const error = e as AxiosError;
            dispatch(setStatusAction(LOGIN, "error"))
            Modal.error({
                title: error.response?.status === 400 ? 'اطلاعات وارد شده صحیح نمیباشد' : 'مشکل نامشخی به وجود آمده است.',
                direction: 'rtl',
                bodyStyle: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                    flexFlow: 'wrap',
                    direction: 'rtl'
                },
            });
        }

    }
}