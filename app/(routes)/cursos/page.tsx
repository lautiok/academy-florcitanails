import { Metadata } from "next";
import { ListCoursesComponents } from "./components/listCoursesComponents";
import { Suspense } from "react";
import { ListCoursesSkeleton } from "@/components/Skeleton/ListCoursesSkeleton";

export const metadata: Metadata = {
  title: "Cursos | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CursosPage() {

    return (
        <div>
            <Suspense fallback={<ListCoursesSkeleton title="Todos los cursos"/>}>
                <ListCoursesComponents/>
            </Suspense>
        </div>
    );
}