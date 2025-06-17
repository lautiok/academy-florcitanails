
import { CourseTeacher, TeacherHeader } from "./components";
import { Metadata } from "next";
import { Suspense } from "react";
import { CourseTeacherSkeleton } from "@/components/Skeleton/CourseTeacherSkeleton";

export const metadata: Metadata = {
  title: "Cursos | Profesor | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function Teacher() {
  return (
    <div>
      <TeacherHeader />
      <Suspense fallback={<CourseTeacherSkeleton />}>
        <CourseTeacher  />
      </Suspense>
    </div>
  );
} 