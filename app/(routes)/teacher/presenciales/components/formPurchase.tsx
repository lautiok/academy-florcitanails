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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Course, User } from "@prisma/client";

const formSchema = z.object({
  userId: z.string().min(1, "El usuario es obligatorio"),
  courseId: z.string().min(1, "El curso es obligatorio"),
});

export const FormIncriptionPurchase = ({
  users,
  curses,
}: {
  users: User[];
  curses: Course[];
}) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      courseId: "",
    },
  });

  const selectedCourseId = form.watch("courseId");
  const selectedCourse = curses.find((course) => course.id === selectedCourseId);
  const selectedPrice = selectedCourse?.price?.toString() || "";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values , selectedPrice);
    try {
      await axios.post(
        `/api/courses/manualPurchase`,
        {
          userId: values.userId,
          courseId: values.courseId,
          price: selectedPrice,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Inscripción exitosa");
    } catch (error) {
      let errorMessage = "Error al enviar formulario";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      console.error("Error al crear inscripción:", error);
    }
  };

  return (
    <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            {/* Select de Usuario */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar usuario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Select de Curso */}
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curso</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {curses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedPrice && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Precio del curso seleccionado: <strong>${selectedPrice}</strong>
                </p>
              </div>
            )}

            <Button variant="outline" type="submit">
              Enviar
            </Button>
          </form>
        </Form>
    </div>
  );
};
