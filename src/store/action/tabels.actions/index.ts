import {CRUDExecuteActionType, CRUDSetDataActionType, CRUDSetErrorActionType} from "../global.actions";
import {LogoutTypeAction} from "../auth.actions";


export * from './project-team.action';
export * from './baseline.action';
export * from './project.action';

export type UserActionsType = CRUDExecuteActionType | CRUDSetDataActionType | CRUDSetErrorActionType | LogoutTypeAction;