import { NextResponse } from "next/server";
import { getSuscribersbyMonth } from "@/actions/getSuscriberts";

export async function GET() {
    try {
        const data = await getSuscribersbyMonth();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al obtener suscriptores" });
    }
}