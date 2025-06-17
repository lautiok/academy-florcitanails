import { Suspense } from "react";
import { Metadata } from "next";
import { ChapterContent } from "./components/chapterContent";
import CourseEditSkeleton from "@/components/Skeleton/CourseEditSkeleton";

export const metadata: Metadata = {
  title: "Editar capítulo | Profesor | Academy Florcitanails",
  description:
    "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};
export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chaptersId: string }>;
}) {
  const { slug, chaptersId } = await params;

  return (
    <div className="m-6">
      <Suspense fallback={<CourseEditSkeleton />}>
        <ChapterContent slug={slug} chaptersId={chaptersId} />
      </Suspense>
    </div>
  );
}
