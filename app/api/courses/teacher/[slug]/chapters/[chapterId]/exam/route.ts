import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const examSchema = z.object({
  passingScore: z.coerce.number().min(1).max(100),
  questions: z.array(
    z.object({
      text: z.string().min(1),
      options: z.array(z.string().min(1)).min(2),
      correct: z.string().min(1),
    })
  ),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  try {
    const { chapterId } = await params;

    const body = await req.json();
    const parsed = examSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para crear examenes" },
        { status: 401 }
      );
    }

    const { passingScore, questions } = parsed.data;

    const invalidQuestion = questions.find(
      (q) => !q.options.includes(q.correct)
    );
    if (invalidQuestion) {
      return NextResponse.json(
        {
          error: `La opción correcta "${invalidQuestion.correct}" no está entre las opciones de la pregunta: "${invalidQuestion.text}"`,
        },
        { status: 400 }
      );
    }

    const existingExam = await prisma.exam.findUnique({
      where: { chapterId },
    });

    if (existingExam) {
      return NextResponse.json(
        { error: "Ya existe un examen para este capítulo." },
        { status: 400 }
      );
    }

    const createdExam = await prisma.exam.create({
      data: {
        chapterId,
        passingScore,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            options: q.options,
            correct: q.correct,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Examen creado correctamente",
      examId: createdExam.id,
    });
  } catch (error) {
    console.error("Error al crear el examen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ chapterId: string }> }
) {
  try {
    const { chapterId } = await params;


    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para eliminar examenes" },
        { status: 401 }
      );
    }

    const existingExam = await prisma.exam.findUnique({
      where: { chapterId },
    });

    if (!existingExam) {
      return NextResponse.json(
        { error: "No existe un examen para este capítulo." },
        { status: 400 }
      );
    }

    await prisma.exam.delete({
      where: { chapterId },
    });

    return NextResponse.json({ message: "Examen eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el examen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}