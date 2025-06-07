"use client";
import { Chapter } from "@prisma/client";
 import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { z } from "zod"
import { EditorDescription } from "@/components/Shared";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  isFree : z.boolean(),
})

export const ChapterTitleForm = ({
    chapter,
    slug,
}: {
    chapter: Chapter;
    slug: string;
}) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: chapter.title || "",
      description: chapter.description || "",
      isFree: chapter.isfree || false,

    },
  })

  const onSubmit= (values: z.infer<typeof formSchema>) => {
   try {
     const data = {
       title: values.title,
       description: values.description,
       isfree: values.isFree,
     }

     axios.put(`/api/courses/teacher/${slug}/chapters/${chapter.id}`, data, {
        withCredentials: true,
      })

      toast("Se guardaron los cambios exitosamente 🎉")
      router.refresh()
   } catch (error) {
     toast.error("Error al guardar los cambios")
     console.error("Error al guardar los cambios:", error)
   }
  }

  return <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del capítulo</FormLabel>
              <FormControl>
                <Input placeholder="Escribe el título del capítulo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del capítulo</FormLabel>
              <FormControl >
                <EditorDescription {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 bg-white p-4"
                      >
                        <FormControl>
                          <Checkbox
                            checked={ field.value }
                            onCheckedChange= {field.onChange}
                          />
                        </FormControl>
                       <div className="space-y-1 leading-none">
                         <FormLabel className="text-sm font-normal">
                          Capitulo Público
                        </FormLabel>
                        <FormDescription>
                            Si este es un capítulo público, cualquiera podrá verlo
                        </FormDescription>
                       </div>
                      </FormItem>
                    )
                  }}
                />

                <div />
        
        <Button variant={"outline"} type="submit">Guardar cambios</Button>
      </form>
    </Form>
  </div>;
};