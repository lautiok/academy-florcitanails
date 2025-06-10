import { Course } from "@prisma/client";
import { CardCourse } from "./cardCourse";

export const CourseTeacher = ({
  courses,
}: {
  courses: Course[];
}) => {


  if (courses.length === 0) {
    return (
      <div className="flex flex-col my-4 mx-6 border rounded-lg p-4 gap-10">
        <p className="text-center text-gray-500">No hay cursos creados</p>
      </div>
    );
  }

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

