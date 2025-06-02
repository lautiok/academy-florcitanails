"use client";
import { z } from "zod"
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const formSchema = z.object({
  title: z.string().min(2).max(50),
})

export const FormChaptersName = ({
    slug,
    setChaptersList,
} : {
    slug: string;
    setChaptersList: React.Dispatch<React.SetStateAction<boolean>>;

}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.post(`/api/courses/teacher/${slug}/chapters`, {
        title: values.title,
      }, {
        withCredentials: true,
      });
      setChaptersList(false);
      toast("Capítulo agregado exitosamente 🎉");
      router.refresh();
    } catch (error) {
      toast.error("Error al agregar capítulo");
      console.error("Error al agregar capítulo:", error);
    }
  }
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del capítulo</FormLabel>
              <FormControl>
                <Input placeholder="Introducción al curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"} type="submit">Agregar capítulo</Button>
      </form>
    </Form>;
};