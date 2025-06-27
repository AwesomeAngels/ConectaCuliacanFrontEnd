/* Library imports */
import { useMemo } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinkCom from "@mui/material/Link";
import {Link} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useState } from 'react';
import { useNotifications } from "@toolpad/core";
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

/* Local Imports */
import {IApiResponse, type IRecoverBody} from "../../interfaces.ts";
import { useSendRecoverTokenMutation } from "../../state/auth/authApi.ts";

function RecoverView(){
    const { register, formState: { errors, isSubmitting }, handleSubmit , setError, getValues} = useForm<IRecoverBody>({
        defaultValues: {email: ""},
        resolver: zodResolver(z.object({email : z.string().nonempty("El email no puede ir vacio").email("No es un email valido")}))
    });
    const [ triggerRecover ] = useSendRecoverTokenMutation();
    const [ success , setSuccess ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ times, setTimes ] = useState<number>(0);

    const notifications = useNotifications();
    const email = getValues('email');
    const navigate = useNavigate();

    const backHandler = () => {
        navigate('/')
    }

    const sendMail : SubmitHandler<IRecoverBody> = async ({email}) : Promise<void> => {
        try{
            setLoading(true);
            const result = await triggerRecover(email).unwrap();
            if(result.isValid){
                setSuccess(true);
                return;
            }
            notifications.show("Algo ocurrio mal", {severity: "success"});
        }catch(error){
            if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                notifications.show("Algo ocurrio mal", {severity: "error"});
                return;
            }
            if(error && typeof error === "object" && 'data' in error){
                const { message  } = error.data as IApiResponse<void>;
                setError('email', {message});
                return;
            }
            notifications.show("Algo ocurrio mal", {severity: "error"});
        }finally {
            setLoading(false);
        }
    }
    const sendMailAgain =  debounce ( async () => {
        //Prevent send the email again if user already clicked more than 5 times
        if(limitSend) return;
        setTimes((prev) => prev + 1);
        try{
            setLoading(true);
            const result = await triggerRecover(email).unwrap();
            if(result){
                notifications.show("Email enviado correctamente", {severity: "success"});
                return;
            }
            notifications.show("Algo ocurrio mal", {severity: "success"});
        }catch(error){
            //Pa que no llore
            if(error){
                notifications.show("Algo ocurrio mal", {severity: "error"});
            }
        }finally {
            setLoading(false);
        }
    },50)

    const limitSend = useMemo(() => {
        return times >= 5;
    },[times]);

    if(!success){
        return(
            <form onSubmit={handleSubmit(sendMail)}>
                <Box>
                    <Typography textAlign={'center'} variant={"h5"}>Problemas iniciando sesion?</Typography>
                    <Typography textAlign={'center'} variant={"h6"}>Ingresa tu email o un telefono celular para enviarte un pin para recuperar tu clave.</Typography>
                </Box>
                <Box className={"my-2"}>
                    <Typography component="label">Email</Typography>
                    <TextField
                        variant="outlined"
                        className="w-full"
                        placeholder="Email"
                        {...register("email")}
                        error={Boolean(errors.email)}
                        helperText={errors?.email?.message}
                    ></TextField>
                </Box>

                <Box className="flex justify-between my-2">
                    <Typography component="span">Ya tienes una cuenta?
                        <LinkCom underline="always" component={Link} to={"/"}> Inicia sesion</LinkCom>
                    </Typography>

                    <Typography component="span">No tienes una cuenta?
                        <LinkCom component={Link} to={"/register"} underline="always"> Registrate</LinkCom>
                    </Typography>
                </Box>

                <Button
                    fullWidth={true}
                    className=""
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                >Recuperar contraseña</Button>
            </form>
        )
    }
    return(
        <Box className="mx-auto">
            <Box className="w-full flex justify-center m-0">
                <EmailIcon sx={{fontSize: 100}} />
            </Box>
            {/* Timer */}
            <Box className="mx-auto w-[400px]">
                <Typography margin={0} fontSize={30} fontWeight={500} textAlign={"center"}>Checa tu email.</Typography>
                <Typography margin={0} fontSize={20} fontWeight={300} textAlign={"center"}>Hemos enviado instrucciones para recuperar tu clave a {email}</Typography>
            </Box>
            <Box className="flex items-center justify-center mt-3">
                <Typography display="inline">No recibiste ningun email?<span onClick={sendMailAgain} className={`cursor-pointer ${limitSend ? 'text-gray-500' : ''}  ${loading ? 'text-gray-500' : 'text-blue-500' }`} > Enviarlo de nuevo</span></Typography>
            </Box>

            <Box className="flex flex-col justify-center gap-y-3 gap-x-3 items-center mt-5">
                <Button variant="contained" onClick={backHandler} fullWidth={true}>Continuar</Button>

                <Box className="flex gap-x-3">
                    <KeyboardBackspaceIcon onClick={backHandler} className="text-blue-500 cursor-pointer"/>
                    <Link  to={'/'} className="text-blue-500 cursor-pointer">Volver a la pantalla de inicio</Link>
                </Box>
            </Box>
        </Box>
    )
}

export default RecoverView;