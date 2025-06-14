import { Metadata } from "next";
import { ListMyCourse } from "./components/listMyCourse";
import { Suspense } from "react";
import { ListCoursesSkeleton } from "@/components/Skeleton/ListCoursesSkeleton";

export const metadata: Metadata = {
    title: "Mis cursos | Academy Florcitanails",
    description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function MiscursosPage() {

    return (
        <div>
            <Suspense fallback={<ListCoursesSkeleton title="Mis cursos" />}>
                <ListMyCourse />
            </Suspense>
        </div>
    );
}