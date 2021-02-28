import React from 'react';
import ReactDOM from 'react-dom';
import 'dayjs/locale/fa'

import {Provider} from 'react-redux';
import {generateStore} from './store'
import {BrowserRouter} from "react-router-dom";
import Pages from "./pages";
import {ConfigProvider} from 'antd';
import fa_IR from 'antd/lib/locale-provider/fa_IR';

import 'antd/dist/antd.css';
import './styles/index.css';
import dayjs from "dayjs";

const jalali = require('jalaliday');

dayjs.extend(jalali.default);
dayjs.extend(require('dayjs/plugin/isToday'))
dayjs.locale('fa_IR');

//@ts-ignore
dayjs.calendar('jalali')

ReactDOM.render(
    <React.Fragment>
        <ConfigProvider direction='rtl' locale={fa_IR}>
            <Provider store={generateStore()}>
                <BrowserRouter>
                    <Pages/>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    </React.Fragment>,
    document.getElementById('root')
);

