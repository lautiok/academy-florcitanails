import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const bodySchema = z.object({
  chapterId: z.string(),
  score: z.number(),
  passed: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { chapterId, score, passed } = parsed.data;

    if (!passed) {
      return NextResponse.json({ message: "Examen no aprobado, no se guarda el progreso" });
    }

    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    if (existingProgress) {
      await prisma.userProgress.update({
        where: {
          userId_chapterId: {
            userId,
            chapterId,
          },
        },
        data: {
          isCompleted: true,
          score,
        },
      });
    } else {
      await prisma.userProgress.create({
        data: {
          userId,
          chapterId,
          isCompleted: true,
          score,
        },
      });
    }

    return NextResponse.json({ message: "Progreso guardado correctamente 🎉" });
  } catch (error) {
    console.error("Error al guardar progreso:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
