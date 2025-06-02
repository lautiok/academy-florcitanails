import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "No tienes permisos" }, { status: 401 });
        }

        const { slug } = await params;

const { chapters } = await req.json();

        const ownedCourse = await prisma.course.findUnique({
            where: {
                slug: slug,
                userId: session.user.id,
            },
        });

        if (!ownedCourse) {
            return NextResponse.json({ error: "No hay curso con ese slug" }, { status: 400 });
        }

        for(const item of chapters ) {
            await prisma.chapter.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position,
                },
            });
        }
        return NextResponse.json("success", { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error interno" }, { status: 400 });
    }
}