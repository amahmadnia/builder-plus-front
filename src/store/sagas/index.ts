import {all} from 'redux-saga/effects';
import CRUD from './crud.saga';

export default function* AppSaga() {
    yield all([
        CRUD
    ])
}