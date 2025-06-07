"use client";
import { TitleBlock } from "../../../../../../../components/Shared/titleBlock";
import { Cog } from "lucide-react";
import { CourseFormPropType } from "./courseForm.type";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3).max(100),
    slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, {
      message:
        "El slug solo puede contener letras minúsculas, números y guiones. No se permiten espacios, ñ ni símbolos especiales.",
    }),
  description: z.string().min(3).max(500).optional().or(z.literal("")),
  category: z.string().min(3).max(100),
  level: z.string().min(3).max(100),
});

export const CourseForm = (props: CourseFormPropType) => {
  const { course } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      slug: course.slug || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/teacher/${course.slug}`, {
        title: values.title,
        slug: values.slug,
        description: values.description,
        category: values.category,
        level: values.level,
      }, {
        withCredentials: true,
      });
      toast("Curso actualizado exitosamente 🎉");
      router.refresh();
    } catch (error) {
      toast.error("Error al actualizar curso");
      console.error("Error al actualizar curso:", error);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg">
      <TitleBlock title={"configuración del curso"} icon={Cog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo del curso</FormLabel>
                  <FormControl>
                    <Input placeholder="Inicial en acrílico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL del curso</FormLabel>
              <FormControl>
                <Input placeholder="inicial-acrílico" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría del curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la categoría del curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="virtual">virtual</SelectItem>
                  <SelectItem value="presencial">presencial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel del curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel del curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Principiante">Principiante</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                  <SelectItem value="Avanzado">Avanzado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del curso</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe una descripción del curso"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          <Button variant={"outline"} type="submit">Guardar cambios</Button>
        </form>
      </Form>
    </div>
  );
};
