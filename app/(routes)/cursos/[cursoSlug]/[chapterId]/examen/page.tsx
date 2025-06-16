import { Metadata } from "next";
import { Suspense } from "react";
import { TakeExamSkeleton } from "@/components/Skeleton/TakeExamSkeleton";
import { ChapterCourseExamContent } from "./components/chapterCourseExamContent";

export const metadata: Metadata = {
  title: "Examen | Teacher | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};


export default async function CharterCourseExam({
  params,
}: {
  params: Promise<{ cursoSlug: string; chapterId: string }>;
}) {
  const { chapterId, cursoSlug } = await params;



  return (
    <div className="p-6">
      <Suspense fallback={<TakeExamSkeleton />}>
        <ChapterCourseExamContent chapterId={chapterId} cursoSlug={cursoSlug} />
      </Suspense>
    </div>
  );
}
