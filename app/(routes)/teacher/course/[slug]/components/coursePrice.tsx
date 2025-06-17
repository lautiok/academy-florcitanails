"use client";
import { DollarSign } from "lucide-react";
import { TitleBlock } from "../../../../../../components/Shared/titleBlock";
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

const formSchema = z.object({
  price: z.string().min(2).max(50),
});

export const CoursePrice = ({
  slug,
  price,
}: {
  slug: string;
  price: string | null;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price || "",
    },
  });

  const  onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/courses/teacher/${slug}`, {
          price: values.price,
        }, {
          withCredentials: true,
        });
        toast("Precio actualizado exitosamente 🎉");
      } catch (error) {
        toast.error("Error al actualizar precio");
        console.error("Error al actualizar precio:", error);
      }
    }
  return (
    <div className="p-6 bg-white rounded-md h-fit border border-slate-200">
      <TitleBlock title="Precio del curso" icon={DollarSign} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del curso</FormLabel>
                <FormControl>
                  <Input placeholder="30.000$" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"outline"} type="submit">Modificar precio</Button>
        </form>
      </Form>
    </div>
  );
};
