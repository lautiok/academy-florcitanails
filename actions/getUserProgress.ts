import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const getUserProgress = async () => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("No estás logueado");
    }

    const user = session.user;

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
      },
    });

    return progress; 
  } catch (error) {
    console.error("Error al obtener el progreso del usuario:", error);
    return []; 
  }
};

export const getUserProgressByCourse = async (courseId: string): Promise<number> => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("No estás logueado");
    }
    const purchase = await prisma.purchase.findFirst({
      where: {
        courseId,
        userId: session.user.id,
      },
    });

    if (!purchase) {
      return 0;
    }

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId,
      },
    });

    if (!totalChapters) {
      return 0;
    }

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId: session.user.id,
        isCompleted: true,
        chapter: {
          courseId,
        }
      },
    });

    const progress = Math.round((completedChapters / totalChapters) * 100);

    return progress;
  } catch (error) {
    console.error("Error al obtener el progreso del usuario:", error);
    return 0;
  }
};