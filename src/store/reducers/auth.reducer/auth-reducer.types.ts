import {ErrorMessageType, StatusType, UserType} from "src/types";

export interface AuthReducerType {
    message?: ErrorMessageType;
    status?: StatusType;
    token?: string;
    user?: UserType;
    permissions?: { [key: string]: object };
    project?: number;
}