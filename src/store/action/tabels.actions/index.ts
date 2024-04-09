import {CRUDExecuteActionType, CRUDSetDataActionType, CRUDSetErrorActionType} from "../global.actions";
import {LogoutTypeAction} from "../auth.actions";


export * from './project-team.action';
export * from './baseline.action';
export * from './project.action';
export * from './attendance.action';
export * from './calendar.action';
export * from './feature.action';
export * from './user-type.action';

export type UserActionsType = CRUDExecuteActionType | CRUDSetDataActionType | CRUDSetErrorActionType | LogoutTypeAction;