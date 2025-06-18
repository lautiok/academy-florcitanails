"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const formSchema = z.object({
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener menos de 100 caracteres"),
      confirmPassword: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener menos de 100 caracteres")

});

export const FormChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        password: "",
        confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.put(
        "/api/auth/signup/change-password",
        {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Contraseña actualizada correctamente");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Error al actualizar contraseña");
      console.error("Error al crear contraseña:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingrese una nueva contraseña</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme la nueva contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      placeholder={showConfirmPassword ? "Contraseña" : "********"}
                      className="pr-10 bg-white border border-[#e6e6e6] rounded-md focus:ring-[#a3d9c9]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"} type="submit">
          Actualizar contraseña
        </Button>
      </form>
    </Form>
  );
};
