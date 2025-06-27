import {useFormContext} from "react-hook-form";
import type {IUser} from "../../../interfaces.ts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function CpField(){
    const { register,formState: {errors} } = useFormContext<IUser>()
    return(
        <Grid size={6}>
            <Typography
                component="label"
            >
                Codigo Postal</Typography>
            <TextField
                error={Boolean(errors.cp)}
                {...register("cp")}
                helperText={errors.cp?.message}
                variant="outlined"
                className="w-full"
                placeholder="Codigo Postal"
                name="cp"
            ></TextField>
        </Grid>
    )
}

export default CpField;