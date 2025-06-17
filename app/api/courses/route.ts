import { getCourses } from "@/dal/Courses";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(req: Request) {
  try {
    const courses = await getCourses();

    return new NextResponse(JSON.stringify(courses), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
