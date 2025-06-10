"use client";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

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
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export const Actions = ({ slug }: { slug: string }) => {
  const router = useRouter();
  
  const edit = () => {
    router.push(`/teacher/course/${slug}`);
  };

  const deleteCourse = async () => {
  try {
    await axios.delete(`/api/courses/teacher/${slug}`);
    toast("Curso eliminado exitosamente 🎉");
    window.location.reload();
  } catch (error) {
    toast.error("Error al eliminar curso");
    console.error("Error al eliminar curso:", error);
  }
};

  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">
      <Button variant="outline" className="w-full" onClick={edit}>
        Editar <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full text-red-400">
                Eliminar <Trash className="h-4 w-4" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estas seguro de que deseas eliminar?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminara el curso y todos los materiales asociados permanentemente de la plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCourse}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
