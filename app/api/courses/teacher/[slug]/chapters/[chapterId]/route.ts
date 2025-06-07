import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string; chapterId: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 401 }
      );
    }

    const { chapterId } = await params;


    const values = await req.json();


    if (!chapterId) {
      return NextResponse.json(
        { error: "Falta el chapterId" },
        { status: 400 }
      );
    }

    const course = await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
      console.error("Error interno al actualizar capítulo:", error); // 👈 agrega esto
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string; chapterId: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 401 }
      );
    }

    const { chapterId } = await params;

    const course = await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
      console.error("Error interno al eliminar capítulo:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}