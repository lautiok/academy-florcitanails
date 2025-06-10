import { getPurchasedCourses } from "@/actions/getPurchase";
import { ListCourses } from "@/components/Shared";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis cursos | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function MiscursosPage() {
    const session = await auth();
    if (!session) {
        return <div>No tienes sesión</div>;
    }
    const course = await getPurchasedCourses(session.user.id);

    if (!course) {
        return <div>No tienes cursos</div>;
    }

    return (
        <div>
            <ListCourses title="Mis cursos" courses={course} />
        </div>
    );
}