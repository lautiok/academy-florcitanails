"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

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
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseHeader = ({
  slug,
  isPublished,
}: {
  slug: string;
  isPublished: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePublish = async (state: boolean) => {
    setIsLoading(true);
    try {
      axios.patch(
        `/api/courses/teacher/${slug}`,
        {
          isPublished: state,
        },
        {
          withCredentials: true,
        }
      );
      toast(
        state ? "Curso publicado exitosamente 🎉" : "Curso despublicado ⛔"
      );
      router.refresh();
    } catch {
      toast("Error al publicar curso");
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    axios.delete(`/api/courses/teacher/${slug}`, {
      withCredentials: true,
    });
    toast("Curso eliminado exitosamente 🎉");
    router.push("/teacher");
  };

  return (
    <header>
      <div className="mb-4">
        <div className="flex  flex-row justify-between items-center">
          <Button variant="outline" onClick={() => router.push("/teacher")}>
            <MoveLeft className="h-4 w-4" />
            volver a cursos
          </Button>
          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                variant="outline"
                className="text-red-400"
                disabled={isLoading}
                onClick={() => handlePublish(false)}
              >
                Despublicar
                <EyeOff className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => handlePublish(true)}
              >
                Publicar
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={isLoading}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estas seguro de que deseas eliminar?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminara el curso y todos los materiales
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
      </div>
    </header>
  );
};
