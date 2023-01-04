import { StatusEnum } from "../shared/Enums/status.enum";

export interface User {
    // Name of user
    Name: string;

    // Email of User
    Email: string;

    // Birthday of User
    Birthday: string;

    // Status of user account 
    Status: StatusEnum;

    // Password of user account
    Password: string;
}

export interface UserPutModel {

    // id of user
    id?: string;

    // Name of user
    name: string;

    // Email of User
    email: string;

    // Birthday of User
    birthday: string;

    // Status of user account 
    status: StatusEnum;

    // Password of user account
    password: string;
}