import { NextResponse } from "next/server";
import { getSerchCourses } from "@/actions/getCourses";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "No se ha proporcionado una consulta." },
      { status: 400 }
    );
  }

  try {
    const data = await getSerchCourses(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
