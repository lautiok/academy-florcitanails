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
  videoUrl: z.string().min(1).max(500),
})

export const ChapterVideoForm = ({
    videoUrl,
    slug,
    chapterId,
    setIsEditingVideo
}: {
    videoUrl: string | null;
    slug: string;
    chapterId: string;
    setIsEditingVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: videoUrl || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = {
        videoUrl: values.videoUrl,
      }

      await axios.put(`/api/courses/teacher/${slug}/chapters/${chapterId}`, data, {
        withCredentials: true,
      })

      toast("Video actualizado exitosamente 🎉")
      setIsEditingVideo(false)
      router.refresh()
    } catch (error) {
      toast.error("Error al actualizar video")
      console.error("Error al actualizar video:", error)
    }
  }
  return (
    <div className="mt-6">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
        <FormField
          control={form.control}
          name="videoUrl"
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
        <Button variant={"outline"} type="submit">Guardar cambios</Button>
      </form>
    </Form>
    </div>
  );
};