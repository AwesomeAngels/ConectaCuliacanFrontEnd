/* Library imports */
import { useEffect , useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LinkCom from "@mui/material/Link";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import { useNotifications } from '@toolpad/core'
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

/* Local imports */
import { IRecoverPassword } from "../../interfaces.ts";
import { useResetPasswordMutation, useLazyGetUserByTokenQuery } from "../../state/auth/authApi.ts";

function UpdatePasswordview(){
    const { register, handleSubmit, formState: { errors } } = useForm<IRecoverPassword>({
        resolver: zodResolver(z.object({
            password: z.string().nonempty("La contraseña no puede ir vacia").min(6, "La contraseña debe ser mayor a 6 caracteres"),
            confirmPassword: z.string()
        }).superRefine(({ password, confirmPassword}, ctx) => {
            if(confirmPassword !== password){
                ctx.addIssue({
                    code: "custom",
                    message: "La contraseña no coincide",
                    path: ['confirmPassword'],
                })
            }
        })),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });
    const [ triggerResetPassword ] = useResetPasswordMutation();
    const [ triggerGetUserByToken ] = useLazyGetUserByTokenQuery()
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ loading , setLoading ] = useState(false);
    const navigate = useNavigate();
    const notifications = useNotifications();
    const { token } = useParams();
    useEffect(() => {
        if(!token || token.length !== 72){
            navigate("/");
            return;
        }
        const getUser = async () => {
            try{
                const { isValid } = await triggerGetUserByToken(token).unwrap();
                if(!isValid){
                    navigate('/');
                    return;
                }
            }catch(error){
                if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                    notifications.show("Por favor verifique la conexion a internet", {severity: "error"});
                    return;
                }
                navigate('/');
            }
        }
        void getUser();
    }, [navigate, notifications, token, triggerGetUserByToken]);

    const submit : SubmitHandler<IRecoverPassword> = async ({password}) => {
        if(!token || token.length !== 72){
            navigate("/");
            return;
        }
        try{
            setLoading(true);
            const { isValid } = await triggerResetPassword({password, token}).unwrap();
            if(isValid){
                setSuccess(true);
            }

        }catch(error){
            if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                notifications.show("Por favor verifique la conexion a internet", {severity: "error"});
                return;
            }
            notifications.show("Ocurrio algo inesperado", {severity: "error"});
        }finally {
            setLoading(false);
        }
    }

    if(success) {
        return (
            <Box className="w-full flex flex-col justify-center items-center">
                <Avatar sx={{bgcolor: 'green', textAlign: 'center', width: 100, height: 100}}>
                    <SendIcon sx={{fontSize: 75}}/>
                </Avatar>
                <Box className="mx-auto w-[400px]">
                    <Typography margin={0} fontSize={30} fontWeight={500} textAlign={"center"}>Contraseña
                        actualizada</Typography>
                    <Typography margin={0} fontSize={20} fontWeight={300} textAlign={"center"}>Tu contraseña fue
                        actualizada correctamente</Typography>
                </Box>
                <Box  className="flex flex-col justify-center gap-y-3 gap-x-3 items-center mt-5">
                    <Button variant="contained" component={Link} to={'/'} fullWidth={true}>Continuar</Button>
                    <Box className="flex gap-x-3">
                        <KeyboardBackspaceIcon className="text-blue-500 cursor-pointer"/>
                        <Link to={'/'} className="text-blue-500 cursor-pointer">Volver a la pantalla de inicio</Link>
                    </Box>
                </Box>
            </Box>
        )
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Box className="flex flex-col gap-y-3">
                <Box>
                    <Typography component="label">Nueva contraseña</Typography>
                    <TextField
                        variant="outlined"
                        className="w-full"
                        placeholder="Nueva contraseña"
                        {...register('password')}
                        type="password"
                        error={Boolean(errors.password)}
                        helperText={errors?.password?.message}
                        name="password"
                    ></TextField>
                </Box>
                <Box >
                    <Typography component="label">Confirmar nueva contraseña</Typography>
                    <TextField
                        variant="outlined"
                        className="w-full"
                        placeholder="Escribe de nuevo tu contraseña"
                        error={Boolean(errors.confirmPassword)}
                        type="password"
                        helperText={errors?.confirmPassword?.message}
                        {...register('confirmPassword')}
                        name="confirmPassword"
                    ></TextField>
                </Box>
                <Box className="flex justify-between my-2">
                    <Typography component="span">No tienes una cuenta?
                        <LinkCom
                            component={Link}
                            to='/register'
                            underline="always"
                        > Registrate</LinkCom>
                    </Typography>
                    <LinkCom
                        component={Link}
                        to='/recover'
                        underline="always"
                    >Recuperar contraseña</LinkCom>
                </Box>
                <Button
                    loading={loading}
                    fullWidth={true}
                    variant="contained"
                    type='submit'
                >Crear</Button>
            </Box>
        </form>
    )
}

export default UpdatePasswordview;