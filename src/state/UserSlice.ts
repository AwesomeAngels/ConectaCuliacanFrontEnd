import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { type IUserStore} from "../interfaces.ts";

const initialState : IUserStore = {
    name: "",
    ap: "",
    am: "",
    email: "",
    birth: null,
    cp: "",
    city: "",
    col : '',
    phone: "",
    isLoggedIn: false as boolean,
}
export const UserSlice = createSlice({
    name : "UserSlice",
    initialState,
    reducers : {
        setUserSlice: (state : IUserStore, action : PayloadAction<IUserStore>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const { setUserSlice } = UserSlice.actions;

export default UserSlice.reducer;