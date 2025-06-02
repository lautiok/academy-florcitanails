"use client";
import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "./titleBlock";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { on } from "events";
import axios from "axios";

export const CourseImage = ({ slug, imageUrl }: { slug: string; imageUrl: string | null }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [image , setImage] = useState(imageUrl || "/logo.jpg");

    const  onChangeImage = async (image: string) => {
        try {
          await axios.patch(`/api/courses/teacher/${slug}`, {
            imageUrl: image,
          }, {
            withCredentials: true,
          });
          toast("Imagen actualizada exitosamente 🎉");
        } catch (error) {
          toast.error("Error al actualizar imagen");
          console.error("Error al actualizar imagen:", error);
        }
    }
    
  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
  <TitleBlock title="Imagen del curso" icon={FileImage} />
  {isEditing ? (
    <div className="w-full flex items-center justify-center gap-2 mt-2 bg-slate-400 dark:bg-slate-800 rounded-lg p-2">
      <UploadButton
        endpoint="imageUploader"
        className="w-full flex items-center justify-center gap-2 mt-2"
        onClientUploadComplete={(res) => {
          onChangeImage(res[0]?.ufsUrl);
          setImage(res[0]?.ufsUrl);
          setIsEditing(false);
        }}
        onUploadError={() => {
          toast.error("Error al subir imagen");
        }}
        />
    </div>
  ) : (
    <img
      src={image || "/logo.jpg"}
      alt={slug}
      className="rounded-lg w-full max-w-xs mx-auto object-cover"
    />
  )}

  <Button
    className="w-full flex items-center justify-center gap-2 mt-2"
    variant="outline"
    size="sm"
    onClick={() => setIsEditing(!isEditing)}
  >
    <Pencil className="h-4 w-4" />
    {isEditing ? "Cancelar" : "Editar imagen"}
  </Button>
</div>

  );
};
