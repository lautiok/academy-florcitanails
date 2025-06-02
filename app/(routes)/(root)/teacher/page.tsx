
import { prisma } from "@/lib/prisma";
import { CourseTeacher, TeacherHeader } from "./components";
import { getServerSession } from "next-auth"

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