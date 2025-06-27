import { useFormContext } from "react-hook-form";
import { type IUser} from "../../../interfaces.ts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function PhoneField(){
    const { register, formState: {errors}} = useFormContext<IUser>();
    return(
        <Grid size={6}>
            <Typography component="label">Telefono</Typography>
            <TextField
                type='number'
                error={Boolean(errors.phone)}
                {...register("phone")}
                helperText={errors.phone?.message}
                variant="outlined"
                className="w-full"
                placeholder="Telefono"
                name="phone"
            ></TextField>
        </Grid>
    )
}
export default PhoneField;