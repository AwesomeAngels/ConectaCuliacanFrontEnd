import { useFormContext } from "react-hook-form";
import { type IUser} from "../../../interfaces.ts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function EmailField(){
    const { register ,formState : { errors } } = useFormContext<IUser>();

    return(
        <Grid size={6}>
            <Typography component="label">Email</Typography>
            <TextField
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                variant="outlined"
                className="w-full"
                placeholder="Email"
                {...register('email')}
                name="email"
            ></TextField>
        </Grid>
    )
}

export default EmailField;