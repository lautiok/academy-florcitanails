
import { prisma } from "@/lib/prisma";
import { CourseTeacher, TeacherHeader } from "./components";
import { getServerSession } from "next-auth"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos | Profesor | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function Teacher() {
    const session = await getServerSession();

    if (!session) {
      return <div>No tienes sesión</div>;
    }
    
    const courses = await prisma.course.findMany({
      where: { userId: session.user.id },
    });

  return (
    <div>
      <TeacherHeader />
      <CourseTeacher courses={courses} />
    </div>
  );
} 