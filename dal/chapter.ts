import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Chapter, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

export const getChapter = async ({
  chaptersId,
  courseId,
}: {
  chaptersId: string;
  courseId: string;
}): Promise<
  | (Chapter & {
      userProgress: UserProgress[];
      documentUrl: {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        chapterId: string;
        documentUrl: string;
      }[];
    })
  | null
> => {
  try {
    const session = await auth();
    if (!session) {
      redirect("/login");
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chaptersId,
      },
      include: {
        userProgress: true,
        documentUrl: true,
      },
    });

    if (!chapter || chapter.courseId !== courseId) {
      return null;
    }

    return chapter;
  } catch (error) {
    console.error("Error al obtener capítulo:", error);
    return null;
  }
};
