import { Chapter, Course } from "@prisma/client";
import { CourseProgressDisplay } from "./CourseProgressDisplay";

export function ListCertificate({
  courses,
  name,
}: {
  courses: (Course & { chapters: Chapter[]; progress: number })[];
  name: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-5">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border border-slate-200 rounded-md p-4 flex justify-between flex-col md:flex-row gap-2"
        >
          <div className="flex gap-4 flex-col md:flex-row items-center md:items-start">
            <div className="w-full h-full md:w-[100px] md:h-[100px] overflow-hidden rounded-md">
              <img
                src={course.imageUrl || "/logo.jpg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="max-w-sm text-sm text-slate-600 line-clamp-2">
                {course.description}
              </p>
            </div>
          </div>
          <div className="min-w-[120px]">
            <CourseProgressDisplay
              progress={course.progress}
              name={name}
              title={course.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
