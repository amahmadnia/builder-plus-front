import {StatusType} from "./status.type";

type RequestType<D extends object> = {
    status: StatusType;
    data?: D;
    message?: string;
    code?: number;
    errors?: { [key: string]: string }
}
export type CRUDReducerType<R extends object = {},
    L extends object = {},
    C extends object = {},
    U extends object = {},
    D extends object = {}> = {
    GET?: RequestType<R>;
    LIST?: RequestType<L>;
    POST?: RequestType<C>;
    PATCH?: RequestType<U>;
    DELETE?: RequestType<D>;
}