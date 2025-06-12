import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, courseId, price } = body;

  if (!userId || !courseId || !price) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No estás logueado" }, { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "No tienes permisos" }, { status: 401 });
  }

  try {
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });
    if (existingPurchase) {
      return NextResponse.json({ error: "Ya estás inscrito" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 400 }
      );
    }

    const priceCourse = price ? Number(price.replace(",", ".")) : 0;

    await prisma.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
        price: priceCourse,
      },
    });

    await pusherServer.trigger(`user-${userId}`, "new-notification", {
      id: randomUUID(),
      title: "Te has inscrito al curso",
      body: `Ya tienes acceso al curso "${course.title}" 🎉`,
    });

    return NextResponse.json("Inscrito exitosamente ", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
