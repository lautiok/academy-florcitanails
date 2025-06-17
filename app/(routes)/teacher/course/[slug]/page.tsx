import { Metadata } from "next";
import { CourseContent } from "./components/courseContent";
import { Suspense } from "react";
import CourseEditSkeleton from "@/components/Skeleton/CourseEditSkeleton";

export const metadata: Metadata = {
  title: "Editar curso | Profesor | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="m-6">
      <Suspense fallback={<CourseEditSkeleton />}>
        <CourseContent slug={slug} />
      </Suspense>
    </div>
  );
}
