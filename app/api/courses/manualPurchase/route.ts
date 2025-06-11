import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { se } from "date-fns/locale";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { userId, courseId, price } = body;

  if (!userId || !courseId || !price) {
    return NextResponse.json({ error: "Faltan datos" } , { status: 400 });
  }

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No estás logueado" } , { status: 401 });
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "No tienes permisos" } , { status: 401 });
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
      return NextResponse.json({ error: "Ya estás inscrito" } , { status: 400 });
    }

    
     const priceCourse = price
      ? Number(price.replace(",", "."))
      : 0;


    await prisma.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
        price: priceCourse,
      },
    });
    return NextResponse.json("Inscrito exitosamente ", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" } , { status: 500 });
  }

}