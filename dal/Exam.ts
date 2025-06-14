import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Exam, Question } from "@prisma/client";
import { redirect } from "next/navigation";

export const GetExam = async (chapterId: string): Promise<(Exam & { questions: Question[] }) | null> => {
    
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
    try {
        const exam = await prisma.exam.findFirst({
            where: {
                chapterId,
            },
            include: {
                questions: true,
            },
        });
        return exam
    } catch (error) {
        console.error("Error al obtener el examen:", error)
        return null
    }
}