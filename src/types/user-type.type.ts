import {UserTypeActionType} from "./user-type-action.type";

export type UserTypeType = {
    id: number;
    title: string;
    type_actions: UserTypeActionType[];
}