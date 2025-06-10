"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  passingScore: z.coerce.number().min(1).max(100),
  questions: z.array(
    z.object({
      text: z.string().min(1, "La pregunta es requerida"),
      options: z.array(z.string().min(1, "Opción requerida")).min(2),
      correct: z.string().min(1, "Selecciona la opción correcta"),
    })
  ),
});

export function ExamForm({ chapterId, slug }: { chapterId: string, slug: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passingScore: 70,
      questions: [
        {
          text: "",
          options: ["", ""],
          correct: "",
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/teacher/${slug}/chapters/${chapterId}/exam`, values);
      toast.success("Examen creado con éxito 🎉");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el examen");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="passingScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puntaje para aprobar (%)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="70" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {questionFields.map((field, qIndex) => (
          <div key={field.id} className="space-y-4 border p-4 rounded-md">
            <FormField
              control={form.control}
              name={`questions.${qIndex}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregunta {qIndex + 1}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Escribe la pregunta aquí" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch(`questions.${qIndex}.options`).map((_, optIndex) => (
              <FormField
                key={optIndex}
                control={form.control}
                name={`questions.${qIndex}.options.${optIndex}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opción {optIndex + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Opción ${optIndex + 1}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  form.setValue(`questions.${qIndex}.options`, [
                    ...form.getValues(`questions.${qIndex}.options`),
                    "",
                  ])
                }
              >
                Agregar opción
              </Button>

              {form.watch(`questions.${qIndex}.options`).length > 2 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    const currentOptions = form.getValues(
                      `questions.${qIndex}.options`
                    );
                    currentOptions.pop();
                    form.setValue(`questions.${qIndex}.options`, currentOptions);
                  }}
                >
                  Eliminar última opción
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`questions.${qIndex}.correct`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opción correcta (debe coincidir exactamente con una opción)</FormLabel>
                  <FormControl>
                    <Input placeholder="Escribe la opción correcta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="destructive"
              type="button"
              onClick={() => remove(qIndex)}
            >
              Eliminar pregunta
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              text: "",
              options: ["", ""],
              correct: "",
            })
          }
        >
          Agregar nueva pregunta
        </Button>

        <Button type="submit" className="m-6">
          Guardar examen
        </Button>
      </form>
    </Form>
  );
}
