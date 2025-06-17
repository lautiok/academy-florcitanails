import { getCourses } from "@/dal/Courses";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const course = await getCourses();
        return NextResponse.json(course);
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}