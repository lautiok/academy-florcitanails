import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const { id } = session.user;

    const { title, slug } = await req.json();

    if (!title || !slug) {
      return NextResponse.json({ error: "Falta campo" }, { status: 400 });
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Slug no válido. Usa solo letras minúsculas, números y guiones.",
        },
        { status: 400 }
      );
    }
    
    const course = await prisma.course.create({
      data: {
        userId: id,
        title: title,
        slug: slug,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}
