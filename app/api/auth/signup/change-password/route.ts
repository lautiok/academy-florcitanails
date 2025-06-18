import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { password, confirmPassword } = body;

  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("No tienes sesión", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });

    if (!user) {
      return new NextResponse("Usuario no encontrado", { status: 404 });
    }
    if (!password || !confirmPassword) {
      return new NextResponse("Faltan campos", { status: 400 });
    }

    if (password !== confirmPassword) {
      return new NextResponse("Las contraseñas no coinciden", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return NextResponse.json(
      { error: "Error al actualizar la contraseña" },
      { status: 500 }
    );
  }
}
