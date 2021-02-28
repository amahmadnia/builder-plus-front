import {LoginType} from './login.action'
import {LogoutTypeAction} from './logout.action'
import {SetStatusActionType} from "../global.actions";
import {ProjectSelectActionType} from "./project-select.action";

export * from './login.action';
export * from './logout.action';
export * from './project-select.action';

export type AuthActionType = LoginType | SetStatusActionType | LogoutTypeAction | ProjectSelectActionType