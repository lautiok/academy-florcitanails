"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { useRouter } from "next/navigation";

export function ProgressCourse({
  userProgress,
  chapterCourseId,
  infoCourse,
}: {
  userProgress: UserProgress[];
  chapterCourseId: string;
  infoCourse: Course & { chapters: Chapter[] };
}) {
  const { chapters } = infoCourse;
  const router = useRouter();

  const totalChapters = chapters.length;

  const completedChapters = chapters.filter((chapter) =>
    userProgress.some(
      (progress) => progress.chapterId === chapter.id && progress.isCompleted
    )
  ).length;

  const percentage =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  const isChapterPassed = userProgress.some(
    (progress) => progress.chapterId === chapterCourseId && progress.isCompleted
  );

  return (
    <div>
      <div className="my-4 w-full flex items-center gap-2 flex-col p-2 border border-slate-200 rounded-md">
        <span className="text-sm">Progreso del curso: {percentage} %</span>
        <Progress value={percentage} className="[&>*]:bg-[#00B87C]" />
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="mt-1 w-full px-4"
          onClick={() =>
            router.push(`/cursos/${infoCourse.slug}/${chapterCourseId}/examen`)
          }
          disabled={isChapterPassed}
        >
          Rendir capítulo
        </Button>
      </div>
    </div>
  );
}
