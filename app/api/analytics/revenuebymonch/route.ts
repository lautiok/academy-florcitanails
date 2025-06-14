import { NextResponse } from "next/server";
import { getRevenuesByMonth } from "@/dal/Purchase";

export async function GET() {
    try {
        const data = await getRevenuesByMonth();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error al obtener revenues" });
    }
} 