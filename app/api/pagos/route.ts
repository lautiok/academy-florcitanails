import { Payment } from "mercadopago";
import { NextResponse } from "next/server";
import { mercadopago } from "@/utils/mercadopagoconfig";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("data.id");

  if (!id) {
    console.log("No se proporcionó el ID del pago.");
    return NextResponse.json({ error: "Falta el ID del pago" }, { status: 400 });
  }

  try {
    const payment = await new Payment(mercadopago).get({ id });

    if (!payment) {
      console.log("No se encontró el pago.");
      return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });
    }

    const courseId = payment.metadata.course_id;
    const userId = payment.metadata.user_id;
    const price = Number(payment.metadata.price || 0);

    if (payment.status === "approved") {
      const existingPurchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!existingPurchase) {
        await prisma.purchase.create({
          data: {
            userId,
            courseId,
            price,
          },
        });
        return NextResponse.json({ status: "success" }, { status: 200 });
      } else {
        console.log("Ya existe una compra para este curso y usuario.");
        return NextResponse.json({ status: "existing_purchase" }, { status: 200 });
      }
    }
    return NextResponse.json({ status: "pending" }, { status: 200 });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
