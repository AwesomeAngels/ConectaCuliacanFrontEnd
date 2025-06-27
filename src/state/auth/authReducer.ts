import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAuthState {
    name: string;
    email: string;
}

const initialState : IAuthState = {
    name: "anonymous",
    email: "",
}
export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setCurrently: (state : IAuthState, action : PayloadAction<string>) => {
          state.email = action.payload;
        }
    }
})

export const { setCurrently } = authSlice.actions;
export default authSlice.reducer;