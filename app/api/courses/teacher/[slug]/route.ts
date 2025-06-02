import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    const { slug } = await params;

    const values = await req.json()
    console.log(values)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 401 }
      );
    }

    const course = await prisma.course.update({
      where: {
        slug: slug,
        userId: session.user.id,
      },
      data: {
        ...values,
      },
    })
    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
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

    const { slug } = await params;

    const courseFind = await prisma.course.findUnique({
      where: {
        slug: slug,
        userId: session.user.id,
      },
      include: {
        chapters: true,
      },
    });

    if (!courseFind) {
      return NextResponse.json({ error: "No hay curso con ese slug" }, { status: 400 });
    }

    const imageUrl = courseFind.imageUrl;
    if (imageUrl) {
      const key = imageUrl.split("/").pop();
      if (key) {
        await utapi.deleteFiles(key);
      }
    }

    const course = await prisma.course.delete({
      where: {
        slug: slug,
        userId: session.user.id,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 400 });
  }
}