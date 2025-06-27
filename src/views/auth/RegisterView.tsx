/* Library imports */
import { useState } from 'react';
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core";
import { useForm, SubmitHandler, Controller, FormProvider } from 'react-hook-form';
import daysjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector, useDispatch } from "react-redux";

/* Local Imports */
import { AppDispatch , RootState } from '../../store.ts'
import { setCurrently } from "../../state/auth/authReducer.ts";
import UserValidation from "../../validation/userValidationSchema.ts";
import PhoneField from './register/PhoneFiled.tsx';
import ColField from './register/ColField.tsx';
import EmailField from './register/EmailField.tsx';
import CityField from './register/CityField.tsx';
import CpField from './register/CpField.tsx';
import {
    useCreateUserMutation,
    useVerifyUserMutation
} from "../../state/auth/authApi.ts";
import { IApiResponse, type IUser} from "../../interfaces.ts";
import { setUserSlice } from "../../state/UserSlice.ts";

function RegisterView() {
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useNotifications();
    const minDate = daysjs().subtract(100, "years");
    const maxDate = daysjs().subtract(16, "years");
    const [step, setStep] = useState(1);
    const [createUser] = useCreateUserMutation();
    const methods =  useForm<IUser>(
        {
            //Zod validator for errors
            resolver: zodResolver(UserValidation),
            defaultValues: {
                name : "",
                birth: null,
                ap : "",
                am : "",
                email : "",
                password : "",
                cp : "",
                city: "",
                col: "",
                phone: ""
            },
        }
    );
    const
    {
        control,
        register,
        setError,
        handleSubmit,
        formState : { errors, isSubmitting },
    }  = methods
    const handleSubmitRegister : SubmitHandler<IUser> = async (formValues) => {
        try{
            //Logic of  submiting the form
            const result = await createUser(formValues).unwrap();
            if(result.isValid){
                const { data } = result;
                dispatch(setCurrently(data.email));
                setStep(2);
                return;
            }
            notifications.show("Algo ocurrio mal", {severity: "error"});
        }catch(error){
            //Error connection client
            if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                notifications.show("Por favor verifique la conexion a internet", {severity: "error"});
                return;
            }
            //For some reason the user invalidated the data???
            if(error && typeof error === "object" && 'data' in error){
                const { errors, errorType} = error.data as IApiResponse<Record<string,string>>;
                if(errorType === 'connection'){
                    notifications.show("Algo ocurrio mal", {severity: "error"});
                    return;
                }
                for(const k in errors){
                    setError(k as keyof IUser, {
                        message: errors[k]
                    })
                }
                return;
            }
            //Unknow error, ask user what is he trying to do...
            notifications.show("Algo ocurrio mal", {severity: "error"});
        }
    }

    return(
        <>
            {step === 1 && (
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(handleSubmitRegister)}>
                        <Grid container spacing={1}>
                            <Grid  size={6}>
                                <Typography component="label">Nombre</Typography>
                                <TextField
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                    variant="outlined"
                                    className="w-full"
                                    placeholder="Nombre"
                                    {...register("name")}
                                    name="name"
                                ></TextField>
                            </Grid>
                            <Grid   size={6}>
                                <Typography component="label">Fecha de nacimiento</Typography>
                                <Controller
                                    control={control}
                                    name="birth"
                                    render={({field}) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                slotProps={{
                                                    textField: {
                                                        error: Boolean(errors.birth),
                                                        helperText: errors.birth?.message
                                                    }
                                                }}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                disableFuture
                                                onChange={(v) => field.onChange(v)}
                                                value={field.value}
                                                sx={{width: '100%'}}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid  size={6}>
                                <Typography component="label">Apellido Paterno</Typography>
                                <TextField
                                    variant="outlined"
                                    className="w-full"
                                    placeholder="Apellido materno"
                                    {...register("ap")}
                                    name="ap"
                                ></TextField>
                            </Grid>
                            <Grid  size={6}>
                                <Typography component="label">Apellido materno</Typography>
                                <TextField
                                    variant="outlined"
                                    className="w-full"
                                    placeholder="Apellido materno"
                                    {...register("am")}
                                    name="am"
                                ></TextField>
                            </Grid>
                            <Grid  size={6}>
                                <Typography component="label">Contraseña</Typography>
                                <TextField
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    type="password"
                                    variant="outlined"
                                    className="w-full"
                                    placeholder="Contraseña"
                                    {...register("password")}
                                    name="password"
                                ></TextField>
                            </Grid>
                            {/* Controlled input */}
                            <EmailField/>
                            <CityField/>
                            <CpField/>
                            <ColField/>
                            <PhoneField/>
                            {/*******************/}
                        </Grid>
                        <Box  className="w-full">
                            <Box className="flex justify-between my-2">
                                <Typography component="span">
                                    Ya tienes una cuenta?
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: 'underline' }}> Inicia sesión</Link>
                                </Typography>
                                <Link
                                    to="/recover" style={{ textDecoration: 'underline' }}>
                                    Recuperar contraseña
                                </Link>
                            </Box>
                            <Button
                                loading={isSubmitting}
                                type={'submit'}
                                className="w-full"
                                variant="contained"
                            >Registrarse</Button>
                        </Box>
                    </form>
                </FormProvider>
            )}
            {step === 2 && ( <StepTwo/> )}
        </>
    )
}

function StepTwo(){
    const [triggerVerify] = useVerifyUserMutation();
    const [pin, setPin] = useState<string>("");
    const [pinError, setPinError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const notifications = useNotifications();
    const user = useSelector((state: RootState) => state.authReducer);
    const dispatch = useDispatch();

    const sendHanlder = async () => {
        try{
            setPinError("");
            setLoading(true);
            if(pin.length !== 6 || !pin){
                setPinError("El pin debe tener al menos 6 caracteres");
                return;
            }
            const email = user.email;
            const result = await triggerVerify({token: pin, email}).unwrap();
            if(result){
                //Log user instantly
                const { data } = result;
                dispatch(setUserSlice(data));
                window.location.href = "/";
                return;
            }
            notifications.show("Paso algo inesperado", {severity: "error"});
        }catch(error){
            if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                notifications.show("Por favor verifique la conexion a internet", {severity: "error"});
                return;
            }
            if(error && typeof error === "object" && "data" in error){
                const { message } = error.data as IApiResponse<string>;
                setPinError(message);
                return;
            }
            notifications.show("Algo sucedio mal", {severity: "error"});
        }
    }

    return(
        <Box className="flex flex-col items-center justify-center gap-y-5 max-w-[95%]">
            <Typography className="text-center" >Enviamos un código de 6 dígitos a {user.email}. Escríbelo aquí para verificar tu usuario.</Typography>
            
            <TextField
                sx={{input: {textAlign: "center", fontSize: "30px"}}}
                onChange={(e) => setPin(e.target.value)}
                helperText={pinError}
                error={Boolean(pinError)}
            />
            <Button loading={loading} onClick={sendHanlder} className="w-[350px]" variant={'contained'}>Send</Button>
        </Box>
    )
}
export default RegisterView;
