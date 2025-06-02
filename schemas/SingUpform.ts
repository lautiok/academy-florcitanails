import { z } from "zod"
export const formSchema = z.object({
  userEmail: z.string().email({
    message: "Dirección de correo inválida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  fullname: z.string().min(6, {
    message: "El nombre debe tener al menos 6 caracteres",
  }),
})