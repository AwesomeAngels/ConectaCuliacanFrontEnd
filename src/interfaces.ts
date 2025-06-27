import { z } from "zod";
import User from "./validation/userValidationSchema.ts";
import LoginValidation from './validation/loginUser.ts'

export interface IApiResponse<T> {
    isValid: boolean;
    message: string;
    data: T;
    errors?: Record<string, string>;
    errorType?: string;
}

export type IUser = z.infer< typeof User>;

export type IUserStore = {
    name: string;
    ap: string;
    am: string;
    email: string;
    birth: Date | null;
    cp: string;
    city: string;
    col: string;
    phone: string;
    isLoggedIn?: boolean;
}

/* Bodys */
export type ILoginBody = z.infer<typeof LoginValidation>

export interface IRecoverBody{
    email: string;
}
export interface IRecoverPassword{
    password: string;
    confirmPassword: string;
}