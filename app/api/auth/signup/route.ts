import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return new NextResponse("Faltan campos", { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new NextResponse("El usuario ya existe", { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { password: _, ...user } = newUser;
    return  NextResponse.json(user , { status: 201 });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return NextResponse.json(
      { error: "Error al registrar el usuario" },
      { status: 500 } );
  }

}