import { IUser } from "../models/IUser";

export interface IAuthResponse {
    user: IUser;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
}

export interface ILogoutResponse {
    user: IUser;
    token: string;
}

export interface IAuthParams { 
    email: string;
    password: string;
}