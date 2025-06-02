"use client";
import { Chapter } from "@prisma/client";
import { TitleBlock } from "./titleBlock";
import { GripVertical, ListCheck, Loader2, Pencil, PlusCircle, SplinePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "@hello-pangea/dnd";
import { FormChaptersName } from "./formChaptersName";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";


export default function ChaptersBlock({
  slug,
  chapters,
}: {
  slug: string;
  chapters: Chapter[];
}) {
  const [chaptersList, setChaptersList] = useState(chapters ?? []);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setChaptersList(chapters ?? []);
  }, [chapters]);

  const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;

  const items = Array.from(chaptersList);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  const bulk = items.map((chapter, index) => ({
    id: chapter.id,
    position: index,
  }));

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setLoading(true);
      await axios.put(`/api/courses/teacher/${slug}/chapters/reorder`, {
        chapters: updateData,
      });
      toast("Capítulos actualizados exitosamente 🎉");
    } catch (error) {
      toast.error("Error al actualizar capítulos");
      console.error("Error al actualizar capítulos:", error);
    } finally {
      setLoading(false);
    }
  };

  setChaptersList(items); 
  onReorder(bulk);
};

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/course/${slug}/${chapterId}`);
  };
  return (
    <div className="p-6 bg-white rounded-md h-fit border border-slate-200">
      <TitleBlock title="Capítulos del curso" icon={ListCheck} />
      <div className="flex gap-2 items-center justify-between mb-3">
        <p className="">capitulos del curso</p>
        <Button variant="outline" size="sm" onClick={() => setShowInput(true)}>
          <PlusCircle className="h-4 w-4" />
          Agregar capítulo
        </Button>
      </div>
      {showInput && (
        <FormChaptersName slug={slug} setChaptersList={setShowInput} />
      )}
      {
        loading ? (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
           <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >
              {chaptersList.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-2 items-center justify-between p-4 border border-slate-200 rounded-md"
                    >
                      <div className="flex gap-2 items-center">
                        <GripVertical className="h-4 w-4" />
                        <p>{chapter.title}</p>
                      </div>
                      <div className="flex gap-2 items-center px-2 py-1">
                        {chapter.isPublished ? (
                          <p className="inline-block bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-1 rounded-md">
                            Publicado
                          </p>
                        ) : (
                          <p className="inline-block bg-red-50 text-red-400 text-xs font-medium px-2 py-1 rounded-md">
                            Sin publicar
                          </p>
                        )}
                        <div className="cursor-pointer" onClick={() => onEditChapter(chapter.id)}>
                          <Pencil className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
        )
      }

    </div>
  );
}
