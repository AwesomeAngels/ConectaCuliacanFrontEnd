import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {type IApiResponse, type IUserStore} from "../../interfaces.ts";
import { IUser } from "../../interfaces.ts";
export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl : `${import.meta.env.VITE_API_URL}`,
        credentials: 'include',
        },
    ),
    endpoints: (build) => ({
        getColByCp: build.query<IApiResponse<string[]>, {city: string, cp: string}>({
            query: ({ city, cp }) => `/direct/${city}/${cp}`,
        }),
        createUser: build.mutation<IApiResponse<IUser>, IUser>({
            query: (user) => ({
                url: 'auth/createUser',
                method: "POST",
                body: user
            })
        }),
        verifyEmail: build.query<IApiResponse<string>,string>({
            query: (email) => `/auth/validateEmail/${email}`,
        }),
        verifyPhone: build.query<IApiResponse<string>, string>({
            query: (phone) => `/auth/validatePhone/${phone}`
        }),
        verifyUser: build.mutation<IApiResponse<IUserStore>, {token : string, email : string}>({
            query: ({token, email},) => ({
                url: 'auth/verify',
                method: "PUT",
                body: {token, email}
            })
        }),
        resetPassword: build.mutation<IApiResponse<void>, {token: string, password: string}>({
            query: ({token, password}) => ({
                url: 'auth/resetPassword',
                method: "PUT",
                body: {token, password}
            })
        }),
        logUser: build.mutation<IApiResponse<IUserStore>, {email : string, password: string}>({
            query: ({email,password}) => ({
                url: 'auth/logUser',
                method: "POST",
                body: {email,password},
                credentials: "include"
            })
        }),
        logOutUser: build.mutation<IApiResponse<void>, void>({
            query: () => ({
                url: 'auth/logOutUser',
                method: "POST",
                credentials: "include"
            })
        }),
        getUserByToken: build.query<IApiResponse<void>,string>({
            query: (token) => `/auth/userByToken/${token}`,
        }),
        getSession: build.query<IApiResponse<IUserStore>,void>({
            query: () => ({
                url: 'session/getUserSession',
                method: "GET",
                credentials: "include"
            })
        }),
        sendRecoverToken: build.mutation<IApiResponse<null>, string>({
            query: (email) => ({
                url: 'auth/recoverSend',
                method: "PUT",
                credentials: "include",
                body: {email}
            })
        })
    }),
})
//Some fields might be added in admin panel...
export const {
    useGetSessionQuery,
    useLogOutUserMutation,
    useLazyGetColByCpQuery,
    useCreateUserMutation,
    useLogUserMutation,
    useLazyVerifyEmailQuery,
    useLazyVerifyPhoneQuery,
    useVerifyUserMutation,
    useSendRecoverTokenMutation,
    useResetPasswordMutation,
    useLazyGetUserByTokenQuery
} = authApi;