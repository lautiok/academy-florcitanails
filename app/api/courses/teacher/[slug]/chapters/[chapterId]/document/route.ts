import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
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

    const documents = await prisma.documentUrl.create({
      data: {
        title: values.title,
        documentUrl: values.documentUrl,
        chapterId: chapterId,
      },
    });

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
      console.error("Error interno al actualizar capítulo:", error); 
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}
