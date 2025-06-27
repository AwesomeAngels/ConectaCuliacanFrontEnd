import { z } from 'zod'
const logUserValidation = z.object({
    email: z.string().nonempty({message : "El email no puede ir vacio"}).email({message : "No es un email valido"}),
    password: z.string().nonempty({message: "La contraseña no puede ir vacia"}).min(7, {message : "La contraseña debe ser mayor a 6 caracteres"})
})

export default logUserValidation;