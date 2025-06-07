"use client";
import { Button } from "@/components/ui/button";
import { Chapter, DocumentUrl, Exam, Question } from "@prisma/client";
import { ArrowLeft, Cog, FileQuestion, Trash } from "lucide-react";
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
        <ExamForm chapterId={chapter.id} slug={slug} />
        <div className="mt-6">
          {exam?.questions.length ? (
  <div className="mt-6 space-y-4">
    {exam.questions.map((question, index) => (
      <div
        key={question.id}
        className="p-4 bg-white rounded-md border border-slate-200"
      >
        <div className="mb-2">
          <p className="text-sm font-medium text-slate-800">
            Pregunta {index + 1}:
          </p>
          <p className="text-sm text-slate-700 mt-1">{question.text}</p>
        </div>

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
) : (
  <p className="text-sm text-slate-500 mt-6">
    No hay preguntas cargadas para este examen.
  </p>
)}

        </div>
      </div>
    </div>
  );
}
