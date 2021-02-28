import {CustomerType} from "./customer.type";

export type UserType = {
    id: number;
    first_name?: string;
    last_name?: string;
    username: string;
    weight?: number;
    // nationalID?: string;
    // mobileNumber?: string;
    // email: string;
    grade?: 'admin' | 'manager' | 'employer';
    customer?: CustomerType;
    // profilePic?: string;
}