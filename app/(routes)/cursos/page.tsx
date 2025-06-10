import { getCourses } from "@/actions/getCourses";
import { ListCourses } from "@/components/Shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CursosPage() {

    const listCourses = await getCourses();
    return (
        <div>
            <ListCourses title="Todos los cursos" courses={listCourses} />
        </div>
    );
}