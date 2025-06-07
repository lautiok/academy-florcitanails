import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "No tienes permisos para actualizar el perfil" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
