import { GetExam } from "@/dal/Exam";
import { TakeExam } from "./TakeExam";

export async function ChapterCourseExamContent({
  chapterId,
  cursoSlug,
}: {
  chapterId: string;
  cursoSlug: string;
}) {
      const exam = await GetExam(chapterId);
    
  return <TakeExam chapterId={chapterId} exam={exam} cursoSlug={cursoSlug} />;
}