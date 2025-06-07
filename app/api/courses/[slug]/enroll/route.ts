import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
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
            });

            if (!existingCourse) {
                return NextResponse.json({ error: "Curso no encontrado" }, { status: 404 });
            }

            const existingPurchase = await prisma.purchase.findUnique({
                where: {
                    userId_courseId: {
                        userId: session.user.id,
                        courseId: existingCourse.id,
                    }
                },
            });

            if (existingPurchase) {
                return NextResponse.json({ error: "Ya estás inscrito" }, { status: 400 });
            }

             await prisma.purchase.create({
                data: {
                    userId: session.user.id,
                    courseId: existingCourse.id,
                    price: 0,
                },
            });

            return NextResponse.json("Inscrito exitosamente 🎉" , { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Error interno" }, { status: 500 });
        }

}