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
import { useState } from "react";
import { Chapter, Course } from "@prisma/client";

export const formSchema = z.object({
  userName: z.string().min(3, "El nombre del usuario es obligatorio"),
  email: z.string().email("El email es invalido"),
  phone: z.string().min(10, "El phone es invalido"),
});

export const FormIncription = ({
  data,
  slug,
}: {
  data: Course & { chapters: Chapter[] };
  slug: string;
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      phone: "",
    },
  });

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${slug}/send`,
        {
          userName: values.userName,
          userEmail: values.email,
          phone: values.phone,
        },
        {
          withCredentials: true,
        }
      );
      setIsSuccess(true);
    } catch (error) {
      let errorMessage = "Error al enviar formulario";
      
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } 
        else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage); 
      console.error("Error al crear curso:", error);
    }
  };

  return (
    <div>
      {
        isSuccess ? (
          <div className="p-6 bg-green-50 rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          Formulario de inscripción enviado exitosamente
        </h2>
        <p>
          El formulario de inscripción ha sido enviado con éxito, en brevedad
          nos pondremos en contacto contigo para conocer mas detalles del curso{" "}
          {data.title}
        </p>
      </div>
        ) : (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del usuario</FormLabel>
                <FormControl>
                  <Input placeholder="dennis de silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="dennis@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono de contacto</FormLabel>
                <FormControl>
                  <Input placeholder="123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"outline"} type="submit">
            Enviar
          </Button>
        </form>
      </Form>
        )
      }
    </div>
  );
};
