"use client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  documentUrl: z.string().min(1).max(500),
})

export const ChapterDocumentsForm = ({
    slug,
    chapterId,
    setIsEditing,
}: {
    slug: string;
    chapterId: string;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      documentUrl: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        title: values.title,
        documentUrl: values.documentUrl,
      }

      await axios.post(`/api/courses/teacher/${slug}/chapters/${chapterId}/document`, data, {
        withCredentials: true,
      })

      toast("Documento actualizado exitosamente 🎉")
      setIsEditing(false)
      router.refresh()
    } catch (error) {
        toast.error("Error al actualizar documento")
        console.error("Error al actualizar documento:", error)
    }
  }
  return (
    <div className="mt-6">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del documento</FormLabel>
              <FormControl>
                <Input placeholder="Escribe el título del documento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documentUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url del documento</FormLabel>
              <FormControl>
                <Input placeholder="Escribe la url del documento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"} type="submit">Guardar cambios</Button>
      </form>
    </Form>
    </div>
  );
};