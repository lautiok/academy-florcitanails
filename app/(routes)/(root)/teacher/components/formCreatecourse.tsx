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
import { formSchema } from "@/schemas/createCourseSchema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FormCreateCourse = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
     const response = await axios.post("/api/courses/teacher", {
       title: values.courseName,
       slug: values.slug,
     }, {
       withCredentials: true,
     });
      toast("Curso creado exitosamente 🎉");
      router.push(`/teacher/course/${response.data.slug}`);
   } catch (error) {
     toast.error("Error al crear curso");
     console.error("Error al crear curso:", error);
   }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del curso</FormLabel>
              <FormControl>
                <Input
                  placeholder="Inicial en acrílico"
                  {...field}
                />
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
              <FormLabel>Slug del curso</FormLabel>
              <FormControl>
                <Input
                  placeholder="inicial-acrílico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button variant={"outline"} type="submit">
          Crear curso
        </Button>
      </form>
    </Form>
  );
};
