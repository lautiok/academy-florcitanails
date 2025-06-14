import { getSuscribersbyMonth } from "@/dal/Purchase";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const data = await getSuscribersbyMonth();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al obtener suscriptores" });
    }
}