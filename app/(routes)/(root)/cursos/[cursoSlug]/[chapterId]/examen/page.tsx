import { GetExam } from "@/actions/getExam";
import { TakeExam } from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examen | Teacher | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};


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
