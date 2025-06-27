import {Controller, useFormContext} from "react-hook-form";
import type {IUser} from "../../../interfaces.ts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import municipios from "../../../constants/municipiosSinaloa.ts";
import TextField from "@mui/material/TextField";

function CityField(){
    const { control, formState: {errors} } = useFormContext<IUser>()
    return(
        <Grid size={6}>
            <Typography
                component="label"
            >Municipio</Typography>
            <Controller
                name="city"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        options={municipios}
                        value={field.value}
                        onChange={(_, value) => field.onChange(value ?? "")}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Municipio"
                                error={Boolean(errors.city)}
                                helperText={errors.city?.message}
                            />
                        )}
                    />
                )}
            />
        </Grid>
    )
}

export default CityField;