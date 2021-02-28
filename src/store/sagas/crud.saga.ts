import {put, takeEvery} from 'redux-saga/effects';
import {CRUD_EXECUTE, CRUDExecuteActionType, setDataAction, setErrorAction} from "../action/global.actions";
import {http} from "src/lib";
import {Modal} from 'antd';
import {AxiosError} from 'axios';

const errorType = {
    400: 'درخواست نا مناسب ۴۰۰',
    404: 'اطلاعات مورد نظر یافت نشد ۴۰۴',
    401: 'اطلاعات احراز هویت شما صحیح نمی باشد',
    403: 'اجازه دسترسی به اطلاعات را ندارید',
    406: 'اطلاعات ارسالی قابل قبول نمی باشد',
    422: 'اطلاعات ارسالی صحیح نمی باشد',
    500: 'مشکل داخلی به وجود آمده است'
}

function* crud({url, multipart = false, action, method, name, data}: CRUDExecuteActionType) {
    let headers: any = {};

    if (multipart) {
        headers['Content-Type'] = 'multipart/form-data'
        const old_data = data;
        data = new FormData();
        Object.entries(old_data).forEach((value, index, array) => {
            data.append(value[0], value[1]);
        })
    }
    try {
        const response: any = yield http.request({
            url,
            data,
            method,
            headers
        });
        yield put(setDataAction(name, action, response.data));
    } catch (e) {
        const error = e as AxiosError;
        let title = errorType[error.response!.status! as keyof typeof errorType];
        yield put(setErrorAction(name, action, {
            code: error.response!.status!,
            message: error.response?.data.detail || ''
        }))
        Modal.error({
            title,
            content: error.response?.data.detail || '',
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


export default takeEvery(CRUD_EXECUTE, crud);