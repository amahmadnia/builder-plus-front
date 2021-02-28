import axios, {AxiosRequestConfig, AxiosResponse,AxiosError} from 'axios';
import {rootStore} from 'src/store';

export default {
    headers() {
        const {
            authReducer: {
                token,
                status
            },
        } = rootStore.getState();
        const header: any = {};
        if (token && status === 'ok') {
            header.Authorization = 'JWT ' + token;
        }
        return header;
    },

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        config = {...config, headers: {...(config.headers ? config.headers : {}), ...this.headers()}};
        return axios.request(config);
    },
};
