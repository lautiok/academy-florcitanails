import { prisma } from "@/lib/prisma";
import ChapterForm from "./components/chapterForm";
import { auth } from "@/lib/auth";
export default async function ChapterPage({
  params,
}   : {
  params: Promise<{ slug: string; chaptersId: string }>;
}) {

  const { slug, chaptersId } = await params;

  const session = await auth();

  if (!session?.user.id) {
    return <div>No tienes sesión</div>;
  }

  if (session.user.role !== "admin") {
    return <div>No tienes permisos</div>;
  }

  const course = await prisma.course.findUnique({
    where: {
      slug,
      userId: session.user.id,
    },
  });

  if (!course) {
    return <div>No hay curso con ese slug</div>;
  }

  const chapters = await prisma.chapter.findUnique({
    where: {
      id: chaptersId,
      courseId: course.id,
    },
    include: {
      userProgress: true,
      documentUrl: true,
    },
  });

  const exam = await prisma.exam.findUnique({
    where: {
      chapterId: chaptersId,
    },
    include: {
      questions: true,
    },
  });



  if (!chapters) {
    return <div>No hay capítulo con ese id</div>;
  }

  return (
    <div className="m-6">
      <ChapterForm chapter={chapters} documentUrl={chapters.documentUrl} slug={slug} exam={exam} />
    </div>
  );
}