import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { userEmail, phone, userName } = body;

  if (!userEmail || !phone || !userName) {
    return NextResponse.json({ error: "Faltan datos" });
  }

  try {
    const course = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso no encontrado" });
    }

    const formCheck = await prisma.formPresencial.findFirst({
      where: {
        userEmail,
        courseId: course.id,
      },
    });

    if (formCheck) {
      return NextResponse.json(
        { error: "Ya se ha enviado el formulario" },
        { status: 400 }
      );
    }

    const formPresencial = await prisma.formPresencial.create({
      data: {
        userEmail: userEmail,
        courseId: course.id,
        userName: userName,
        phone: phone,
      },
    });

    return NextResponse.json(formPresencial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al enviar formulario" });
  }
}
