import { Metadata } from "next";
import { Suspense } from "react";
import { ChapterCourseContent } from "./components/chapterCourseContent";
import { CoursePageSkeleton } from "@/components/Skeleton/CoursePageSkeleton";


export const metadata: Metadata = {
  title: "Capítulo | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CharterCourse({
  params,
}: {
  params: Promise<{ cursoSlug: string; chapterId: string }>;
}) {
  const { cursoSlug, chapterId  } = await params;

  return (
    <div className="p-6 ">
        <Suspense fallback={<CoursePageSkeleton />}>
          <ChapterCourseContent chapterId={chapterId} cursoSlug={cursoSlug} />
        </Suspense>
    </div>
  );
}
