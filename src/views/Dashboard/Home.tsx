/*
import {useEffect, useState} from "react";
import { useLogOutUserMutation } from "../../state/auth/authApi.ts";
import Button from '@mui/material/Button';
import { IUserStore } from '../../interfaces.ts';
function Home(){
    const [user, setUser] = useState<IUserStore>();
    const [triggerLogOut] = useLogOutUserMutation();
    useEffect(() => {
        (async () => {
           const res = await fetch("http://localhost:3000/session/getUserSession",{
               method: "GET",
               credentials: 'include',
           })
            const data = await res.json()
            setUser(data.data)
        })()
    }, []);

    const logOut = async() => {
        try{
           const { message } = await triggerLogOut().unwrap();
           if(message === 'success'){
               window.location.reload();
           }
        }catch(error){

        }
    }
    return(
        <div className="w-full flex justify-center gap-x-20">
            <h1>Welcome {user?.name}</h1>
            <Button variant="contained" onClick={logOut} className="mt-20">LOG OUT</Button>
        </div>
    )
}

export default Home;
*/
