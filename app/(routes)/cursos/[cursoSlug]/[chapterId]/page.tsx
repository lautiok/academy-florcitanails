import { getCourse } from "@/dal/Courses";
import { getPurchaseCourseById } from "@/dal/Purchase";
import { getUserProgress } from "@/dal/UserProgress";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChaptersCourse, InfoCourse } from "./components";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Capítulo | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CharterCourse({
  params,
}: {
  params: Promise<{ cursoSlug: string; chapterId: string }>;
}) {
  const { cursoSlug, chapterId  } = await params;

  const session = await auth();

  if (!session) {
    return <div>No estás logueado</div>;
  }

  const user = session.user;

  const infoCourse = await getCourse(cursoSlug);

  if (!infoCourse) {
    redirect(`/cursos/${cursoSlug}`);
  }

  const userProgress = await getUserProgress();

  const isPurchesedCourse = await getPurchaseCourseById(user.id, infoCourse.id);

  const videoUrl = infoCourse.chapters.find(
    (chapter) => chapter.id === chapterId 
  )?.videoUrl;

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
        <InfoCourse
          infoCourse={infoCourse}
          chapterCourseId={chapterId }
          userProgress={userProgress}
          PurchaseCourse={isPurchesedCourse}
          videoUrl={videoUrl}
        />
        <ChaptersCourse userProgress={userProgress} chapters={infoCourse.chapters} chapterId={chapterId} cursoSlug={cursoSlug} />
      </div>
    </div>
  );
}
