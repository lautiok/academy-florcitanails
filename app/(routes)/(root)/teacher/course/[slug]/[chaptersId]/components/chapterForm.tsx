"use client";
import { Button } from "@/components/ui/button";
import { Chapter, DocumentUrl, Exam, Question } from "@prisma/client";
import { ArrowLeft, Cog, FileQuestion, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TitleBlock } from "../../components";
import axios from "axios";
import { toast } from "sonner";
import { ChapterTitleForm } from "./chapterTitleForm";
import { ChapterVideo } from "./chapterVideo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExamForm } from "./examForm";
import { useState } from "react";
import { ExamUpdate } from "./examUpdate";

export default function ChapterForm({
  chapter,
  slug,
  documentUrl,
  exam,
}: {
  chapter: Chapter;
  slug: string;
  documentUrl: DocumentUrl[];
  exam: (Exam & { questions: Question[] }) | null;
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const router = useRouter();

  const onPublish = async (state: boolean) => {
    try {
      await axios.put(
        `/api/courses/teacher/${slug}/chapters/${chapter.id}`,
        {
          isPublished: state,
        },
        {
          withCredentials: true,
        }
      );

      toast(
        state
          ? "Capítulo publicado exitosamente 🎉"
          : "Capítulo despublicado exitosamente"
      );
      router.refresh();
    } catch (error) {
      toast.error("Error al publicar capítulo");
      console.error("Error al publicar capítulo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/courses/teacher/${slug}/chapters/${chapter.id}`,
        {
          withCredentials: true,
        }
      );
      toast("Capítulo eliminado exitosamente 🎉");
      router.push(`/teacher/course/${slug}`);
    } catch (error) {
      toast.error("Error al eliminar capítulo");
      console.error("Error al eliminar capítulo:", error);
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(
        `/api/courses/teacher/${slug}/chapters/${chapter.id}/exam`,
        {
          withCredentials: true,
        }
      );
      toast("Examen eliminado exitosamente 🎉");
      router.refresh();
    } catch (error) {
      toast.error("Error al eliminar examen");
      console.error("Error al eliminar examen:", error);
    }
  };
  return (
    <div>
      <div className="h-fit flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className="mb-4"
          onClick={() => router.push(`/teacher/course/${slug}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          volver a editar el curso
        </Button>
        <div className="flex gap-2 items-center">
          {chapter.isPublished ? (
            <Button
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={() => onPublish(false)}
            >
              Despublicar
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={() => onPublish(true)}
            >
              Publicar
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size={"sm"} className="mb-4">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas seguro de que deseas eliminar?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminara el capítulo y todos los materiales
                  asociados permanentemente de la plataforma.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="p-6 mt-1 bg-white rounded-md border border-slate-200 flex flex-col">
        <TitleBlock title="Configuración del capítulo" icon={Cog} />
        <ChapterTitleForm chapter={chapter} slug={slug} />
      </div>
      <ChapterVideo
        slug={slug}
        chapterId={chapter.id}
        videoUrl={chapter.videoUrl}
        documentUrl={documentUrl}
      />
      <div className="p-6 mt-2 bg-white rounded-md border border-slate-200 flex flex-col">
  <TitleBlock title="Programa de evaluación" icon={FileQuestion} />
  <div className="mt-6">
    {exam?.questions.length ? (
      <div className="space-y-4">
        <div className="p-6 bg-white rounded-md border border-slate-200">
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Examen del capítulo
          </h3>
          <div className="space-y-6">
            {exam.questions.map((question, index) => (
              <div key={question.id} className="border-t pt-4">
                <p className="text-sm font-medium text-slate-800 mb-1">
                  Pregunta {index + 1}:
                </p>
                <p className="text-sm text-slate-700 mb-2">{question.text}</p>

                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">
                    Opciones:
                  </p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {question.options.map((option, i) => (
                      <li
                        key={i}
                        className={`${
                          option === question.correct
                            ? "font-semibold text-green-700"
                            : ""
                        }`}
                      >
                        {option}
                        {option === question.correct && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Correcta
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <Button variant={"outline"} className="mr-6 rounded-2xl" onClick={() => setIsUpdate(true)}>
            <Pencil className="h-4 w-4" />
            <span className="m-2">Actualizar examen</span>
          </Button>
          <Button
            variant="destructive"
            className=" rounded-2xl"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
            <span className="ml-2">Eliminar examen</span>
          </Button>
        </div>
      </div>
    ) : (
      <ExamForm chapterId={chapter.id} slug={slug} />
    )}

    {isUpdate && (
      <ExamUpdate chapterId={chapter.id} slug={slug} exam={exam} />
    )}
  </div>
</div>
    </div>
  );
}
