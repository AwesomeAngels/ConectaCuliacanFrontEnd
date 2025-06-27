/* Library imports */
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Spinner from '@mui/material/CircularProgress';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* Local imports */
import HomeView from "./views/auth/HomeView.tsx";
import AuthLayout from './views/auth/AuthLayoutView.tsx';
import RegisterView from './views/auth/RegisterView.tsx';
import RecoverView from './views/auth/RecoverView.tsx'
import CheckEmail from "./views/auth/CheckEmail.tsx";
import Test from './views/test.tsx';
import UpdatePasswordView from './views/auth/UpdatePasswordView.tsx';
import JobView from './views/Dashboard/JobView.tsx';
import DashBoardLayoutView from "./views/Dashboard/DashBoardLayoutView.tsx";
import { useGetSessionQuery} from './state/auth/authApi.ts'
import MainPublicView from "./views/Dashboard/MainPublicView.tsx";
import { useAppDispatch } from "../hooks.ts";
import { setUserSlice } from "./state/UserSlice.ts";
import { IUserStore } from "./interfaces.ts";

function App() {
    const { data, isLoading, error} = useGetSessionQuery();
    //Display a spinner
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(!isLoading){
            if(error){
                if(!(error as {isLoggedIn: boolean}).isLoggedIn){
                    dispatch(setUserSlice({
                        birth: null,
                        city: "",
                        col: "",
                        cp: "",
                        email: "",
                        phone: "",
                        name : "Anonymous", am: "", ap: ""}));
                }
            }
            dispatch(setUserSlice(data?.data as IUserStore));
        }
    }, [dispatch, isLoading, error, data]);
    if(isLoading) {
        return (
            <Box className="flex min-h-[100vh] justify-center items-center flex-col gap-y-3">
                <img src='/src/assets/Logo.png' className="w-[366px] " alt={"Conecta culiacan"}/>
                <Spinner/>
            </Box>
        )
    }
    if(error instanceof Error){
        return <div>{error.message}</div>;
    }
    return (
        <Router>
            <Routes>
                <Route path="test" element={<Test/>}/>
                {/* Private Routes */}
                <Route path="/" element={<DashBoardLayoutView/>}>
                  <Route index element={<MainPublicView/>}/>
                </Route>
                <Route path="jobs" element={<JobView/>}/>
                {/* Public routes */}
                <Route path="/" element={<AuthLayout/>} >
                  <Route path="login" element={<HomeView/>} />
                  <Route path="register" element={<RegisterView/>} />
                  <Route path="recover" element={<RecoverView/>}/>
                  <Route path="check" element={<CheckEmail/>}/>
                  <Route path="password/:token" element={<UpdatePasswordView/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
