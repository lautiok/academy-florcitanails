import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { mercadopago } from "@/utils/mercadopagoconfig";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const { slug } = await params;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingCourse = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    if (!existingCourse) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: existingCourse.id,
        },
      },
    });

    if (purchase) {
      return NextResponse.json({ error: "Ya estás inscrito" }, { status: 400 });
    }

    const priceCourse = existingCourse.price
      ? Number(existingCourse.price.replace(",", "."))
      : 0;

    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id: existingCourse.id,
            title: existingCourse.title,
            quantity: 1,
            unit_price: priceCourse,
          },
        ],
        metadata: {
          courseId: existingCourse.id,
          userId: session.user.id,
          price: existingCourse.price ? existingCourse.price.toString() : "0",
        },
        back_urls: {
          success: `${process.env.NEXTAUTH_URL}/cursos/${slug}`,
          failure: `${process.env.NEXTAUTH_URL}/cursos/${slug}`,
          pending: `${process.env.NEXTAUTH_URL}/cursos/${slug}`,
        },
        auto_return: "approved"
      },
    });

    return NextResponse.json(preference.init_point, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
