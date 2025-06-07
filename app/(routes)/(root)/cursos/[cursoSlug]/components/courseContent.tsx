import { Chapter } from "@prisma/client";

export const CourseContent = ({
    chapters,
}: {
    chapters: Chapter[];
}) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 pb-4">Contenido del curso</h2>
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <div key={chapter.id} className=" flex items-start space-x-4 border rounded-lg border-slate-200 p-2 ">
                <div className="flex-shrink-0 bg-violet-400 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center">{index + 1}</div>
            <div className="flex-1">
                <h3 className="text-xl font-semibold">{chapter.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};