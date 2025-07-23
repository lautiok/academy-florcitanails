import { CardCourse } from "./cardCourse";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const CourseTeacher = async () => {

   const session = await auth();
  
      if (!session) {
        return <div>No tienes sesión</div>;
      }
      
      const courses = await prisma.course.findMany({
        where: { userId: session.user.id },
      });

  return (
    <div className="flex flex-col my-4 mx-6 border rounded-lg p-4 gap-10">
      {courses.map((course) => (
        <div key={course.id}>
          <CardCourse course={course} />
        </div>
      ))}
    </div>
  );
};

