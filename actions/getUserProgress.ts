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