import {Controller, useFormContext, useWatch} from "react-hook-form";
import type {IUser} from "../../../interfaces.ts";
import {useNotifications} from "@toolpad/core";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useLazyGetColByCpQuery} from "../../../state/auth/authApi.ts";
import {debounce} from "lodash";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function ColField(){
    const { control, formState: {errors}, setValue } = useFormContext<IUser>()
    const notifications = useNotifications();
    const [cols, setCols] = useState<string[]>([]);
    const [ triggerGetColonias ] = useLazyGetColByCpQuery()
    const [loadingColonias, setLoadingColonias] = useState(false);
    const city = useWatch({control, name: 'city'});
    const cp = useWatch({control, name: 'cp'});
    const getCol = useCallback(async () : Promise<void> => {
        try{
            setLoadingColonias(true);
            setCols([]);
            setValue("col", "");
            //Validation for not make a call everytime
            if(!cp || !city || cp.length !== 5) return;

            const { isValid, data : col }  = await triggerGetColonias( { city, cp } ).unwrap();
            if(isValid) setCols(col);
        }catch(error){
            //Connection error
            if(error && typeof error === "object" && 'status' in error && error.status === "FETCH_ERROR"){
                notifications.show("Por favor verifique la conexion a internet", {severity: "error"});
                return;
            }
            //Unknow error
            notifications.show("Algo ocurrio mal", {severity: "error"});
        }finally {
            setLoadingColonias(false);
        }
    },[cp, city ,notifications, setCols, setValue, triggerGetColonias]);

    const debouncedGetCol = useMemo(
        () =>
            debounce(() => {
                void getCol();
            }, 750),
        [getCol]
    );
    useEffect(() => {
        void debouncedGetCol();
    },[ city, cp, debouncedGetCol]);

    return(
        <Grid size={6}>
            <Typography
                component="label"
            >Colonia</Typography>
            <Controller
                name="col"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        loading={loadingColonias}
                        loadingText={"Cargando colonias..."}
                        noOptionsText={"No se encontro ninguna colonia."}
                        options={cols}
                        value={field.value}
                        onChange={(_, value) => field.onChange(value ?? "")}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="col"
                                error={Boolean(errors?.col)}
                                helperText={errors.col?.message}
                            />
                        )}
                    />
                )}
            />
        </Grid>
    )
}

export default ColField;