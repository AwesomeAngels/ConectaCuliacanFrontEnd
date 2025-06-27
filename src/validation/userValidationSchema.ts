import { z } from 'zod';
import dayjs, { type Dayjs } from 'dayjs';

const User = z.object({
    name: z.string().nonempty({ message: "El nombre es necesario para continuar." }),
    ap: z.string(),
    am: z.string(),
    //Validation, cannot be -15 or +80 years old. (Mexico laws)
    birth: z.custom<Dayjs | null>((val) => val instanceof dayjs && dayjs.isDayjs(val) && val.isValid() && val.year() >= dayjs().year() - 80 && val.year() <= dayjs().year() - 16, 'Por favor seleccione una fecha valida'),
    email: z.string().nonempty({ message: "El email es necesario para continuar" }).email({ message: "No es un email valido." }),
    password: z.string().min(6, { message: "La contraseña debe ser mayor a 6 caracteres" }).nonempty({ message: "La contraseña no puede ir vacia." }),
    city: z.string().nonempty({ message: "Seleccione por favor un muncipio" }),
    cp: z.string().length(5, { message: "El codigo postal debe ser igual a 5 caracteres." }).nonempty("Codigo postal vacio."),
    col: z.string().nonempty({ message: "Por favor seleccione una colonia" }),
    phone: z.string().nonempty({ message: "El telefono es necesario para continuar." }).length(10, {message: "EL telefono tiene que tener 10 digitos"}).refine((val) => +val >= 2000000000 && +val <= 9999999999, {message: "Ingrese un numero valido"})
});

export default User;
