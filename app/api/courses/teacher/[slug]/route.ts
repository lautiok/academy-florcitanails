import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
import { randomUUID } from "crypto";
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

    const values = await req.json();
    console.log(values);  
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No tienes permisos" },
        { status: 401 }
      );
    }

    if (values.slug) {
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(values.slug)) {
        return NextResponse.json(
          {
            error:
              "Slug no válido. Usa solo letras minúsculas, números y guiones.",
          },
          { status: 400 }
        );
      }
    }

    if (values.isPublished) {
      const existingCourse = await prisma.course.findUnique({
        where: {
          slug: slug,
          userId: session.user.id,
        },
        include: {
          chapters: true,
        },
      });

      if (!existingCourse) {
        return NextResponse.json(
          { error: "Curso no encontrado." },
          { status: 404 }
        );
      }

      const { title, description, level, category, chapters } = existingCourse;

      if (!title || title.trim() === "") {
        return NextResponse.json(
          { error: "El título es obligatorio para publicar." },
          { status: 400 }
        );
      }

      if (!description || description.trim() === "") {
        return NextResponse.json(
          { error: "La descripción es obligatoria para publicar." },
          { status: 400 }
        );
      }

      if (!level || level.trim() === "") {
        return NextResponse.json(
          { error: "El nivel es obligatorio para publicar." },
          { status: 400 }
        );
      }

      if (!category || category.trim() === "") {
        return NextResponse.json(
          { error: "La categoría es obligatoria para publicar." },
          { status: 400 }
        );
      }

      if (chapters.length === 0) {
        return NextResponse.json(
          { error: "Debe tener al menos un capítulo para publicar." },
          { status: 400 }
        );
      }
    }

    if (values.imageUrl) {
      const previousCourse = await prisma.course.findUnique({
        where: {
          slug: slug,
          userId: session.user.id,
        },
        select: {
          imageUrl: true,
        },
      });

      const previousImage = previousCourse?.imageUrl;

      if (previousImage && previousImage !== values.imageUrl) {
        const key = previousImage.split("/").pop();
        if (key) {
          console.log("Eliminando imagen con key:", key);
          await utapi.deleteFiles(key);
        }
      }
    }

    const course = await prisma.course.update({
      where: {
        slug: slug,
        userId: session.user.id,
      },
      data: {
        ...values,
      },
    });

    if (values.isPublished === true) {
  console.log("Notificando sobre publicación del curso:", course.title);

  await pusherServer.trigger(`notificaciones`, "new-notification", {
    id: randomUUID(),
    title: "Nuevo curso",
    body: `El curso "${course.title}" ya está disponible 🎉`,
  });
}

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
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
      return NextResponse.json(
        { error: "No hay curso con ese slug" },
        { status: 400 }
      );
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
