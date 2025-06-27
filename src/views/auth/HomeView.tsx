/* Library imports */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import LinkCom from '@mui/material/Link'
import { Link } from "react-router-dom";
import { useForm , SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core";

/* Local imports */
import userValidation from '../../validation/loginUser.ts'
import { useLogUserMutation } from "../../state/auth/authApi.ts";
import { IApiResponse, type ILoginBody } from "../../interfaces.ts";

function HomeView(){
    const {register, formState : {errors, isSubmitting}, handleSubmit, setError} = useForm<ILoginBody>({defaultValues: {email: "", password: ""}, resolver: zodResolver(userValidation)})
    const [triggerLogUserMutation] = useLogUserMutation();
    const notification = useNotifications()

    const submitHandler : SubmitHandler<ILoginBody> = async (formValues) => {
        try{
            const { email, password } = formValues;
            const {  isValid } = await triggerLogUserMutation({email,password}).unwrap();
            if(isValid){
                window.location.href = "/";
            }
        }catch(error){
            if(error && typeof error == 'object' && 'data' in error){
                const { errors } = error.data as IApiResponse<string>;
                if(errors){
                    for(const error in errors){
                        setError(error as keyof ILoginBody, {message: errors[error]});
                    }
                }
                return;
            }
            notification.show("Algo ocurrio mal", { severity: "error" });
        }
    }

    return(
        <form onSubmit={handleSubmit(submitHandler)}>
            <Box height="120px">
                <Typography component="label">Email</Typography>
                <TextField
                    variant="outlined"
                    className="w-full"
                    placeholder="Email"
                    {...register('email')}
                    name="email"
                    helperText={errors.email?.message}
                    error={Boolean(errors.email?.message)}
                ></TextField>
            </Box>
            <Box height="120px">
                <Typography component="label">Contraseña</Typography>
                <TextField
                    variant="outlined"
                    className="w-full"
                    placeholder="Contraseña"
                    {...register('password')}
                    name="password"
                    helperText={errors.password?.message}
                    error={Boolean(errors.password?.message)}
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
                fullWidth={true}
                variant="contained"
                type='submit'
                loading={isSubmitting}
            >Iniciar sesion</Button>
        </form>
    )
}
export default HomeView