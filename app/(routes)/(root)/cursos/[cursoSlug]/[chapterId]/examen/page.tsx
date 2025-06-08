import { GetExam } from "@/actions/getExam";
import { TakeExam } from "./components";

export default async function CharterCourse({
  params,
}: {
  params: Promise<{ cursoSlug: string; chapterId: string }>;
}) {
  const { chapterId, cursoSlug } = await params;


  const exam = await GetExam(chapterId);

  return (
    <div className="p-6">
      <TakeExam chapterId={chapterId} exam={exam} cursoSlug={cursoSlug} />
    </div>
  );
}
