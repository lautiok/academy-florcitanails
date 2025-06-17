import { auth } from "@/lib/auth";
import ChapterForm from "./chapterForm";
import { getCourseBySlugUser } from "@/dal/Courses";
import { getChapter } from "@/dal/chapter";
import { GetExam } from "@/dal/Exam";

export async function ChapterContent({
    slug,
    chaptersId,
}: {
    slug: string;
    chaptersId: string;
}) {
     const session = await auth();
    
      if (!session?.user.id) {
        return <div>No tienes sesión</div>;
      }
    
      if (session.user.role !== "admin") {
        return <div>No tienes permisos</div>;
      }
    
      const course = await getCourseBySlugUser(slug, session.user.id);
      
      if (!course) {
        return <div>No hay curso con ese slug</div>;
      }
    
      const chapters = await getChapter({
        chaptersId,
        courseId: course.id,
      });
    
      const exam = await GetExam(chaptersId);
    
    
      if (!chapters) {
        return <div>No hay capítulo con ese id</div>;
      }
    
    return <ChapterForm chapter={chapters} documentUrl={chapters.documentUrl} slug={slug} exam={exam} />
    
}