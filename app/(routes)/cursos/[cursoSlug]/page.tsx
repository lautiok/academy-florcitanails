import { Suspense } from "react";
import { Metadata } from "next";
import { CoursePageContent } from "./components/CoursePageContent";
import { BreadCrumbCourseSkeleton } from "@/components/Skeleton/BreadCrumbSkeleton";
import { HeroBlockCourseSkeleton } from "@/components/Skeleton/HeroBlockSkeleton";
import { CourseContentSkeleton } from "@/components/Skeleton/CourseContentSkeleton";

export const metadata: Metadata = {
  title: "Curso | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};


export default async function cursosSlug({
  params,
}: {
  params: Promise<{ cursoSlug: string }>;
}) {


  const { cursoSlug } = await params;


  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto">
        <div className="my-4 mx-6 border rounded-lg border-slate-200 p-6">
          <BreadCrumbCourseSkeleton />
          <HeroBlockCourseSkeleton />
        </div>
        <div className="my-4 mx-6 border rounded-lg border-slate-200 p-6">
          <CourseContentSkeleton />
        </div>
      </div>
    }>
      <CoursePageContent cursoSlug={cursoSlug} />
    </Suspense>
)};