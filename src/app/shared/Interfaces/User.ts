import { Status } from "../Enums/status.enum";

export interface IUser {

    // Name of user
    Name: string;

    // Email of User
    Email: string;

    // Birthday of User
    Birthday: string;

    // Status of user account 
    Status: Status;

    // Password of user account
    Password: string;
}