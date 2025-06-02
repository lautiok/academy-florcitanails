import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "No tienes permisos" }, { status: 401 });
    }

    const { id } = session.user;
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Falta campo" }, { status: 400 });
    }

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Falta slug" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: {
        slug,
        userId: id,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "No hay curso con ese slug" }, { status: 400 });
    }

    const chapterCount = await prisma.chapter.count({
      where: {
        courseId: course.id,
      },
    });

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId: course.id,
        position: chapterCount + 1,
      },
    });

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}
