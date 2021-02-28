import {Store, createStore, combineReducers, applyMiddleware, Middleware} from 'redux';
import AppSaga from './sagas'
import createSaga from 'redux-saga';
import thunk from 'redux-thunk';
import * as Reducers from "./reducers";

export type RootStateType = Store<typeof Reducers['initialReducers']>;
export let rootStore: RootStateType;

export const generateStore = () => {

    //create empty middleware list
    const middleware: Middleware[] = [];

    //add saga to middleware
    const saga = createSaga()
    middleware.push(saga);

    //add thunk to middleware
    middleware.push(thunk);

    //combine reducers
    const reducers = combineReducers(Reducers.reducersObject);

    //create store
    const store = createStore(reducers, Reducers.initialReducers, process.env.NODE_ENV === 'development' ?
        require('redux-devtools-extension').composeWithDevTools(applyMiddleware(...middleware))
        : applyMiddleware(...middleware))

    //run saga
    saga.run(AppSaga)

    //@ts-ignore
    rootStore = store;
    return store;
}