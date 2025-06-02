"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { formSchema } from "@/schemas/SingUpform"


export function SingUp() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      password: "",
      fullname: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/auth/signup", {
        email: values.userEmail,
        password: values.password,
        name: values.fullname,
      })
      setLoading(false)
      if (response.status === 201) {
        router.push("/login")
      }
      toast("Usuario registrado exitosamente 🎉")
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error al registrar el usuario")
      } else {
        toast.error("Error desconocido al registrar el usuario")
      }
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#a6888b]">Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="maria perez"
                    className="bg-white border border-[#e6e6e6] rounded-md focus:ring-[#a3d9c9]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#a6888b]">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="ejemplo@correo.com"
                    className="bg-white border border-[#e6e6e6] rounded-md focus:ring-[#a3d9c9]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#a6888b]">Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder={showPassword ? "Contraseña" : "********"}
                      className="pr-10 bg-white border border-[#e6e6e6] rounded-md focus:ring-[#a3d9c9]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#76d8bb] text-white hover:bg-[#aadfce] rounded-md"
            disabled={loading}
          >
            Registrarse
          </Button>
        </form>
      </Form>
    </div>
  )
}
